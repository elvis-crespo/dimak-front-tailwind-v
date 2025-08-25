import Layout from "../components/Layout";
import { FormButton, FormTitle } from "../components/Form";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance.js";
import { validateFields } from "../utils/validateFields.js";
import { CustomerTable } from "../components/CustomTable.jsx";
import { customSwal } from "../utils/swalConfig.js";
import Icon from "../components/Icons/Icon.jsx";

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

    setLastSearchedValue(inputValue.trim()); // Limpia el último valor buscado.

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
      return response.data;
    } catch (error) {
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
          text: `Ocurrió un error al buscar el vehículo, por favor, reintenta. Error: ${error.message}`,
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
        <div className="animate-fadeInSlight w-full max-w-4xl appear mx-auto mt-10 p-6 bg-[rgb(248,249,252)] dark:bg-black shadow-lg dark:shadow-gray-900 rounded-lg font-display gap-4">
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
            <div className="flex items-center justify-start md:col-span-2 gap-4">
              <FormButton
                icon={
                  <Icon
                    name="icon-search-form"
                    className={"w-6 h-6 text-white"}
                  />
                }
                text="Buscar"
                loadingText="Buscando..."
                color="blue"
                type="submit"
                disabled={isLoading}
                isLoading={isLoading}
              />
              <FormButton
                icon={
                  <Icon
                    name="icon-search-all-form"
                    className={"w-6 h-6 text-white"}
                  />
                }
                text="Ver Todos"
                loadingText="Cargando..."
                color="blue"
                type="submit"
                disabled
                className={"w-32"}
                onClick={() => {
                  alert("Ver Todos");
                }}
                isLoading={isLoading}
                // disabled={
                // !inputValue.trim() || inputValue.trim() === lastSearchedValue
                // }
              />
            </div>
          </form>
          <CustomerTable
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
            showActions={true}
            isLoading={isLoading}
          />
        </div>
      </Layout>
    </>
  );
}
