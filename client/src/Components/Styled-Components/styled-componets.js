import styled from 'styled-components';

export const Button = styled.button`
    background-color: #7f5af0;
    border-radius: 0.3rem;
    border-style: none;
    width: 60rem;
    height: 3rem;
    font-family: 'Century Gothic', Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #fffffe;
    font-size: 17px;
    cursor: pointer;
    transition: all 0.5s ease;
    margin:0rem 0.5rem;

    &:hover{
        background-color: #16161a;
    }
`



export const NavBar = styled.nav`
    background-color: #242629;
    position: fixed;
    bottom: 0;
    height: 4rem;
    width: 100%;
    margin: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 1rem;
    padding-left: 2rem;
`

export const Time = styled.h2`
    font-family: 'Century Gothic', Arial, Helvetica, sans-serif;
    font-weight: bold;
    color: #fffffe;
    font-size: 27px;
    margin-right: 5rem;
    margin-left: 2rem;
    margin-top: 0.3rem;
`