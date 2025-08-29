import { useSelector } from "react-redux";
import Particles from "../components/Particles";
import { Logo } from "../../public/Logo";
import { Sidebar } from "../components/SideBar";
import DropdownMenu from "../components/DropdownMenu";

const quotes = [
  {
    quote:
      "La vida es lo que sucede mientras estás ocupado haciendo otros planes.",
    author: "John Lennon",
  },
  {
    quote: "El único modo de hacer un gran trabajo es amar lo que haces.",
    author: "Steve Jobs",
  },
  {
    quote: "No busques el momento perfecto, busca el momento y hazlo perfecto.",
    author: "Anónimo",
  },
  {
    quote: "La felicidad no es algo hecho. Proviene de tus propias acciones.",
    author: "Dalai Lama",
  },
  {
    quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    author: "Robert Collier",
  },
  { quote: "El futuro depende de lo que hagas hoy.", author: "Mahatma Gandhi" },
  {
    quote: "No cuentes los días, haz que los días cuenten.",
    author: "Muhammad Ali",
  },
  {
    quote: "La vida es 10% lo que me ocurre y 90% cómo reacciono ante ello.",
    author: "Charles R. Swindoll",
  },
  {
    quote:
      "El único modo de descubrir los límites de lo posible es ir más allá de ellos en lo imposible.",
    author: "Arthur C. Clarke",
  },
  {
    quote:
      "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.",
    author: "Proverbio chino",
  },
  {
    quote: "La vida comienza donde termina tu zona de confort.",
    author: "Neale Donald Walsch",
  },
  {
    quote: "Haz lo que puedas, con lo que tengas, donde estés.",
    author: "Theodore Roosevelt",
  },
  {
    quote:
      "El único lugar donde el éxito viene antes que el trabajo es en el diccionario.",
    author: "Vidal Sassoon",
  },
  {
    quote:
      "No importa cuántas veces fracases, lo que importa es cuántas veces te levantas.",
    author: "Mary Pickford",
  },
];

export default function Home() {
  const { user } = useSelector((state) => state.user);
  const theme = useSelector((state) => state.theme.theme);

  const userName =
    user?.["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  const isAdmin =
    user?.["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] ===
    "Admin";

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const currentHour = new Date().getHours();
  let greeting = "";
  if (currentHour < 12) greeting = "¡Buenos días!";
  else if (currentHour < 18) greeting = "¡Buenas tardes!";
  else greeting = "¡Buenas noches!";

  return (
    <>
      <Particles />
      <Sidebar isAdmin={isAdmin} />
      <DropdownMenu />
      <div className="min-h-screen flex-1 flex flex-col items-center justify-center md:ml-[72px] pt-20 xl:ml-64 p-4 sm:p-8 lg:p-16">
        <Logo theme={theme} />

        <h1 className=" text-lg sm:text-2xl lg:text-3xl text-text-light dark:text-text-dark transition-all duration-300 ease-in-out hover:bg-white hover:dark:bg-gray-950 hover:drop-shadow-lg hover:cursor-crosshair z-10 p-4 mt-4 mmt-8">
          {greeting} {userName || "undefined user"}
        </h1>

        <div className=" text-text-light dark:text-text-dark transition-all duration-300 ease-in-out hover:bg-white hover:dark:bg-gray-950 hover:drop-shadow-lg hover:cursor-crosshair rounded z-10 p-4">
          <p className="text-sm sm:text-lg lg:text-xl italic flex justify-center items-center">
            &quot;{randomQuote.quote}&quot;
          </p>
          <span className="text-xs sm:text-sm md:text-lg italic flex justify-end pt-2">
            - {randomQuote.author}
          </span>
        </div>
      </div>
    </>
  );
}
