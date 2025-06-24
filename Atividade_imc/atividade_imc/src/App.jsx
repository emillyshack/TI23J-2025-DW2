import { useState } from 'react';
import './App.css';

function App() {
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [imc, setImc] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [erro, setErro] = useState('');

  const calcularIMC = () => {
    setErro('');
    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!pesoNum || !alturaNum || alturaNum <= 0) {
      setImc(null);
      setCategoria('');
      setErro('Por favor, preencha os campos corretamente.');
      return;
    }

    const imcCalculado = pesoNum / (alturaNum * alturaNum);
    setImc(imcCalculado.toFixed(2));

    let cat = '';
    if (imcCalculado < 18.5) cat = 'Baixo peso';
    else if (imcCalculado < 25) cat = 'Peso normal';
    else if (imcCalculado < 30) cat = 'Excesso de peso';
    else if (imcCalculado < 35) cat = 'Obesidade de classe 1';
    else if (imcCalculado < 40) cat = 'Obesidade de classe 2';
    else cat = 'Obesidade de classe 3';

    setCategoria(cat);
  };

  return (
    <div className="container">
      <h1>Calculadora de IMC</h1>
      <div className="input-group">
        <label>Peso (kg)</label>
        <input
          type="number"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Ex: 70"
        />
      </div>
      <div className="input-group">
        <label>Altura (m)</label>
        <input
          type="number"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Ex: 1.75"
        />
      </div>
      <button
        onClick={calcularIMC}
        disabled={!peso || !altura}
        className={!peso || !altura ? 'disabled' : ''}
      >
        Calcular IMC
      </button>

      {erro && <p className="erro">{erro}</p>}

      {imc && (
        <div className="resultado">
          <p><strong>IMC:</strong> {imc}</p>
          <p><strong>Classificação:</strong> {categoria}</p>
        </div>
      )}
    </div>
  );
}

export default App;
