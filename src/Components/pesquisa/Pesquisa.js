import { Texto, Titulo, Input } from "../styles/Textos"
import { Container } from "../styles/Containers"
import { useState } from "react"
import Resultado from "./Resultados";

const Pesquisa = () => {
    const [termoBusca, setTermoBusca] = useState('');
    const [livros, setLivros] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch(`http://localhost:8080/buscarLivrosPorTitulo/${termoBusca}`);
            const data = await response.json();
            setLivros(data);
        }catch(error){
            console.error(error);
        }
    }

    return (
        <Container direction="column">
            <Titulo color="white">Encontre seu próximo livro</Titulo>
            <Texto color="white">Explore por título o livro desejado</Texto>
            <Input
            placeholder="Digite o nome de um livro..."
            value={termoBusca}
            onChange={(e) => setTermoBusca(e.target.value)}/>

            <button onClick={handleSubmit}>Pesquisar</button>
            <Resultado livros={livros}/>
        </Container>
    )

}

export default Pesquisa;