import { createGlobalStyle } from "styled-components";
import {colors} from "./variables";

export const GlobalStyle = createGlobalStyle`
  body {
    font-family: lato, sans-serif;
    background-color:${colors.white};
  }

`;



export default GlobalStyle;


