import { useForm } from "../Hooks/useForm";
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormField,
  FormButton,
} from "../components/Form";

import Swal from "sweetalert2";
import { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { validateFields } from "../utils/validateFields.js";
import ImageUploader from "../components/ImageUploader.jsx";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icon.jsx";
import { useNavigate } from "react-router";

export default function RegisterInstallations() {
  const { values, handleChange, resetForm } = useForm({
    plate: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null, // Campo para el archivo
  });
  // Estado para almacenar los errores de validación
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
   const navigate = useNavigate();

  // Función para manejar la imagen subida
  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };

  const resetFormAndFile = () => {
    resetForm();
    setErrors({});
    setImage(null); // Limpia la imagen de la vista previa
    values.photoUrl = null; // Limpia el valor del archivo
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
  };

  // Función para validar el formulario
  const validateForm = () => {
    const newErrors = {};
    // Validar cada campo usando las funciones de validación
    Object.keys(values).forEach((field) => {
      const error = validateFields[field](values[field]);
      if (error) {
        newErrors[field] = error; // Si hay error, lo agregamos al objeto newErrors
      }
    });

    return newErrors;
  };

  // Lógica de envío del formulario con Axios
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(); // Validar el formulario

    if (Object.keys(validationErrors).length > 0) {
      // Si hay errores, no enviar el formulario y mostrar los errores
      setErrors(validationErrors);

      // Enfocar el primer campo con error
      const firstErrorField = Object.keys(validationErrors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      
      return;
    }

    const formData = new FormData();
    // Agregar los valores al FormData
    formData.append("photoUrl", values.photoUrl); // Archivo
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photoUrl") formData.append(key, value);
    });

    Swal.fire({
      title: "¿Deseas Guardar esta Instalación?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await HandleFetch(formData);

        if (response.isSuccess === true) {
          Swal.fire({
            title: "¡Guardado!",
            text: `Instalación con placa ${values.plate} ha sido guardada.`,
            icon: "success",
            focusConfirm: false, // Evita que el botón de "Aceptar" enfoque automáticamente y haga scroll
            didOpen: () => {
              document.activeElement.blur(); // Quita el foco de cualquier elemento activo al abrir la alerta
            },
            willClose: () => {
              document.body.style.overflow = "auto"; // Por si SweetAlert bloqueó el scroll, lo desbloqueamos antes de cerrar
            },
            didClose: () => {
              // Forzarmos el scroll al top una vez que la alerta ya se cerró
              window.scrollTo({ top: 0, behavior: "smooth" });
            },
          });
          resetFormAndFile();
        }
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  };

  const HandleFetch = async (formData) => {
    const url = `/installation/register?plate=${values.plate}`;

    try {
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      console.log( error );
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: `Error al guardar la instalación: ${
            error.response.data?.message || error.message
          }`,
        });
      }

      return error.response?.data; // Retornar el error desde el servidor si existe
    }
  };

  return (
    <Layout>
      <FormContainer id="register" onSubmit={handleFormSubmit}>
        <FormTitle>Instalaciones de Vehículo</FormTitle>
        <FormSubtitle>Detalles de la Instalación</FormSubtitle>

        <FormField
          id="plate"
          label="Placa"
          type="text"
          placeholder="Ej. AAA-1234 o AA-123A."
          value={values.plate}
          onChange={handleChange}
          error={errors.plate}
          required
        ></FormField>

        <div
          style={{
            borderTop: "1px solid #ccc",
          }}
          className="md:col-span-2"
        />

        <FormField
          id="technicalFileNumber"
          label="Nº de Ficha Técnica"
          value={values.technicalFileNumber}
          onChange={handleChange}
          placeholder="Solo números"
          required
          error={errors.technicalFileNumber}
          className="md:col-span-2"
        />

        <FormField
          id="invoiceNumber"
          label="Nº de Factura"
          value={values.invoiceNumber}
          onChange={handleChange}
          placeholder="Ej. 001-001-123456789"
          error={errors.invoiceNumber}
          className="md:col-span-2"
        />

        <FormField
          id="technicianName"
          label="Técnico"
          value={values.technicianName}
          onChange={handleChange}
          error={errors.technicianName}
        />

        <FormField
          id="date"
          label="Fecha"
          type="date"
          required
          value={values.date ? values.date.split("T")[0] : ""}
          onChange={handleChange}
          error={errors.date}
        />

        <FormField
          id="installationCompleted"
          label="Instalación Completada"
          error={errors.installationCompleted}
          className="md:col-span-2"
        >
          <textarea
            id="installationCompleted"
            name="installationCompleted"
            autoComplete="off"
            placeholder="Escribe una descripción"
            value={values.installationCompleted}
            onChange={handleChange}
            className="px-4 py-2 text-base border border-gray-300 rounded-lg bg-[rgb(248,249,252)] dark:bg-[rgb(176,176,176)] dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-gray-600 dark:focus:border-gray-500 outline-none"
          />
        </FormField>

        <FormField className="md:col-span-2">
          <label
            htmlFor="installationPhoto"
            className="text-sm font-medium text-gray-700 dark:text-gray-200"
          >
            Foto de Instalación
          </label>

          <ImageUploader
            id="installationPhoto"
            title="Cargar Foto"
            image={image} // aquí pasas tu estado con la foto
            onFileChange={handleFileChange} // aquí manejas el cambio en tu form
          />

          {errors.photoUrl && (
            <span className="text-red-500 text-xs">{errors.photoUrl}</span>
          )}
        </FormField>

        <div className="hidden md:flex justify-start  items-center mt-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="hidden gap-2 items-center md:flex relative cursor-pointer px-6 py-2 h-[42px] text-center font-barlow justify-center text-base text-white rounded-lg border-solid transition-transform duration-300 ease-in-out group outline-offset-4 focus:outline focus:outline-white focus:outline-offset-4 overflow-hidden"
          >
            <Icon name="icon-home" className={"mr-2"} />

            <span className="relative z-20">Ir al Inicio</span>

            {/* Brillo */}
            <span className="absolute left-[-75%] top-0 h-full w-[50%] bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out"></span>

            {/* Bordes */}
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0"></span>
            <span className="w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0"></span>
          </button>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-6 mt-4">
          <FormButton
            icon={<Icon name="icon-reset" className={"w-5 h-5 text-white"} />}
            text="Limpiar"
            color={"blue"}
            type={"reset"}
            onClick={resetFormAndFile}
          />

          <FormButton
            icon={<Icon name="icon-save" className={"w-5 h-5 text-white"} />}
            text="Guardar"
            type={"submit"}
            color={"teal"}
          />
        </div>
      </FormContainer>
    </Layout>
  );
}
