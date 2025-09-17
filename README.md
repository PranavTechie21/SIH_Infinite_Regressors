# Infinite Regressors

*AI-Powered Train Traffic Control System*

[![Smart India Hackathon 2025](https://img.shields.io/badge/Smart_India_Hackathon-2025-blue)]()

---

## 💡 Overview

Infinite Regressors is an AI-powered train traffic control system that combines AI/ML with combinatorial optimization to maximize section throughput and improve train scheduling. It provides real-time, data-driven recommendations to help controllers make faster, safer, and more informed decisions. The system is designed to scale from local sections to nationwide networks and includes "what-if" simulations to evaluate interventions.

---

## 🧐 Problem Statement

*Challenge ID:* 25022
*Title:* Maximizing Section Throughput Using AI-Powered Precise Train Traffic Control

Our system addresses the critical need to optimize train movements, which helps to reduce congestion, improve punctuality, and efficiently handle disruptions. By providing real-time recommendations, we enhance both safety and scalability across the rail network.

---

## 🚀 Proposed Solution

We've developed a *hybrid architecture* that uses AI models to generate initial policy recommendations. These recommendations are then validated and finalized by a high-performance optimization engine, ensuring that all schedules are conflict-free and compliant with safety regulations.

### Key Components

* *Frontend:* A dynamic, interactive dashboard built with *React.js* and *Tailwind CSS* that provides real-time visualization and control tools for railway operators.
* *C++ Scheduler:* A high-performance optimization engine using *OR-Tools* to generate optimal, conflict-free train schedules.
* *Python AI:* Adaptive models based on *Graph Neural Networks (GNN)* and *Reinforcement Learning (RL)* that predict delays and suggest intelligent scheduling policies.
* *Simulation Layer:* A dedicated environment for running *"what-if" scenarios* to test potential interventions without affecting live train traffic.
* *Integration Layer:* Connectors to live data feeds from *IRCTC/NTES* and synthetic data generators for training and testing.

---

## ✨ Features

* *Dynamic Scheduling:* Minimizes delays and section congestion in real time.
* *Real-time Adaptability:* Quickly responds to disruptions like weather, incidents, and maintenance.
* *Safety Validation:* Ensures regulatory compliance with built-in, rule-based checks.
* *Human-in-the-Loop:* Offers explainable AI recommendations with manual override options for controllers.
* *Scenario Simulation:* Provides an offline testing environment for evaluating new strategies.

---

## 🛠 Technology Stack

* *Frontend:* React.js, Tailwind CSS, Vite, WebSockets
* *Backend & AI:* Python (AI/ML), C++ (OR-Tools)
* *DevOps:* Docker, Kubernetes, CI/CD pipelines
* *Data Sources:* IRCTC/NTES APIs, synthetic data generators

---

## 📂 Project Structure
