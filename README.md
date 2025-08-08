<img width="1918" height="552" alt="image" src="https://github.com/user-attachments/assets/700bc757-cd8f-4304-8161-a52a272e33d2" />

# Startup Success Predictor
A web application that uses a random forest classifier trained on historical startup data to predict startup status by its markets, country, and funding rounds.

Data sourced from Crunchbase, link to Kaggle dataset:<a href="https://www.kaggle.com/datasets/yanmaksi/big-startup-secsees-fail-dataset-from-crunchbase">🚀Startup Success/Fail Dataset from Crunchbase</a>
## Demo
Try it at <a href="https://matdawit.github.io/Startup-Success-Predictor/">matdawit.github.io/Startup-Success-Predictor/!</a>

## Installation 🖥️
1. Clone the repository:
   ```bash
   git clone https://github.com/MatDawit/Startup-Success-Predictor.github.io.git
   ```
2. Run the backend
   ```bash
   cd backend
   uvicorn server:app --reload
   ```
3. Run the frontend
   ```bash
   cd frontend
   npm run dev
   ```

## Technologies Used 🛠️
- **Programming Language:** Python, JavaScript
- **Framework:** scikit-learn, React, FastAPI, TypeScript, TailwindCSS
- **Libraries:** pandas, NumPy, Matplotlib for data processing and visualization
