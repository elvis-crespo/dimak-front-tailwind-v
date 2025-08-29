import { useNavigate } from "react-router";
import Icon from "../components/Icons/Icon";
import { NavigationIcon } from "../components/Icons/NavigationIcon";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div
      className="z-50 font-apple flex flex-col items-start justify-center min-h-screen w-full text-white dark:text-black transition-all duration-300 animate-fadeInSlight"
      style={{
        backgroundImage: `
      linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 90%),
      url('/assets/images/image-login.jpg')
    `,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center lg:px-2 xl:px-0 text-center mx-0 mb-12 lg:mb-0">
        <p className="text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-gray-300">
          404
        </p>
        <p className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider text-gray-300 mt-2">
          ¡Página no encontrada!
        </p>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-500 my-12">
          ¡Uy, parece que te perdiste! La página que buscas no existe o se ha
          movido.
        </p>
        <img
          src="/assets/images/404.jpg"
          alt="404"
          title="Sorry! Spiterman"
          className="w-1/2 rounded-2xl mb-6 lg:mb-8"
          // className="w-1/2 rounded-2xl animate-bounce mb-6 lg:my-8"
        />

        <NavigationIcon
          text="Volver al Inicio"
          type="button"
          icon={<Icon name="icon-home" className="w-6 h-6" />}
          onClick={() => navigate("/home")}
          className="dark"
        />
      </div>
    </div>
  );
}
