import { useSelector } from "react-redux";
import Layout from "../components/Layout";

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

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  const currentHour = new Date().getHours();
  let greeting = "";
  if (currentHour < 12) greeting = "¡Buenos días!";
  else if (currentHour < 18) greeting = "¡Buenas tardes!";
  else greeting = "¡Buenas noches!";

  return (
    <>
      <Layout>
        {theme === "dark" ? (
          <img
            src="/assets/images/logo-dark.svg"
            alt="dimak-logo"
            className="transition-all duration-500 animate-fadeInScale"
          />
        ) : (
          <img
            src="/assets/images/logo-light.svg"
            alt="dimak-logo"
            className="transition-all duration-500 animate-fadeInSlight"
          />
        )}

        <h1 className="pt-10 text-center text-lg sm:text-2xl lg:text-3xl text-text-light dark:text-text-dark  transition-all duration-300 hover:cursor-crosshair">
          {greeting}{" "}
          {user?.[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
          ] || "undefined user"}
          .
          <br />
          <br />
          <span className="text-sm sm:text-lg lg:text-xl italic flex justify-center items-center transition-all duration-300 hover:cursor-crosshair rounded">
            &quot;{randomQuote.quote}&quot; <br /> - {randomQuote.author}
          </span>
        </h1>
      </Layout>
    </>
  );
}
