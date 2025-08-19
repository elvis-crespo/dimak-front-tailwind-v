/* eslint-disable react/prop-types */
import styled from "styled-components";
import AnimatedButton from "./AnimateButton";
import { themeTypography } from "../utils/themes";

const FormContainer = styled.form`
  display: flex;
  flex-direction: row; /* Por defecto en fila */
  gap: 10px;
  position: relative;
  width: 400px;
  height: 45px;
  margin: 110px 30px 80px 30px;
  font-family: ${themeTypography.fontFamily};
  z-index: 4;
  
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  input {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 10px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    background: ${({ theme }) => theme.inputBackground};
    border-radius: 5px;
    outline: none;
    color: ${({ theme }) => theme.inputText};
    font-size: 1em;

    &:valid ~ label,
    &:focus ~ label {
      color: ${({ theme }) => theme.labelFocusColor};
      transform: translateX(15px) translateY(-5px);
      font-size: 0.65em;
      padding: 0 10px;
      background: ${({ theme }) => theme.inputBackground};
      border-left: 1px solid ${({ theme }) => theme.labelBorder};
      border-right: 1px solid ${({ theme }) => theme.labelBorder};
      letter-spacing: 0.2em;
    }

    &:valid,
    &:focus {
      border: 1px solid ${({ theme }) => theme.labelBorder};
    }

    &:valid :nth-child(2),
    &:focus :nth-child(2) {
      background: ${({ theme }) => theme.labelActiveBackground};
      color: ${({ theme }) => theme.labelActiveText};
      border-radius: 3px;
    }
  }

  label {
    position: absolute;
    left: 0;
    padding: 10px;
    pointer-events: none;
    font-size: 1em;
    color: ${({ theme }) => theme.labelText};
    transition: 0.5s;
  }

  /* Media query para pantallas pequeñas */
  @media (max-width: 600px) {
    flex-direction: column; /* Cambiar la dirección del formulario a columna */
    width: 90%; /* Ajustar el ancho */
    // margin: 50px auto; /* Centrar en la pantalla */
    height: auto; /* Ajustar la altura según el contenido */

    .button {
      margin-top: 10px; /* Espaciado entre los elementos */
    }
  }
`;

export const SearchInput = ({ handleSubmit, inputValue, setInputValue, text }) => {
  return (
    <FormContainer onSubmit={handleSubmit}>
      <input
        type="text"
        required
        onChange={(e) => setInputValue(e.target.value)}
        value={inputValue}
      />
      <label>{text}</label>
      <div className="button">
        <AnimatedButton text={"Buscar"} />
      </div>
    </FormContainer>
  );
};
