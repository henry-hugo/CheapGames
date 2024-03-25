import styled from "styled-components";

//Nossos components de estilos para os textos (titulo, subtitulo, texto...)

export const Titulo = styled.h1`
    font-size: ${props => props.size || '24px'};
    color: ${props => props.color || 'black'};
    line-weight: 1.5em;
`;

export const Subitulo = styled.h2`
    font-size: ${props => props.size || '20px'};
    color: ${props => props.color || 'black'};
    line-weight: 1.5em;
    font-weight: 700;
`;

export const Texto = styled.p`
    font-size: ${props => props.size || '16px'};
    color: ${props => props.color || 'black'};
    line-weight: 1.5em;
    font-weight: 400;
`;

export const PrecoAnterior = styled.p`
    font-size: ${props => props.size || '16px'};
    color: ${props => props.color || 'black'};
    line-weight: 1.5em;
    font-weight: 400;
    text-decoration-line: line-through;
`;

export const Input = styled.input`
    width: 300px;
    height: 10px;
    border-radius: 5px;
    border: 1px solid black;
    padding: 8px;
    background-color: #fff;
`;
