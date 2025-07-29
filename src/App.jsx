//import { useState } from 'react'
//import { useRef } from 'react';
import './App.css';
import { Form } from './Form';
import { Post } from './Post';

let registros = JSON.parse(localStorage.getItem("registros"));

console.log(registros);
function App() {

    return (
        <div>

          <Form />

          <section>
            {Post(registros[0])}
          </section>

        </div>
    )
}

export default App