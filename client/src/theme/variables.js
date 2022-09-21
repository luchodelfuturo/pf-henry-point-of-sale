import styled from "styled-components";

// Variables
export const colors = {
  violet: "#7f5af0",
  dviolet: "#544b6e",
  lviolet: "#8d6cf0",
  green: "#2cb67d",
  vlgreen: "#8eff65",
  lgreen: "#C4FFAF",
  dgreen: "#2AA300",
  aqua: "#81FD8D",
  red: "#FFB9AF",
  dred: "#FF6A6A",
  blue: "#5263FA",
  blue2: "#005FF0",
  white: "#fffffe",
  black: "#010101",
  grey1: "#16161a",
  grey2: "#242629",
  grey3: "#72757e",
  grey4: "#94a1b2",
  grey5: "#636363",
  grey7: "#777777",
  grey8: "#a5a5a5",
  yellow: "#E7D576",
  orange: "#FFB775",
  sky: "#B5FFED",
  grey50: "#F7FAFC",
  grey300: "#e9e9e9",
  grey400: "#bdbdbd",
  grey500: "#6D7076",
  grey800: "#121A23",
  grey900: "#0A1019",
};

export const BtnRounded = styled.button`
  transition: all 0.1s ease;
  font-family: "Lato", sans-serif;
  background: #fff;
  width: 87px;
  height: 45px;
  box-shadow: 4px 2px 9px -1px rgba(0, 0, 0, 0.25);
  border-radius: 26px;
  border: none;
  font-weight: 600;
  font-size: 18px;
  margin-right: 10px;
  cursor: pointer;

  &:active {
    transition: all 0.1s ease;
    transform: scale(0.95);
    background: rgba(92, 92, 92, 0.144);
  }
`;
