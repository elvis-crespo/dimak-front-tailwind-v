import Layout from "../components/Layout";
import {
  FormTitle,
} from "../components/Form";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { validateFields } from "../utils/validateFields.js";
import { CustomerTable } from "../components/CustomTable.jsx";
import { customSwal } from "../utils/swalConfig.js";

export default function SearchPlate() {
  const columnsHeader = ["Placa", "Propietario", "Marca", "Modelo", "Año"];
  const columnKeys = ["plate", "ownerName", "brand", "model", "year"];
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");


  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!inputValue.trim()) {
      return customSwal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese un valor en el campo de búsqueda.",
      });
    }

    if (inputValue.trim() === lastSearchedValue) {
      return customSwal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "Ya has buscado esta placa.",
      });
    }

    // Validar la placa antes de enviar
    const validationError = validateFields.plate(inputValue.trim());
    if (validationError) {
      customSwal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    const response = await handleFetch();

    if (response.isSuccess === true) {
      const transform = [response.data];
      setData(transform);
      setLastSearchedValue(inputValue.trim()); // Actualiza el último valor buscado.
    }
  };

  const handleFetch = async () => {
    try {
      setIsLoading(true);
      setData([]);
      const response = await axiosInstance.get(
        `/vehicle/search-plate?plate=${inputValue}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      // Verifica si el error es de red (servidor caído o no accesible)
      if (error.response && error.response.status === 404) {
        setData([]);
        // setAllFetched(false);
        customSwal.fire({
          icon: "info",
          title: "No encontrado",
          text: `No existe ningún vehículo registrado con la placa ${inputValue}.`,
        });
      } else if (!error.response) {
        // Otro tipo de error en la respuesta del servidor (sin respuesta)
        customSwal.fire({
          icon: "error",
          title: "Error del servidor",
          text: "Ocurrió un error en el servidor. Por favor, inténtalo más tarde.",
        });
      } else {
        customSwal.fire({
          icon: "warning",
          title: "Error",
          text: `Ocurrió un error al buscar el vehículo, por favor, reintenta. Error: ${error.response.message}`,
        });
      }
      return error.response.data;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Layout>
        <div className=" w-full max-w-4xl appear mx-auto mt-10 p-6 bg-white dark:bg-gray-900 shadow-lg rounded-lg font-display gap-4">
          <FormTitle>Consulta de Vehículos</FormTitle>
          <form
            className="flex flex-col md:flex-row gap-4 mb-6 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="plate"
              name="plate"
              autoComplete="off"
              placeholder="Buscar por placa (AAA-1234 o AA-123A)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="border border-gray-300 rounded-lg dark:text-white px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              type="submit"
              title="Buscar vehículo por placa"
              disabled={isLoading}
              className={`font-semibold px-6 py-2 cursor-pointer rounded-lg transition ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {isLoading ? "Buscando..." : "Buscar"}
            </button>
            <button
              type="button"
              onClick={() => {
                alert("Ver Todos");
              }}
              disabled={isLoading}
              className={`font-semibold px-6 py-2 cursor-pointer rounded-lg transition ${
                isLoading
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-gray-300 hover:bg-gray-400 text-gray-800"
              }`}
            >
              {isLoading ? "Cargando..." : "Ver Todos"}
            </button>
          </form>
          <CustomerTable
            showActions={true}
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
          />
        </div>
      </Layout>
    </>
  );
}
