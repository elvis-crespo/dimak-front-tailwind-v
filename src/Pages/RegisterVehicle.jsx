import { useEffect, useState } from "react";
import { useForm } from "../Hooks/useForm";
import axiosInstance from "../utils/axiosInstance";
import { carBrands, motorcycleBrands } from "../utils/brands";
import { validateFields } from "../utils/validateFields.js";
import {
  FormContainer,
  FormTitle,
  FormSubtitle,
  FormField,
  FormButton,
} from "../components/Form";
import Layout from "../components/Layout";
import { useNavigate } from "react-router";
import ImageUploader from "../components/ImageUploader.jsx";
import { customSwal } from "../utils/swalConfig.js";
import Icon from "../components/Icons/Icon.jsx";
import { NavigationIcon } from "../components/Icons/NavigationIcon.jsx";
import { BrandSearch } from "../components/BrandSearch.jsx";

export default function RegisterVehicle() {
  const [errors, setErrors] = useState({});
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [brandType, setBrandType] = useState(null);

  const navigate = useNavigate();

  const { values, handleChange, resetForm } = useForm({
    ownerName: "",
    plate: "",
    brand: "",
    model: "",
    year: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null, // Campo para el archivo
  });

  useEffect(() => {
    if (/^[A-Z]{3}-\d{4}$/.test(values.plate)) {
      setFilteredBrands(carBrands);
      setBrandType("car");
    } else if (/^[A-Z]{2}-\d{3}[A-Z]$/.test(values.plate)) {
      setFilteredBrands(motorcycleBrands);
       setBrandType("motorcycle");
    } else {
      setFilteredBrands([]);
    }
  }, [values.plate]);

  // Función para manejar la imagen subida
  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };

  //  Validaciones para el formulario
  const validateForm = () => {
    const newErrors = {};

    Object.keys(values).forEach((field) => {
      const error = validateFields[field](values[field]);

      if (error) {
        newErrors[field] = error;
      }
    });

    return newErrors;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
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

    customSwal
      .fire({
        title: "¿Deseas Guardar esta Instalación?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
        cancelButtonText: "Cancelar",
        icon: "question",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          setIsLoading(true); // Inicia el estado de carga
          const response = await HandleFetch(formData);
          setIsLoading(false); // Finaliza el estado de carga

          if (response.isSuccess === true) {
            customSwal.fire({
              title: "¡Guardado!",
              text: `Vehículo con placa ${values.plate} ha sido guardado.`,
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
          customSwal.fire("Cambios no guardados", "", "info");
        }
      });
  };

  // Función para limpiar el formulario
  const resetFormAndFile = () => {
    resetForm(); // Resetea los valores controlados por el hook
    setErrors({});
    setImage(null); // Limpia la imagen de la vista previa
    values.photoUrl = null; // Limpia el valor del archivo
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
  };

  // Función para enviar el formulario
  const HandleFetch = async (formData) => {
    const url = `/vehicle/register`;

    try {
      // Enviar solicitud con Axios.
      const response = await axiosInstance.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Indicar que es un envío con archivos
        },
      });

      return response.data; // Retornar datos del servidor
    } catch (error) {
      // Verificar si el error es de red o de conexión
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        customSwal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        // Otro error sin respuesta del servidor
        customSwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
        // Error con respuesta del servidor (404, 500, etc.)
        customSwal.fire({
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
    <>
      <Layout>
        <FormContainer onSubmit={handleFormSubmit}>
          <FormTitle>Datos del Empleado</FormTitle>

          <FormSubtitle>Detalles del Vehículo</FormSubtitle>

          <FormField
            id="ownerName"
            label="Nombre del Cliente"
            value={values.ownerName}
            error={errors.ownerName}
            onChange={handleChange}
            required
            className="md:col-span-2"
          />

          <FormField
            id="plate"
            label="Placa"
            type="text"
            placeholder="Ej. AAA-1234 o AA-123A."
            value={values.plate}
            error={errors.plate}
            onChange={handleChange}
            required
          />

          <BrandSearch
            id="brand"
            name="brand"
            label="Marca"
            brands={filteredBrands} // lista de marcas (carBrands o motorcycleBrands)
            value={values.brand}
            error={errors.brand}
            onChange={handleChange} // conecta con useForm
            iconName={brandType === "car" ? "car" : "motorcycle"}
            placeholder="Por favor, indique la marca"
          />

          <FormField
            id="model"
            label="Modelo"
            value={values.model}
            onChange={handleChange}
            error={errors.model}
          />

          <FormField
            id="year"
            label="Año"
            type="number"
            placeholder="2025"
            value={values.year}
            onChange={handleChange}
            min={1900}
            max={2100}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "e") e.preventDefault();
            }}
            onWheel={(e) => e.target.blur()}
            error={errors.year}
          />

          <FormSubtitle style={{ marginTop: "30px" }}>
            Detalles de la Instalación
          </FormSubtitle>

          <FormField
            id="technicalFileNumber"
            label="Nº de Ficha Técnica"
            placeholder="Solo números"
            value={values.technicalFileNumber}
            error={errors.technicalFileNumber}
            onChange={handleChange}
            className="md:col-span-2"
            required
          />

          <FormField
            id="invoiceNumber"
            label="Nº de Factura"
            placeholder="Ej. 001-001-123456789 o 001-001-OP1234567."
            value={values.invoiceNumber}
            error={errors.invoiceNumber}
            onChange={handleChange}
            className="md:col-span-2"
          />

          <FormField
            id="technicianName"
            label="Técnico"
            value={values.technicianName}
            error={errors.technicianName}
            onChange={handleChange}
          />

          <FormField
            id="date"
            label="Fecha"
            type="date"
            value={values.date ? values.date.split("T")[0] : ""}
            error={errors.date}
            onChange={handleChange}
            required
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

          <FormField
            id="photoUrl"
            label="Foto de Instalación"
            error={errors.photoUrl}
            className="md:col-span-2"
          >
            <ImageUploader
              id="photoUrl"
              title="Cargar Foto"
              image={image} // aquí pasas tu estado con la foto
              onFileChange={handleFileChange} // aquí manejas el cambio en tu form
            />
          </FormField>

          <div className="hidden md:flex justify-start  items-center mt-4 text-white dark:text-black">
            <NavigationIcon
              icon={<Icon name="icon-back" className={"w-6 h-6"} />}
              text="Volver"
              type="button"
              title="Volver"
              color="blue"
              onClick={() => navigate(-1)}
            />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-6 mt-4">
            <FormButton
              icon={
                <Icon name="icon-reset-form" className={"w-5 h-5 text-white"} />
              }
              text="Limpiar"
              title="Limpiar Formulario"
              loadingText="Limpiando..."
              color="blue"
              type="reset"
              onClick={resetFormAndFile}
              isLoading={isLoading}
            />

            <FormButton
              icon={
                <Icon name="icon-save-form" className={"w-5 h-5 text-white"} />
              }
              text="Guardar"
              title="Guardar Formulario"
              loadingText="Guardando..."
              type="submit"
              color="teal"
              isLoading={isLoading}
            />
          </div>
        </FormContainer>
      </Layout>
    </>
  );
}
