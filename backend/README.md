# Backend - Recipe Recommender API

This is the backend for the Recipe Recommender application, built with FastAPI.

## Prerequisites

- Python 3.8+
- pip

## Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv .venv
   source .venv/bin/activate  # On Windows use .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

Start the server using `uvicorn`:

```bash
uvicorn main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`.

## Endpoints

- `GET /`: Health check.
- `POST /recommend`: Accepts a JSON body with a list of ingredients and returns the best matching recipe.
  - **Body format:** `{"ingredients": ["egg", "cheese"]}`

## Data

Recipes are stored in `recipes.json`. You can add more recipes to this file following the existing structure.
