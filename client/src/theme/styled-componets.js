import styled from "styled-components";
import { colors } from "./variables";

export const Button = styled.button`
  background-color: ${colors.violet};
  border-radius: 0.3rem;
  border-style: none;
  width: 60rem;
  height: 3rem;
  font-family: "Century Gothic";
  font-weight: bold;
  color: ${colors.white};
  font-size: 17px;
  cursor: pointer;
  transition: all 0.5s ease;
  margin: 0rem 0.5rem;
  &:hover {
    background-color: ${colors.grey1};
  }
`;
export const ButtonX = styled.button`
  background-color: ${colors.violet};
  border-radius: 0.3rem;
  border-style: none;
  width: 3rem;
  height: 3rem;
  font-family: "Century Gothic";
  font-weight: bold;
  color: ${colors.white};
  font-size: 17px;
  cursor: pointer;
  transition: all 0.5s ease;
  margin: 0rem 0.5rem;
  position: absolute;
  right: 1rem;
  top: 1rem;
  &:hover {
    background-color: ${colors.grey1};
  }
`;
export const ButtonDis = styled.button`
  background-color: ${colors.grey4};
  border-radius: 0.3rem;
  border-style: none;
  height: 3rem;
  font-family: "Century Gothic";
  font-weight: bold;
  color: ${colors.white};
  font-size: 17px;
`;
export const ButtonDelete = styled.button`
  background-color: ${colors.violet};
  border-radius: 0.3rem;
  border-style: none;
  height: 3rem;
  font-family: "Century Gothic";
  font-weight: bold;
  color: ${colors.white};
  font-size: 17px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${colors.grey1};
  }
`;
export const ButtonSave = styled.button`
  background-color: ${colors.green};
  border-radius: 0.3rem;
  border-style: none;
  height: 3rem;
  font-family: "Century Gothic";
  font-weight: bold;
  color: ${colors.white};
  font-size: 17px;
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: ${colors.grey1};
  }
  &:disabled {
    background-color: ${colors.grey4};
  }
`;

export const ButtonCart = styled.button`
  border-radius: 0.3rem;
  border-style: none;
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.25));
  font-family: "Lato";
  //font-weight: bold;
  font-size: 17px;
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    background-color: ${colors.grey5};
  }
`;

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
`;

export const Time = styled.h2`
  font-family: "Century Gothic";
  font-weight: bold;
  color: ${colors.white};
  font-size: 27px;
  margin-right: 5rem;
  margin-left: 2rem;
  margin-top: 0.3rem;
  min-width: 100px;
`;

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
`;

export const FiltrosDiv = styled.div`
  background-color: ${colors.grey2};
  width: 100%;
  color: ${colors.white};
  display: flex;
  flex-direction: row;
`;

export const Tag = styled.div`
  font-weight: 600;
  font-size: 18px;
  text-align: center;
  //vertical-align: middle;

  //width: 100px;
  padding-left: 7px;
  padding-right: 7px;
  height: 28px;
  background-color: ${colors.lgreen};
  border-radius: 25px;
`;

export const SearchInput = styled.input`
  padding-left: 15px;
  margin-top: 10px;
  font-size: 16px;
  width: 250px;
  height: 40px;
  border-radius: 10px;
  margin-left: 10px;
  box-shadow: 4px 6px 9px -4px rgba(0, 0, 0, 0.25);
  border:none;
`;
export const SearchBtn = styled.button`
  margin-top: 10px;
  margin-left: 5px;
  padding-bottom: 2px;
  font-size: 16px;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: none;
  background-color: ${colors.blue};
  color: white;
  box-shadow: 4px 6px 9px -4px rgba(0, 0, 0, 0.25);
`;

export const Select = styled.select`
padding-left: 5px;
margin-top: 10px;
margin-right: 30px;
height: 40px;
font-size: 16px;
background-color: white;
border-radius: 10px;
border: none;
box-shadow: 4px 6px 9px -4px rgba(0, 0, 0, 0.25);
`