# Infinite Regressors

**AI-Powered Train Traffic Control System**

[![Smart India Hackathon 2025](https://img.shields.io/badge/Smart_India_Hackathon-2025-blue)]()

---

## Overview

Infinite Regressors is a hybrid decision‑support system that combines AI/ML with combinatorial optimization to maximize section throughput and improve train scheduling. It helps controllers make faster, safer, and more informed decisions in real time, provides what‑if simulations, and scales from local sections to nationwide networks.

---

## Problem Statement

* **ID:** 25022
* **Title:** Maximizing Section Throughput Using AI-Powered Precise Train Traffic Control
* **Category:** Software
* **Challenge:** Optimize train movements to reduce congestion, improve punctuality, handle disruptions, and maintain safety and scalability in real time.

---

## Proposed Solution

A hybrid architecture that provides AI-driven recommendations validated and finalized by an optimization engine.

**Components**

* **Frontend (React.js + Tailwind):** Interactive dashboard with real-time visualization and controller tools.
* **C++ Scheduler (OR-Tools):** High-performance optimization engine producing conflict-free schedules.
* **Python AI (GNN / RL):** Adaptive models for delay prediction and policy suggestion.
* **Simulation Layer:** “What-if” scenarios to evaluate interventions without affecting live traffic.
* **Integration Layer:** Connectors for IRCTC/NTES and synthetic-data generators when live feeds are limited.

---

## Features

* Dynamic scheduling to minimize delays and section congestion.
* Real-time adaptability to handle disruptions (weather, incidents, maintenance).
* Rule-based safety validation to ensure regulatory compliance.
* Human-in-the-loop controls: explainability and manual override for controllers.
* Scenario simulation and offline testing environment.

---

## Technology Stack

* **Frontend:** React.js, Tailwind CSS, Vite, WebSockets
* **Backend & AI:** Python (AI/ML servers), C++ (OR-Tools scheduler)
* **DevOps:** Docker, Kubernetes, CI/CD pipelines
* **Data:** IRCTC / NTES APIs, synthetic data generators

---

## Project Structure

```
InfiniteRegressors/
├── server/                    # Backend services (C++ scheduling, Python AI servers)
│   ├── scheduler/             # C++ OR-Tools scheduling engine
│   └── ai_models/             # Python AI (GNN, RL) and model servers
├── src/                       # Frontend (React) code
├── public/                    # Static assets
├── docs/                      # Diagrams, research, design docs
├── scripts/                   # Helper scripts (setup, deployment)
├── README.md                  # This file
├── package.json               # Frontend deps
├── vite.config.ts             # Vite config
├── Dockerfile                 # Containerization
└── .gitignore
```

---

## References

Selected research that inspired this work:

* *Train Scheduling Optimization*, arXiv:2506.16329
* *Railway operation rescheduling via dynamic simulation and RL*, arXiv:2201.06276
* *Passenger Timetabling Optimization*, Journal of Modern Transportation (Springer)

---

## How to Run Locally

> The commands below are illustrative; adapt paths and scripts to your repo layout.

1. **Clone repo**

```bash
git clone https://github.com/<your-username>/infinite-regressors.git
cd infinite-regressors
```

2. **Frontend**

```bash
cd src
npm install
npm run dev
# or
npm run build && npm run preview
```

3. **Backend / AI**

* Python AI server (example)

```bash
cd server/ai_models
pip install -r requirements.txt
python ai_model_server.py
```

* C++ scheduler (example)

```bash
cd server/scheduler
# build step depends on your toolchain; example using make
make
./scheduler_engine
```

4. **Environment variables**
   Create a `.env` with required keys (API keys, DB URIs, cloud credentials). Example `.env` fields:

```
IRCTC_API_KEY=...
NTES_API_KEY=...
DATABASE_URL=...
```

5. **Open dashboard**

```
http://localhost:3000
```

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add feature"`
4. Push: `git push origin feature/your-feature`
5. Open a Pull Request with a clear description

**Areas for contribution**: optimization algorithms, simulation scenarios, UI/UX, integration adapters, testing and CI/CD.

---

## License

MIT License — see `LICENSE` for details.

---

## Acknowledgments

Developed for **Smart India Hackathon 2025** by the *Infinite Regressors* team. Thanks to mentors, domain experts, and the open-source community.

---


