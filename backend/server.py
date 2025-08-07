from fastapi import FastAPI
import joblib #requirement
#scikit-learn is also a requirement
import pandas as pd #requirement
from fastapi.middleware.cors import CORSMiddleware
#uvicorn is a requirement

#probably need uvicorn, scikit-learn

app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)








#takes list of categories -> returns freq
def get_category_freq(categories_list):

    category_freq_df = pd.read_csv('./category_freq.csv')

    avg_freq = 0
    for categ in categories_list:
        print(categ)
        category_info = category_freq_df[category_freq_df['category_list'] == categ]
        # print(category_info['count'])
        avg_freq += category_info['count'].item()
    
    avg_freq = avg_freq/len(categories_list)
    print(avg_freq)
    return avg_freq




#label-encoder
def get_country_code(country_code_abrv):
    country_le = joblib.load('./country_label_encoder.joblib')
    # country_le = joblib.load('./country_label_encoder.joblib')
    return country_le.transform([country_code_abrv])






@app.get("/")
async def root():
    return "Welcome to startup success predictor"

@app.get("/get_prediction") #format: country_string -> 3 chars all uppercase, 
                            #funding_rounds -> str of number, categories_list -> comma separated categories
                            #ex. country=IND&funding_rounds=1&categories_list=Mobile,Media
async def get_prediction(country_str: str, funding_rounds: str, categories_liststr: str):
    rf_clasif = joblib.load("./3feat_classifier.joblib") #loads random forest classification model

    country_code = get_country_code(country_str) #IND, CHN
    
    # 
    category_freq = 0
    if categories_liststr:
        categories_list = categories_liststr.split(',')
        category_freq = get_category_freq(categories_list)

    #emphasis: category, country code, funding rounds
    my_test = pd.DataFrame({
     'country_code': [country_code],
     'funding_rounds': [funding_rounds],
     'category_freq_avg': [category_freq]
    })

    y_pred = rf_clasif.predict(my_test)
    
    return y_pred.item()