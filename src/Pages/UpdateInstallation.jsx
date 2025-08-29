import { useForm } from "../Hooks/useForm";
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
import ImageUploader from "../components/ImageUploader.jsx";
import Layout from "../components/Layout.jsx";
import Icon from "../components/Icons/Icon.jsx";
import { customSwal } from "../utils/swalConfig.js";

export default function UpdateInstallations() {

  const [inputSearch, setInputSearch] = useState("");
  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [initialValues, setInitialValues] = useState(null);


  const { values, handleChange, resetForm, setValues } = useForm({
    plate: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null,
  });

  const mapInstallationData = (data) => ({
    plate: data.plateId || "",
    technicalFileNumber: data.technicalFileNumber || "",
    invoiceNumber: data.invoiceNumber || "",
    technicianName: data.technicianName || "",
    date: data.date ? data.date.split("T")[0] : "",
    installationCompleted: data.installationCompleted || "",
    photoUrl: data.photoUrl || null,
  });

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!inputSearch.trim()) {
      return customSwal.fire({
        icon: "warning",
        title: "Campo vacío",
        text: "Por favor, ingrese un valor en el campo de búsqueda.",
      });
    }

    if (inputSearch.trim() === lastSearchedValue.trim()) {
      return customSwal.fire({
        icon: "info",
        title: "Sin cambios",
        text: "Ya has buscado esta instalación.",
      });
    }

    const validationError = validateFields.technicalFileNumber(
      inputSearch.trim()
    );
    if (validationError) {
      return customSwal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
    }

    setLastSearchedValue(inputSearch.trim());

    try {
      const response = await axiosInstance.get(
        `/installation/technical?technicalFileNumber=${inputSearch}`
      );

      if (response.data.isSuccess) {
        const mappedData = mapInstallationData(response.data.data);

        setValues(mappedData); //update form values with fetched data
        setInitialValues(mappedData); //save changes for comparison
        setImage(mappedData.photoUrl);
        setIsEditing(true);
      } else {
        customSwal.fire({
          title: "Error",
          text:
            response.data.message ||
            "No se encontraron datos para esta instalación.",
          icon: "error",
        });
      }
    } catch (error) {
      customSwal.fire({
        title: "Error",
        text: `${
          error.response?.data?.message ||
          "Hubo un problema al obtener los datos de la instalación."
        }`,
        icon: "error",
      });
    }
  };

 const hasChanges = () => {
   if (!initialValues) return false;
   return Object.keys(values).some((key) => {
     if (key === "photoUrl") {
       // Si es archivo nuevo, siempre hay cambio
       if (values.photoUrl instanceof File) return true;
       // Si antes había URL y cambió o se borró
       return values.photoUrl !== initialValues.photoUrl;
     }
     return values[key] !== initialValues[key];
   });
 };


  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!hasChanges()) {
      return customSwal.fire({
        title: "No hay cambios",
        text: "No se han realizado cambios en los datos de la instalación.",
        icon: "info",
      });
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photoUrl") formData.append(key, value);
    });

    if (values.photoUrl instanceof File) {
      formData.append("photoUrl", values.photoUrl);
    }

    customSwal
      .fire({
        title: "¿Deseas modificar esta Instalación?",
        icon: "question",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Guardar",
        denyButtonText: `No guardar`,
        cancelButtonText: "Cancelar",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          const response = await HandleFetch(formData);

          if (response.isSuccess) {
            customSwal.fire({
              title: "¡Guardado!",
              text: `${response.message}`,
              icon: "success",
            });
            HandleReset();
            setIsEditing(false);
          }
        } else if (result.isDenied) {
          customSwal.fire("Cambios no guardados", "", "info");
        }
      });
  };

  const HandleFetch = async (formData) => {
    try {
      const response = await axiosInstance.put(
        `/installation/update`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      return response.data;
    } catch (error) {
      customSwal.fire({
        icon: "error",
        title: "Error",
        text: `Error al guardar la instalación: ${
          error.response?.data?.message || error.message
        }`,
      });
      return error.response?.data;
    }
  };

  const HandleReset = () => {
    resetForm();
    setInitialValues(null);
    setInputSearch("");
    setLastSearchedValue("");
    setImage(null);
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) fileInput.value = "";
    setErrors({});
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(values).forEach((field) => {
      if (validateFields[field]) {
        const error = validateFields[field](values[field]);
        if (error) newErrors[field] = error;
      }
    });
    return newErrors;
  };

  return (
    <Layout>
      <FormContainer onSubmit={handleSearch}>
        <FormTitle>Actualizar Información de Instalación</FormTitle>
        <FormSubtitle>Detalles de la Instalación</FormSubtitle>
        <div className="md:col-span-2 flex items-center md:items-end justify-between flex-col md:flex-row gap-4">
          <FormField
            id="fileNumber"
            label="Nº de Ficha Técnica"
            required
            placeholder="Solo números"
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value.trim())}
            className="w-full md:w-[75%]"
          />
          <FormButton
            icon={
              <Icon name="icon-search-form" className="w-6 h-6 text-white" />
            }
            text="Buscar"
            title="Buscar Instalación"
            type="submit"
            color="blue"
            disabled={
              !!inputSearch.trim() && inputSearch.trim() === lastSearchedValue
            }
          />
        </div>
      </FormContainer>

      {isEditing && (
        <FormContainer onSubmit={handleFormSubmit}>
          <div className="border-t border-gray-300 w-full my-4 md:col-span-2" />

          <FormField
            label="Placa"
            id="plate"
            value={values.plate}
            required
            disabled
          />

          <FormField
            label=" Nº de Ficha Técnica"
            id="technicalFileNumber"
            value={values.technicalFileNumber}
            required
            disabled
            className="select-none pointer-events-none"
          />

          <FormField
            label=" Nº de Factura"
            id="invoiceNumber"
            placeholder="Ej. 001-001-123456789"
            value={values.invoiceNumber}
            required
            disabled
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
            value={values.date}
            onChange={handleChange}
            error={errors.date}
            required
          />

          <FormField
            label="Instalación Completada"
            id="installationCompleted"
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
              title="Actualizar Foto"
              image={image}
              onFileChange={handleFileChange}
            />
          </FormField>

          <FormSubtitle className="text-sm font-normal md:col-span-2">
            Asegúrate de que todos los campos estén correctos antes de
            actualizar.
          </FormSubtitle>

          <div className="flex items-center justify-center md:justify-end md:col-span-2 mt-4">
            <FormButton
              icon={
                <Icon name="icon-update-form" className="w-6 h-6 text-white" />
              }
              text="Actualizar"
              title="Actualizar Instalación"
              type="submit"
              color="blue"
              loadingText="Actualizando..."
              disabled={!hasChanges()}
            />
          </div>
        </FormContainer>
      )}
    </Layout>
  );
}
