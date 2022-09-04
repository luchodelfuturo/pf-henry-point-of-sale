import styled from 'styled-components';
import {colors} from "./variables";

export const Button = styled.button`
    background-color: ${colors.violet};
    border-radius: 0.3rem;
    border-style: none;
    width: 60rem;
    height: 3rem;
    font-family: 'Century Gothic';
    font-weight: bold;
    color: ${colors.white};
    font-size: 17px;
    cursor: pointer;
    transition: all 0.5s ease;
    margin:0rem 0.5rem;
    &:hover{
        background-color: ${colors.grey1};
    }
`
export const ButtonX = styled.button`
    background-color: ${colors.violet};
    border-radius: 0.3rem;
    border-style: none;
    width: 3rem;
    height: 3rem;
    font-family: 'Century Gothic';
    font-weight: bold;
    color: ${colors.white};
    font-size: 17px;
    cursor: pointer;
    transition: all 0.5s ease;
    margin:0rem 0.5rem;
    position: absolute;
    right: 1rem;
    top: 1rem;
    &:hover{
        background-color: ${colors.grey1};
    }
`
export const ButtonDis = styled.button`
    background-color: ${colors.grey4};
    border-radius: 0.3rem;
    border-style: none;
    height: 3rem;
    font-family: 'Century Gothic';
    font-weight: bold;
    color: ${colors.white};
    font-size: 17px;
`
export const ButtonDelete = styled.button`
    background-color: ${colors.violet};
    border-radius: 0.3rem;
    border-style: none;
    height: 3rem;
    font-family: 'Century Gothic';
    font-weight: bold;
    color: ${colors.white};
    font-size: 17px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        background-color: ${colors.grey1};
    }
`
export const ButtonSave = styled.button`
    background-color: ${colors.green};
    border-radius: 0.3rem;
    border-style: none;
    height: 3rem;
    font-family: 'Century Gothic';
    font-weight: bold;
    color: ${colors.white};
    font-size: 17px;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover{
        background-color: ${colors.grey1};
    };
    &:disabled{
        background-color: ${colors.grey4};
    }
`


export const NavBar = styled.nav`
    background-color: ${colors.grey2};
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
    font-family: 'Century Gothic';
    font-weight: bold;
    color: ${colors.white};
    font-size: 27px;
    margin-right: 5rem;
    margin-left: 2rem;
    margin-top: 0.3rem;
`

export const contenedorEmergentes = styled.div`
    background-color: ${colors.black};
    width: 100%;
    height: 100vh;
    z-index: 20;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-content: center;
`