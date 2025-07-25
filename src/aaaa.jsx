import { useRef } from 'react';

function Formulario() {
  const inputRef = useRef(null);

  function validacao() {
    const url = inputRef.current;
    const valor = url.value;

    if (valor.startsWith('http')) {
      url.setCustomValidity('URL de imagem inválida');
      url.reportValidity(); // Mostra a mensagem nativa do navegador
    } else {
      url.setCustomValidity('');
      url.reportValidity();
    }

    
  }

  return (
    <div>
      <input
        id="img"
        ref={inputRef}
        type="text"
        placeholder="Digite a URL da imagem"
        required
      />
      <button type="button" onClick={validacao}>
        Validar
      </button>
    </div>
  );
}
