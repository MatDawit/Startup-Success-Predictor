import pandas as pd
import joblib #requirement

# my_test = pd.DataFrame({
#      'country_code': [54],
#      'funding_rounds': [1],
#      'founding_year': [2010],
#      'founding_month': [12],
#      'first_funding_year': [2010],
#      'first_funding_month': [12],
#      'last_funding_year': [2010],
#      'last_funding_month': [12],
#      'category_freq_avg': [0.013190]
#     })

# print(my_test)

#test w/ 3 other countries
# def get_country_code(country_code_abrv):
#     country_le = joblib.load('./backend/country_label_encoder.joblib')
#     return country_le.transform([country_code_abrv])

# print(get_country_code('IND'))

# def get_category_freq(categories_list):

#     category_freq_df = pd.read_csv('./backend/category_freq.csv')

#     avg_freq = 0
#     for categ in categories_list:
#         print(categ)
#         category_info = category_freq_df[category_freq_df['category_list'] == categ]
#         # print(category_info['count'])
#         avg_freq += category_info['count'].item()
    
#     avg_freq = avg_freq/len(categories_list)
#     print(avg_freq)
        
# get_category_freq(['Apps', 'Games', 'Mobile'])