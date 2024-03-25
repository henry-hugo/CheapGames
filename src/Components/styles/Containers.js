import styled from "styled-components";

export const Menu = styled.nav`
    display: flex;
    height: 100px;
    background-color: ${props => props.backgroundColor || 'whitesmoke'}; 
    align-items: center;
    justify-content: center;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: ${props => props.direction || 'row'};
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 24px;
`;

export const Card = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
`;