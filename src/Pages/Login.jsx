import styled from "styled-components";
import {
  FormContainer,
  FormField,
  Input,
  Label,
  SectionTitle,
  Title,
} from "../components/CustomFormStyled";
import Button from "../components/Button";
import { useState } from "react";
import { loginUser } from "../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LuEyeClosed, LuEye } from "react-icons/lu";
import { LogoDark } from "../../public/Logo";
import { themeTypography } from "../utils/themes";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  background-image: url("/assets/images/image-login.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px 20px;
  Z-index: 4;
  transition: all 0.5s ease-in-out;

  a {
    text-decoration: none;
    display: flex;
    justify-content: center;
    pointer-events: none;
  }

  /* Ajustes responsivos opcionales */
  @media (max-width: 768px) {
    background-image: url("/assets/images/image-login-mobile.png");
  }
`;

const Container = styled(FormContainer)`
  background: rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(11.5px);
  -webkit-backdrop-filter: blur(11.5px);
  border: 1px solid rgba(255, 255, 255, 0.16);
`;

const ErrorMessage = styled.div`
  font-family: ${themeTypography.fontFamily};
  color: #FF0000;
  text-align: center;
  border: 1px solid red;
  padding: 0.5rem;
  border-radius: 5px;
  width: 100%;
  margin-top: 1rem;
`;

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true);

 const handleUserNameChange = (event) => {
   const value = event.target.value;
   const regex = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ0-9_-]*$/;

   if (regex.test(value) && !value.includes(" ")) {
     setUserName(value);
   }
 };

 const handlePasswordChange = (event) => {
   const value = event.target.value;
   setPassword(value);

   // Validación más simple para la contraseña
   const regex = /^(?=.*[a-zA-Z])(?=.*\d|[!@#$%^&*()_+-=[]{}|;:,.<>?]).{6,}$/;
   setPasswordValid(regex.test(value) && !value.includes(" ")); // Establecer el estado de validez
 };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let userCred = {
      userName,
      password,
    };

    dispatch(loginUser(userCred)).then((result) => {
      if (result.payload) {
        setUserName("");
        setPassword("");
        navigate("/home");
      }
    });
  };

  const { isLoading, error } = useSelector((state) => state.user);

  return (
    <>
      <LoginContainer>
        <Container as={"form"} onSubmit={handleLogin}>
          <Title
            style={{
              marginBottom: "0",
              textTransform: "uppercase",
              color: "#e7e7e7",
            }}
          >
            Inicio de Sesión
          </Title>
          <LogoDark
            currentWidth={"200px"}
            currentHeight={"200px"}
          />
          <SectionTitle
            style={{ textAlign: "center", backgroundColor: "#6d6d6d" }}
          >
            Sistema Integral de Instalaciones Vehiculares
          </SectionTitle>
          <FormField style={{ marginTop: "1.5rem" }}>
            <Label htmlFor="username" style={{ color: "#ffffffab" }}>
              Usuario
            </Label>
            <Input
              style={{ backgroundColor: "#b0b0b0" }}
              id="username"
              type="text"
              placeholder="Usuario"
              autoComplete="username"
              value={userName}
              onChange={handleUserNameChange}
            />
          </FormField>

          <FormField style={{ marginTop: "1.5rem" }}>
            <Label htmlFor="password" style={{ color: "#ffffffab" }}>
              Contraseña
            </Label>
            <div style={{ position: "relative" }}>
              <Input
                style={{
                  backgroundColor: "#b0b0b0",
                  width: "100%",
                }}
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Contraseña"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />

              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <LuEye style={{ width: "25px", height: "25px" }} />
                ) : (
                  <LuEyeClosed style={{ width: "25px", height: "25px" }} />
                )}
              </div>
            </div>
          </FormField>
          {!passwordValid && (
            // <ErrorMessage style={{ color: "#ff0000", padding: "0.5rem", fontSize: "1.1rem" }}>
            <ErrorMessage>
              La contraseña debe tener al menos 6 caracteres, incluir un número
              o carácter especial, y no puede tener espacios.
            </ErrorMessage>
          )}

          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              // text={"Iniciar Sesión"}
              text={isLoading ? "Loading..." : "Iniciar Sesión"}
              type="submit"
            />
          </div>
          {error && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ErrorMessage>{error}</ErrorMessage>
            </div>
          )}
        </Container>
      </LoginContainer>
    </>
  );
}
