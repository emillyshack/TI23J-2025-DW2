import { useState } from 'react';
import './App.css';

function App() {
  const [isbn, setIsbn] = useState('');
  const [livro, setLivro] = useState(null);
  const [erro, setErro] = useState('');

  const buscarLivro = async () => {
    setErro('');
    setLivro(null);

    const isbnLimpo = isbn.replace(/[^0-9Xx]/g, '');

    if (isbnLimpo.length !== 10 && isbnLimpo.length !== 13) {
      setErro('O ISBN deve conter 10 ou 13 dígitos.');
      return;
    }

    try {
      const response = await fetch(`https://brasilapi.com.br/api/isbn/v1/${isbnLimpo}`);
      if (!response.ok) {
        throw new Error('Livro não encontrado. Verifique o ISBN.');
      }
      const data = await response.json();
      setLivro(data);
    } catch (err) {
      setErro(err.message);
    }
  };

  return (
    <div className="container">
      <h1>Consulta de Livros por ISBN</h1>
      <input
        type="text"
        placeholder="Digite o ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
      />
      <button onClick={buscarLivro}>Buscar</button>

      {erro && <p className="erro">{erro}</p>}

      {livro && (
        <div className="livro-info">
          <h2>{livro.title}</h2>
          <p><strong>Autor(es):</strong> {livro.authors.join(', ')}</p>
          <p><strong>Editora:</strong> {livro.publisher}</p>
          <p><strong>Idioma:</strong> {livro.language}</p>
          <p><strong>Ano de Publicação:</strong> {livro.published}</p>
        </div>
      )}
    </div>
  );
}

export default App;
