from fastapi import FastAPI
import joblib #requirement
#scikit-learn is also a requirement
import pandas as pd #requirement


app = FastAPI()

"""
http://localhost:8000/
http://localhost:8000/test_prediction
http://localhost:8000/test_prediction?country_str=27&funding_rounds=589845&categories_liststr=238743


http://localhost:8000/test_prediction?test_param=hello
"""

@app.get("/") 
async def test():
    return {"blahlbalalhhl": "AI4ALL group project"}


@app.get("/test_prediction")
async def test_prediction(test_param):
    return {"test_param": test_param}


@app.get("/get_prediction")
async def get_prediction(country_str: str, funding_rounds: str, categories_liststr: str):
    rf_clasif = joblib.load("./3feat_classifier.joblib")

    my_test = pd.DataFrame({
     'country_code': [23],
     'funding_rounds': [0],
     'category_freq_avg': [0.013190]
    })

    y_pred = rf_clasif.predict(my_test)

    return {"prediction": y_pred.item()}