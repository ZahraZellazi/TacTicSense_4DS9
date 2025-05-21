# 🚀⚽️ TacticSense – The Ultimate Football Analytics Platform 💡📊

Welcome to **TacticSense**, an AI-powered, data-driven football analytics platform designed to revolutionize recruitment, performance analysis, and tactical decision-making in the beautiful game! 🌟

---

## 🎯 Project Vision & Business Understanding

⚽ **What is TacticSense?**  
An end-to-end intelligent platform that empowers:  
- 🏟️ **Clubs** to scout & recruit smartly  
- 🤝 **Agents** to find rising stars  
- 🧑‍🎤 **Players** to optimize performance  
- 🧑‍🏫 **Coaches & Analysts** to make data-driven tactical choices  
- 🏥 **Medical Teams** to prevent injuries  

💡 **Core Challenges Solved:**  
- Inefficient player recruitment 🕵️‍♂️  
- Lack of real-time tactical insights 🧠  
- Poor injury prediction & prevention 🚑  
- Disjointed data visualization and reporting dashboards 📉

---

## 🛠️ Full Data Science Pipeline & Tech Stack

### 1️⃣ Data Collection & Ingestion 📹📥  
- Source: Match videos, player telemetry, event logs  
- Tools: YOLO11n for object detection 🎯, OpenCV for video processing 🎥  
- Outcome: Raw player & ball tracking data

### 2️⃣ Data Preparation & Engineering 🧹🔧  
- Cleaning, filtering noisy data 🧼  
- Handling missing values (mean imputation) 💧  
- Feature extraction: player speed 🏃‍♂️, heatmaps 🔥, interaction graphs 🤝  
- Storage: MongoDB document database for flexible schema 📚

### 3️⃣ Modeling & AI 🤖⚙️  
- **YOLO11n** for accurate player & ball detection  and Skills detection
- **Graph Neural Networks (GNN)** for modeling player interactions & tactical roles 🔗  
- Predictive models for injury risk, performance metrics, and position classification 📈  
- Experiment tracking & versioning with **MLflow** 🔬

### 4️⃣ Model Evaluation & Validation ✅📊  
- Metrics: Precision, recall, F1-score for object detection 🎯  
- Visualizations: Heatmaps, pass trajectories, speed/time plots 📈🗺️  
- BI dashboards for stakeholder-friendly insights 🖥️

### 5️⃣ Deployment & Serving 🚀📦  
- Backend API: Node.js + Express for REST services 🖥️  
- Frontend: React + TypeScript dashboard for interactive visualization 🖼️  
- Database: MongoDB for real-time data access 🗄️  
- Containerization: Docker for scalable deployment 🐳  
- Orchestration & Automation: Prefect for workflow management & monitoring ⚙️  
- Continuous Integration & Deployment (CI/CD) pipelines (GitHub Actions or Jenkins) 🤖🔁

### 6️⃣ Monitoring & Maintenance 🕵️‍♀️📈  
- Automated Prefect flows to detect data drift & pipeline failures 🚨  
- Real-time alerting & logging 📩  
- Periodic model retraining & MLflow model registry 🏷️
  
## 📸 Overview on Monitoring & Maintenance

![Capture d’écran 2025-04-26 154410](https://github.com/user-attachments/assets/785ee3a4-bff8-448a-b2ae-fdb5f505b2ad)

*🔍 MLflow Experiments Dashboard: Overview of all experiments and runs.*

---

![Capture d’écran 2025-04-26 154434](https://github.com/user-attachments/assets/fc62610d-0993-49d9-9945-f0429ac21d41)

*📊 Detailed view of a single run including parameters, metrics, and artifacts.*

---

![Capture d’écran 2025-04-26 154501](https://github.com/user-attachments/assets/6855b8ce-8b52-4c31-8f0b-b60ac6ca175b)

*🛠️ Parameters and evaluation metrics logged during training.*

---
![Capture d’écran 2025-04-26 154636](https://github.com/user-attachments/assets/927e784d-d1d8-4861-8297-3332affc41d0)

*📈 Artifacts like models, plots, and files saved by MLflow.*

---

![prefect](https://github.com/user-attachments/assets/29d6d9c3-4448-42ef-91a3-8cb7d5061cb8)

*📊Monitoring tasks using prefect.*


---

## 🔧 Tech Stack Summary

| Layer              | Technologies & Tools                            | Emoji            |
|--------------------|------------------------------------------------|------------------|
| Computer Vision    | YOLO11n, OpenCV                                  | 🎯🎥             |
| Machine Learning   | PyTorch, GNN, MLflow                            | 🤖🔬             |
| Backend API       | Node.js, Express                                | 🖥️🛠️            |
| Frontend UI       | React, TypeScript                               | ⚛️💻             |
| Database          | MongoDB                                         | 🗄️               |
| MLOps & Orchestration | Prefect,Mlfolw                        | 🔍📊⚙️🔁            |
| BI & Visualization|   Power BI              | 📊📈             |

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
