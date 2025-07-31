export function Post({registro, refresh}){

    if(!registro){
        return
    }   

    function handDelete(id){

        let lista = JSON.parse(localStorage.getItem("registros"));

        for(let i=0;i<lista.length;i++){
            if(lista[i].id == id){
                lista.splice(i, 1);
                
            }
        }

        localStorage.setItem("registros", JSON.stringify(lista));
        refresh();
    }


    return (

            <div className="container">

            <div><figure className="figura"><img src={registro.img} /></figure></div>

            <div>
                <span className="categoria">{registro.select}</span>
                <h3>{registro.titulo}</h3>
                <p>{registro.descricao}</p>
                <span>Publicado em:&nbsp;&nbsp;&nbsp;{registro.data}</span>
                <p>{registro.id}</p>
            </div>

            <div className="celula-Btn">
                <button className="exclui" onClick={()=> handDelete(registro.id)}>excluir</button>
            </div>
        </div>

        )
    }