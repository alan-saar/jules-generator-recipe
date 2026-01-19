import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [recipe, setRecipe] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setRecipe(null)

    const ingredients = input.split(',').map(i => i.trim()).filter(i => i)
    if (ingredients.length === 0) {
      setError('Please enter at least one ingredient.')
      return
    }

    try {
      const response = await fetch('http://localhost:8000/recommend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const data = await response.json()
      if (data.message) {
        setError(data.message)
      } else {
        setRecipe(data)
      }
    } catch (err) {
      setError('Failed to fetch recipe. Is the backend running?')
    }
  }

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Recipe Finder</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter ingredients (comma separated, e.g., eggs, cheese)"
          rows="3"
          style={{ width: '100%', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}>
          Find Recipe
        </button>
      </form>

      {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}

      {recipe && (
        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '5px' }}>
          <h2>{recipe.title}</h2>
          <h3>Ingredients:</h3>
          <ul>
            {recipe.ingredients.map((ing, index) => (
              <li key={index}>{ing}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{recipe.instructions}</p>
        </div>
      )}
    </div>
  )
}

export default App
