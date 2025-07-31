import { useEffect, useState } from 'react'
import { useRef } from 'react';

export function Form({registros,refresh}){

  useEffect(()=>{
    if(registros.length > 0){
    setNumero(registros.length);
  }
  }, [registros])

    
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [img, setImg] = useState("");
  const [data, setData] = useState(crono());
  const [numero, setNumero] = useState(registros.length);
  const [select, setSelect] = useState("artigo");
  const imgRef = useRef(null);
  const dataRef = useRef(null);
  let url = imgRef.current;

  function crono(){

  let hoje = new Date();

  let mes = String(hoje.getMonth()+1).padStart(2, '0');
  let dia = String(hoje.getDate()).padStart(2, '0');


  return `${hoje.getFullYear()}-${mes}-${dia}`;
}

  function contagem(){
    setNumero(registros.length);
  }

  function guardar(){

     let sequence = Number(localStorage.getItem("sequence"));
    
    if((isNaN(sequence))){
      sequence = 0;
    }

    sequence++;
    localStorage.setItem("sequence", sequence);

    registros.push({
      titulo: titulo,
      descricao: descricao,
      img: img,
      data: data,
      select: select,
      id: sequence
    });

    localStorage.setItem("registros", JSON.stringify(registros));

    refresh();
    
  }  

  function validacao(){
    let valor = url.value;
    let data = dataRef.current;
    let dataValor = data.value.split("-");
    let hoje = crono().split("-");
    let dataInvalida = false;
    let urlInvalida = false;

      if(!valor.startsWith("http")){
        url.setCustomValidity("URL de imagem inválida!");
        url.reportValidity();
        urlInvalida = true;
      }

      if(!(dataValor[0] >= hoje[0])){
        dataInvalida = true;
      }

      if(!(dataValor[1] >= hoje[1])){
        if(!(dataValor[0] > hoje[0])){
          dataInvalida = true;
        }
      }

      if(!(dataValor[2] >= hoje[2])){
        if(!(dataValor[1] > hoje[1])){
          dataInvalida = true;
        }
      }

      if(dataInvalida){
        data.setCustomValidity("não é possível salvar no passado");
        data.reportValidity();
      }

      if(dataInvalida || urlInvalida){
        return true;
      }

      return false;
  }

    function save(event){
    event.preventDefault();
    
    if(!validacao()){
    guardar();
    contagem();
    
    setDescricao("");
    setTitulo("");
    setImg("");
    
    }
  }

    return (
        <>
          <header>
            <h1>Painel de Gerenciamento</h1>
            <p>Atualmente você tem <strong >{numero}</strong> <strong>posts</strong> cadastrados</p>
          </header>

          <form onSubmit={save}>

            <div>
            <label htmlFor="titulo">Título</label>
            <input id="titulo" type="text" value={titulo}
             onChange={(event)=>{  setTitulo(event.target.value)}} required />
            </div>

            <div>
              <label htmlFor="descricao">Descrição</label>
            <textarea id="descricao" value={descricao}
             onChange={(event) => {setDescricao(event.target.value)}} required />
            </div>

            <div>
              <label htmlFor="img">URL da imagem de capa</label>
            <input id="img" type="text" value={img} ref={imgRef} 
                 onInput={()=>{if (imgRef.current) {imgRef.current.setCustomValidity('');
              }}}onChange={(event)=>{setImg(event.target.value)}} />
            </div>
              
            <div>
              <label htmlFor="data">Data de publicação</label>
            <input type="date" id="data" value={data} ref={dataRef}
              onChange={(event)=>{setData(event.target.value)}}
              onInput={()=>{if (dataRef.current) {dataRef.current.setCustomValidity('')}}} />
            </div>

          <div>
            <label htmlFor="select">Tipo do post</label>
          <select id="select" onChange={(event)=>{setSelect(event.target.value)}}>
            <option value="ARTIGO">Artigo</option>
            <option value="NOTICIA">Noticia</option>
            <option value="TUTORIAL">Tutorial</option>
            <option value="ENTREVISTA">Etrevista</option>
          </select>
          </div>

            <button type="submit">Publicar</button>
          </form>
          </>
    )
}