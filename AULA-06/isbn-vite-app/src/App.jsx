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
      const data = await response.json();

      if (data?.title) {
        setLivro(data);
      } else {
        setErro('Livro não encontrado. Verifique o ISBN.');
      }
    } catch (err) {
      setErro('Erro ao conectar à API. Tente novamente mais tarde.');
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
          <p><strong>Autor(es):</strong> {livro.authors?.join(', ') || 'Desconhecido'}</p>
          <p><strong>Editora:</strong> {livro.publisher || 'Desconhecida'}</p>
          <p><strong>Idioma:</strong> {livro.language || 'Não informado'}</p>
          <p><strong>Ano de Publicação:</strong> {livro.published || 'Desconhecido'}</p>
        </div>
      )}
    </div>
  );
}

export default App;
