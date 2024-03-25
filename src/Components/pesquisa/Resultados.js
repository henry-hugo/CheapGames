import { useEffect, useState } from "react";
import { Titulo, Subitulo, Texto } from "../styles/Textos";
import { Card, Container } from "../styles/Containers";
import { Capa } from "../styles/Imagens";


const Resultado = ({livros}) => {
    if(livros.lenght === 0){
        return <p>Nenhum livro encontrado</p>
    }
    return (
        
         <Container>
            {
                livros.map((livro) => {
                    
                return(
                   
                        <Card>                    
                            <Titulo color="purple">{livro.titulo}</Titulo>
                            <Capa src={livro.imagem}></Capa>
                            <Subitulo>{livro.autor}</Subitulo>
                            <Subitulo>{livro.ano}</Subitulo>
                            <Texto color="green">{livro.preco}</Texto>
                        </Card>
                    
                )
                })
            }
        </Container>
        
    )
}

export default Resultado;