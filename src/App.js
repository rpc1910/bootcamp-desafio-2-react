import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState("");

  async function handleAddRepository(e) {
    e.preventDefault();
    try {
      const form = {
        title,
        url,
        techs: techs.split(","),
      };

      const { data } = await api.post("repositories", form);

      setRepositories([...repositories, data]);
    } catch (e) {
      console.error("Ops", e);
    }
  }

  async function handleRemoveRepository(id) {
    try {
      await api.delete(`repositories/${id}`);
      const results = repositories.filter((item) => item.id !== id);
      setRepositories(results);
    } catch (e) {
      console.error("Ops", e);
    }
  }

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await api.get("repositories");
        setRepositories(data);
      } catch (e) {
        console.error("Ops", e);
      }
    }

    fetch();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <hr />
      <form onSubmit={handleAddRepository}>
        <input
          type="text"
          placeholder="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
        <input
          type="text"
          placeholder="URL"
          onChange={({ target }) => setUrl(target.value)}
        />
        <input
          type="text"
          placeholder="Techs"
          onChange={({ target }) => setTechs(target.value)}
        />
        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;
