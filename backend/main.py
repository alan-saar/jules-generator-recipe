import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load recipes
RECIPES_FILE = os.path.join(os.path.dirname(__file__), "recipes.json")
with open(RECIPES_FILE, "r") as f:
    recipes = json.load(f)

class IngredientsRequest(BaseModel):
    ingredients: List[str]

@app.post("/recommend")
def recommend_recipe(request: IngredientsRequest):
    user_ingredients = set(i.lower().strip() for i in request.ingredients)

    best_match = None
    max_overlap = -1

    for recipe in recipes:
        recipe_ingredients = set(i.lower() for i in recipe["ingredients"])
        overlap = len(user_ingredients.intersection(recipe_ingredients))

        if overlap > max_overlap:
            max_overlap = overlap
            best_match = recipe

    if best_match and max_overlap > 0:
        return best_match
    else:
        return {"message": "No matching recipe found."}

@app.get("/")
def read_root():
    return {"message": "Recipe Recommender API"}
