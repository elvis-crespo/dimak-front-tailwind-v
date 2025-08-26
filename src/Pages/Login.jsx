import { Logo } from "../../public/Logo";
import {
  FormContainer,
  FormSubtitle,
  FormTitle,
} from "../components/Form";
import { NavigationIcon } from "../components/Icons/NavigationIcon";
import { useNavigate } from "react-router";
import Icon from "../components/Icons/Icon";
import { useState } from "react";
import { loginUser } from "../redux/userReducer";
import { useDispatch, useSelector } from "react-redux";


export default function Login() {
  const [userName, setuserName] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { isLoading, error } = useSelector((state) => state.user);

  const diaspatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    let userCred = {
      userName,
      password,
    };

    diaspatch(loginUser(userCred)).then((result) => {
      if (result.payload) {
        setuserName("");
        setPassword("");
        navigate("/home");
      }
    });
  };
  return (
    <>
      <div
        className="font-apple flex flex-col items-center justify-center min-h-screen w-full bg-[url('/assets/images/image-login-mobile.png')] md:bg-[url('/assets/images/image-login.png')] 
        bg-no-repeat bg-cover bg-center text-white dark:text-black transition-all duration-300 animate-fadeInSlight"
      >
        <FormContainer
          onSubmit={handleLogin}
          className="backdrop-blur-lg bg-white/10 dark:bg-black/20 border border-white/20 rounded-2xl shadow-lg"
        >
          <FormTitle className="flex justify-center text-white">
            Inicio de Sesión
          </FormTitle>

          <Logo theme={"dark"} className="text-red-600 md:col-span-2" />

          <FormSubtitle className="bg-black flex justify-center ">
            Sistema Integral de Instalaciones Vehiculares
          </FormSubtitle>

          <input
            type="text"
            placeholder="Usuario"
            name="text"
            value={userName}
            onChange={(e) => setuserName(e.target.value)}
            autoComplete="off"
            className="mt-5 w-full h-[40px] rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_0_0_#323232] text-[15px] font-semibold text-[#323232] px-2.5 py-1.5 
              outline-none placeholder:text-[#666] placeholder:opacity-80 focus:border-[#2d8cf0] md:col-span-2"
          />

          <div className="relative mt-5 w-full md:col-span-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              name="text"
              value={password}
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-[40px] rounded-md border-2 border-[#323232] bg-white shadow-[4px_4px_0_0_#323232] text-[15px] font-semibold text-[#323232] px-2.5 py-1.5 
                outline-none placeholder:text-[#666] placeholder:opacity-80 focus:border-[#2d8cf0]"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-[#323232]"
              title={showPassword ? "Ocultar Contraseña" : "Mostrar Contraseña"}
              onClick={() => setShowPassword(!showPassword)}
            >
              {!showPassword ? (
                <Icon name="icon-show-password" />
              ) : (
                <Icon name="icon-hide-password" />
              )}
            </button>
          </div>

          <div className="flex items-center justify-center col-span-1 md:col-span-2 mt-10">
            <NavigationIcon
              text={isLoading ? "Loading..." : "Iniciar Sesión"}
              icon={
                <Icon
                  name="icon-login"
                  className={"hover:scale-105 transition-all duration-300"}
                />
              }
              className="dark"
              type="submit"
            />
          </div>

          {error && (
            <div className="flex justify-center bg-red-100 border-red-600 border-1 text-red-600 p-2 rounded-md md:col-span-2 animate-fadeInScale duration-300">
              {error}
            </div>
          )}
        </FormContainer>
      </div>
    </>
  );
}