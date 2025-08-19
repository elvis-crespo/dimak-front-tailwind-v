import Swal from "sweetalert2";
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormField,
  FormButton,
} from "../components/Form";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { validateFields } from "../utils/validateFields.js";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";

export default function DeleteInstallation() {
  const [inputValue, setInputValue] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [deleteType, setDeleteType] = useState("invoice"); 

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationError =
    deleteType === "invoice"
      ? validateFields.invoiceNumber(inputValue.trim()) 
      : validateFields.technicalFileNumber(inputValue.trim()); 
  
  if (validationError) {
    Swal.fire({
      icon: "error",
      title: "Error de Validación",
      text: validationError,
    });
    return;
  }
  
    Swal.fire({
      title: `¿Estás seguro?`,
      html: `¡No podrás revertir esta acción!<br />Se eliminará la instalación con ${
        deleteType === "invoice" ? "número de factura" : "expediente técnico"
      } <b>${inputValue}</b>.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await handleFetch();

        setLastSearchedValue(inputValue.trim());

        if (response.isSuccess) {
          Swal.fire({
            title: "¡Eliminado!",
            text: `Registro con ${
              deleteType === "invoice" ? "factura" : "expediente"
            } ${inputValue} ha sido eliminado.`,
            icon: "success",
          });
          setInputValue("");
        } else {
          Swal.fire({
            title: "Error",
            text: response.message || "Hubo un problema al eliminar el registro.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleFetch = async () => {
    const endpoint =
      deleteType === "invoice"
        ? `/installation/delete-by-invoice?invoiceNumber=${inputValue}`
        : `/installation/delete-by-technical-file?technicalFileNumber=${inputValue}`;

    try {
      const response = await axiosInstance.delete(endpoint, {
        headers: { "Content-Type": "application/json" },
      });
      return response.data;
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: `Error al eliminar: ${error.response?.data?.message || error.message}`,
      });
      return error.response?.data || { isSuccess: false };
    }
  };

  return (
    <Layout>
      <FormContainer onSubmit={handleFormSubmit}>
        <FormTitle>Eliminar una Instalación</FormTitle>
        <FormSubtitle>
          Esta acción es irreversible y no se podrá recuperar el registro
          eliminado.
        </FormSubtitle>

        <FormField
          id="deleteType"
          label="Eliminar por:"
          className="md:col-span-2"
        >
          <select
            id="deleteType"
            value={deleteType}
            onChange={(e) => setDeleteType(e.target.value)}
            className="px-4 py-2 text-base border border-gray-300 rounded-lg bg-[rgb(248,249,252)] dark:bg-[rgb(176,176,176)] dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500 outline-none"
            >
            <option value="invoice" >
              Número de Factura
            </option>
            <option value="technicalFile" >
              Expediente Técnico
            </option>
          </select>
        </FormField>

        <FormField
          label={
            deleteType === "invoice" ? "Nº de Factura" : "Expediente Técnico"
          }
          id="identifier"
          type="text"
          placeholder={
            deleteType === "invoice"
              ? "Ej. 001-001-123456789."
              : "Ej. Sólo números."
          }
          required
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="md:col-span-2"
        ></FormField>

        <div className="flex items-center justify-center md:col-span-2 mt-4">
          <FormButton
            icon={<Icon name="icon-delete" className={"w-5 h-5 text-white"} />}
            text="Eliminar"
            color="red"
            type="submit"
            disabled={
              !inputValue.trim() || inputValue.trim() === lastSearchedValue
            }
          />
        </div>
      </FormContainer>
    </Layout>
  );
}

