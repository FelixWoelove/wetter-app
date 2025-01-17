// components/Search.jsx
import React, { useState } from 'react'

const Search = ({ onSearch }) => {
  const [input, setInput] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    onSearch(input)
    setInput('')
  }

  return (
    <form onSubmit={handleSubmit} className="search-form">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Stadt suchen..."
      />
      <button type="submit">Suchen</button>
    </form>
  )
}

export default Search