const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'dev_secret_change_me';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/railway_dashboard';

mongoose.connect(MONGO_URI).then(() => {
  console.log('MongoDB connected');
}).catch((e) => {
  console.error('Mongo connect error', e);
});

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }, // demo only; hash in production
});
const User = mongoose.model('User', userSchema);

function auth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' });
  let user = await User.findOne({ email });
  if (!user) {
    user = await User.create({ email, password }); // demo auto-register
  }
  if (user.password !== password) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ uid: user._id, email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ token });
});

let gfsBucket;
mongoose.connection.once('open', () => {
  gfsBucket = new GridFSBucket(mongoose.connection.db, { bucketName: 'uploads' });
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.post('/api/files/upload', auth, upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file' });
  const filename = req.file.originalname;
  const uploadStream = gfsBucket.openUploadStream(filename, {
    metadata: { uploadedBy: req.user.email, uploadedAt: new Date().toISOString() },
  });
  uploadStream.end(req.file.buffer);
  uploadStream.on('finish', (file) => {
    res.json({ fileId: file._id, filename: file.filename });
  });
  uploadStream.on('error', (err) => {
    console.error(err);
    res.status(500).json({ error: 'Upload error' });
  });
});

app.get('/api/files/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const _id = new mongoose.Types.ObjectId(id);
    const downloadStream = gfsBucket.openDownloadStream(_id);
    downloadStream.on('error', () => res.status(404).end());
    downloadStream.pipe(res);
  } catch {
    res.status(400).json({ error: 'Bad id' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));


