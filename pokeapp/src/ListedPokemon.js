import React from 'react';

export default function ListedPokemon({ pokemon }) {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Lista de Pokémon</h2>
      <div className="row g-3">
        {pokemon.map(p => (
          <div key={p.id} className="col-12 col-sm-6 col-md-4 col-lg-2 text-center">
            <div className="card shadow-sm p-3 card hover-zoom">
              <img src={p.sprite} alt={p.name} className="card-img-top img-fluid" />
              <div className="card-body">
                <h5 className="card-title">{p.id} - {p.name}</h5>
                <p className="card-text">
                  <strong>Tipo(s):</strong> {p.types.join(', ')}
                </p>
                <p className="card-text"><strong>Altura:</strong> {p.height / 10} m</p>
                <p className="card-text"><strong>Peso:</strong> {p.weight / 10} kg</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
