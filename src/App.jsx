import { useEffect, useState} from 'react';
import './App.css';
import { Form } from './Form';
import { Post } from './Post';

function App() {


   const [registros, setRegistros] = useState([]);
  
    useEffect(() => {

      setRegistros(JSON.parse(localStorage.getItem("registros")));

    },[]);

    function atualizarLista(){
      setRegistros(JSON.parse(localStorage.getItem("registros")));
    }

    return (
        <div>
          <Form registros={registros} refresh={atualizarLista} />

          {registros.map((registro)=>{

            return <Post registro={registro} key={registro.id} refresh={atualizarLista} />
          })}
        </div>
    )
}

export default App