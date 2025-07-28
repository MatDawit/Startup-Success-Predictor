from fastapi import FastAPI
import joblib #requirement
#scikit-learn is also a requirement
import pandas as pd #requirement


app = FastAPI()

@app.get("/get_prediction")
async def get_prediction(country_str: str, funding_rounds: str, categories_liststr: str):
    rf_clasif = joblib.load("./3feat_classifier.joblib")
    y_pred = rf_clasif.predict(my_test)

    return {"prediction": y_pred.item()}