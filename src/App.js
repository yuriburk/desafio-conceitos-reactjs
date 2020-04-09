import React, { useState, useEffect } from "react";

import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: `Repositório ${Date.now()}`,
      owner: 'Yuri Burk',
    };

    const response = await api.post('repositories', repository);
    if (response.status === 200) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(repository) {
    const id = repository.id;

    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      setRepositories(repositories.filter(x => x.id !== id));
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories?.length > 0 && repositories.map(repository => {
          return (
            <li key={repository.id}>
              <span>{repository.title}</span>

              <button onClick={() => handleRemoveRepository(repository)}>
                Remover
              </button>
            </li>
          );
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
