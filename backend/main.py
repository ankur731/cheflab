from fastapi import FastAPI
import pandas as pd
from model import recommendFood
from model import recommend_recipes_by_ingredients
from fastapi.middleware.cors import CORSMiddleware
import random
from pydantic import BaseModel



# class UserData(BaseModel):
#     calorie: str

data=pd.read_csv('../Data/recipe_new.csv')

app = FastAPI()


origins = [
    "http://localhost:3000/new",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UserData(BaseModel):
    calorie: float
    ingredients:list

@app.get("/")
async def root():
    return {"message": "Hello World"}



@app.post("/submit-data")
async def submit_data(user_data: UserData):
    print(user_data)
    target_calorie = user_data.calorie  # Target calorie value
    # num_recommendations = 20  # Number of recommendations to provide
    # calorie_tolerance = 50  # Tolerance for calorie values
    # user_input_ingredients = ["sugar", "flour", "vanilla"]
    num_recommendations = 15  # Number of recommendations to provide
    calorie_tolerance = 50  # Tolerance for calorie values
    user_input_ingredients = user_data.ingredients

# Load your dataset (replace with your actual dataset)

    df =  recommendFood(data, target_calorie, num_recommendations+30, calorie_tolerance)
    output=recommend_recipes_by_ingredients(df,num_recommendations, user_input_ingredients)
    if output is None:
        return {"output":None}
    else:
        return output


# @app.post("/submit-data")
# async def submit_data(user_data: UserData):
#     return user_data.calorie