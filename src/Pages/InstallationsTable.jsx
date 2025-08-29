import { useState } from "react";
import Swal from "sweetalert2";
import { validateFields } from "../utils/validateFields.js";
import axiosInstance from "../utils/axiosInstance";
import Layout from "../components/Layout.jsx";
import FormTitle from "../components/Form/FormTitle.jsx";
import { CustomerTable } from "../components/CustomTable.jsx";
import { customSwal } from "../utils/swalConfig.js";
import FormButton from "../components/Form/FormButton.jsx";
import Icon from "../components/Icons/Icon.jsx";

export default function InstallationsTable() {
  const columnsHeader = [
    "Placa",
    "Nº de Factura",
    "Nº de ficha técnica",
    "Detalles de la Instalación",
    "Técnico",
    "Fecha",
    "Imagen",
  ];
  const columnKeys = [
    "plateId",
    "invoiceNumber",
    "technicalFileNumber",
    "installationCompleted",
    "technicianName",
    "date",
    "photoUrl",
  ];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputSearch, setinputSearch] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    event.preventDefault();
    if (!inputSearch.trim()) {
      return customSwal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese un valor en el campo de búsqueda.",
      });
    }

    // Validar la placa antes de enviar
    const validationError = validateFields.invoiceNumber(inputSearch.trim());
    if (validationError) {
      Swal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }
    setLastSearchedValue(inputSearch.trim()); // Limpia el último valor buscado.

    const response = await handleFetch();

    if (response.isSuccess === true) {
      const transform = [response.data];
      setData(transform);
      setLastSearchedValue(inputSearch.trim()); // Actualiza el último valor buscado.
    }
  };

  const handleFetch = async () => {
    setIsLoading(true);
    setData([]);
    try {
      const response = await axiosInstance.get(
        `/installation/?invoiceNumber=${inputSearch}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      // No se encontró la instalación
      if (error.response && error.response.status === 404) {
        setData([]);
        // setAllFetched(false);
        customSwal.fire({
          icon: "info",
          title: "No encontrado",
          text: `No existe ninguna instalación registrada con el Nº de Factura ${inputSearch}.`,
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
        <div className="w-full max-w-7xl appear mx-auto mt-10 p-6 bg-[rgb(248,249,252)] dark:bg-black shadow-lg dark:shadow-gray-900 rounded-lg font-display gap-4">
          <FormTitle>Consulta de Instalaciones</FormTitle>
          <form
            className="flex flex-col md:flex-row gap-4 mb-6 mt-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              id="invoiceNumber"
              name="invoiceNumber"
              autoComplete="off"
              placeholder="Buscar por número de factura (001-001-123456789 o 001-001-op3456789)"
              value={inputSearch}
              onChange={(e) => setinputSearch(e.target.value.toUpperCase().trim())}
              className="border border-gray-300 dark:text-white rounded-lg px-4 py-2 w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                title="Buscar Instalación"
                loadingText="Buscando..."
                color="blue"
                type="submit"
                isLoading={isLoading}
                disabled={!!inputSearch.trim() && inputSearch.trim() === lastSearchedValue}
              />
              <FormButton
                icon={
                  <Icon
                    name="icon-search-all-form"
                    className={"w-6 h-6 text-white"}
                  />
                }
                text="Ver Todos"
                title="Contruyendo..."
                loadingText="Cargando..."
                color="blue"
                type="submit"
                className={"w-32"}
                onClick={() => {
                  alert("Ver Todos");
                }}
                isLoading={isLoading}
                disabled
              />
            </div>
          </form>
          <CustomerTable
            data={data}
            columnsHeader={columnsHeader}
            columnKeys={columnKeys}
            isLoading={isLoading}
          />
        </div>
      </Layout>
    </>
  );
}
