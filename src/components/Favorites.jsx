// components/Favorites.jsx
import React from 'react'

const Favorites = ({ favorites }) => {
  return (
    <div className="favorites">
      <h2>Favoriten</h2>
      <ul>
        {favorites.map((city, index) => (
          <li key={index}>{city}</li>
        ))}
      </ul>
    </div>
  )
}

export default Favorites