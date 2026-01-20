# Frontend - Recipe Finder

This is the frontend for the Recipe Recommender application, built with React and Vite.

## Prerequisites

- Node.js (v14+)
- npm

## Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1. Enter a list of ingredients separated by commas (e.g., "pasta, tomato sauce, cheese") in the text area.
2. Click "Find Recipe".
3. The application will display the best matching recipe based on the ingredients provided.

## Configuration

The frontend is currently configured to communicate with the backend at `http://localhost:8000`. Ensure the backend server is running on this port.
