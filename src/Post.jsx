export function Post(registro){

    if(!registro || registro == []){
        return 
    }

    return (
        <div className="container">

            <div><figure className="figura"><img src={registro.img} /></figure></div>

            <div>

                <span className="categoria">{registro.select}</span>
                <h3>{registro.titulo}</h3>
                <p>{registro.descricao}</p>

                <span>Publicado em:&nbsp;&nbsp;&nbsp;{registro.data}</span>
            </div>
        
            <div className="celula-Btn">
                <button className="exclui">excluir</button>
            </div>
        </div>
    );
}