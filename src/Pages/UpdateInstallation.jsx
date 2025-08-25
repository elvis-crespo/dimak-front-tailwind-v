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
  const { values, handleChange, resetForm, setValues } = useForm({
    plate: "",
    technicalFileNumber: "",
    invoiceNumber: "",
    technicianName: "",
    date: "",
    installationCompleted: "",
    photoUrl: null,
  });

  const [lastSearchedValue, setLastSearchedValue] = useState("");
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [image, setImage] = useState(null);
  const [initialValues, setInitialValues] = useState(null);

  const handleSearch = async () => {
    const validationError = validateFields.technicalFileNumber(
      values.technicalFileNumber.trim()
    );
    if (validationError) {
      customSwal.fire({
        icon: "error",
        title: "Error de Validación",
        text: validationError,
      });
      return;
    }

    if (values.technicalFileNumber.trim() === lastSearchedValue.trim()) {
      return;
    }
    setLastSearchedValue(values.technicalFileNumber.trim());

    try {
      const response = await axiosInstance.get(
        `/installation/technical?technicalFileNumber=${values.technicalFileNumber}`
      );

      if (response.data.isSuccess) {
        const installationData = response.data.data;

        // Actualizamos los valores correctamente
        setValues({
          ...values,
          plate: installationData.plateId || "",
          technicalFileNumber: installationData.technicalFileNumber || "",
          invoiceNumber: installationData.invoiceNumber || "",
          technicianName: installationData.technicianName || "",
          date: installationData.date
            ? installationData.date.split("T")[0]
            : "",
          installationCompleted: installationData.installationCompleted || "",
          photoUrl: installationData.photoUrl || null,
        });

        setInitialValues(installationData); // Guardamos los valores iniciales
        setImage(installationData.photoUrl);
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
          error.response.data.message ||
          "Hubo un problema al obtener los datos de la instalación."
        }`,
        icon: "error",
      });
    }
  };

  const hasChanges = () => {
    if (!initialValues) return false; // Si no hay valores iniciales, no hay cambios
    return (
      values.plate !== initialValues.plateId ||
      values.technicalFileNumber !== initialValues.technicalFileNumber ||
      values.invoiceNumber !== initialValues.invoiceNumber ||
      values.technicianName !== initialValues.technicianName ||
      values.date !== initialValues.date ||
      values.installationCompleted !== initialValues.installationCompleted ||
      (values.photoUrl && values.photoUrl !== initialValues.photoUrl)
    );
  };

  // Manejo del cambio del archivo
  const handleFileChange = (file) => {
    setImage(file);
    handleChange({ target: { name: "photoUrl", value: file } });
  };

  // Lógica de envío del formulario con Axios
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(); // Validar el formulario
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!hasChanges()) {
      customSwal.fire({
        title: "No hay cambios",
        text: "No se han realizado cambios en los datos de la instalación.",
        icon: "info",
      });
      return; // Si no hay cambios, no hacer nada
    }

    const formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      if (key !== "photoUrl") formData.append(key, value);
    });

    if (values.photoUrl instanceof File) {
      formData.append("photoUrl", values.photoUrl);
    }

    customSwal.fire({
      title: "¿Deseas modificar esta Instalación?",
      icon: "question",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const response = await HandleFetch(formData);

        if (response.isSuccess === true) {
          customSwal.fire({
            title: "¡Guardado!",
            text: `${response.message}`, // Mensaje de éxito
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
    const url = `/installation/update`;

    try {
      const response = await axiosInstance.put(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data;
    } catch (error) {
      if (error.message === "Network Error" || error.code === "ECONNREFUSED") {
        customSwal.fire({
          icon: "error",
          title: "Oops...",
          text: "¡Hubo un problema al conectar con el servidor! Verifica si el servidor está en ejecución.",
        });
      } else if (!error.response) {
        customSwal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema desconocido con el servidor.",
        });
      } else {
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

  // Función para limpiar el formulario
  const HandleReset = () => {
    resetForm();
    setImage(null); // Limpia la imagen de la vista previa
    values.photoUrl = null; // Limpia el valor del archivo
    const fileInput = document.querySelector('input[type="file"]'); // Selecciona el campo de archivo
    if (fileInput) fileInput.value = ""; // Limpia el valor del campo de archivo en el DOM
    setInitialValues(null); // Limpia los valores iniciales
    setLastSearchedValue(""); // Limpia el último valor buscado
    setErrors({});
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

  return (
    <Layout>
      <FormContainer onSubmit={handleFormSubmit}>
        <FormTitle>Actualizar Información de Instalación</FormTitle>
        <FormSubtitle>Detalles de la Instalación</FormSubtitle>

        <div className="md:col-span-2 flex items-center md:items-end justify-between flex-col md:flex-row gap-4">
          <FormField
            label=" Nº de Ficha Técnica"
            id="technicalFileNumber"
            required
            placeholder="Solo números"
            value={values.technicalFileNumber}
            onChange={handleChange}
            className="w-full md:w-[75%]"
          />

          <FormButton
            icon={
              <Icon name="icon-search-form" className={"w-6 h-6 text-white"} />
            }
            text="Buscar"
            type="submit"
            color="blue"
            onClick={handleSearch}
            disabled={
              !values.technicalFileNumber.trim() ||
              values.technicalFileNumber === lastSearchedValue
            }
          />
        </div>

        {isEditing && (
          <>
            <div
              style={{
                borderTop: "1px solid #ccc",
                width: "100%",
                margin: "1rem 0",
              }}
              className="md:col-span-2"
            />

            <FormField
              label="Placa"
              id="plateId"
              value={initialValues?.plateId || ""}
              required
              disabled={true}
              onCopy={(e) => e.preventDefault()}
              onCut={(e) => e.preventDefault()}
              onPaste={(e) => e.preventDefault()}
              onSelect={(e) => e.preventDefault()}
            />

            <FormField
              label=" Nº de Ficha Técnica"
              id="technicalFileNumber"
              value={initialValues?.technicalFileNumber || ""}
              required
              disabled
              className="select-none pointer-events-none"
            />

            <FormField
              label=" Nº de Factura"
              id="invoiceNumber"
              placeholder="Ej. 001-001-123456789"
              value={initialValues?.invoiceNumber || ""}
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
              value={values.date ? values.date.split("T")[0] : ""}
              error={errors.date}
              onChange={handleChange}
              required
            />

            <FormField
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
              label="Foto de Instalación"
              error={errors.photoUrl}
              className="md:col-span-2"
            >
              <ImageUploader
                id="installationPhoto"
                title="Actualizar Foto"
                image={image} // aquí pasas tu estado con la foto
                onFileChange={handleFileChange} // aquí manejas el cambio en tu form
              />
            </FormField>

            <FormSubtitle className="text-sm font-normal md:col-span-2">
              Asegúrate de que todos los campos estén correctos antes de
              actualizar.
            </FormSubtitle>

            <div className="flex items-center justify-center md:justify-end md:col-span-2 mt-4">
              <FormButton
                icon={
                  <Icon
                    name="icon-update-form"
                    className={"w-6 h-6 text-white"}
                  />
                }
                text="Actualizar"
                type="submit"
                color="blue"
                loadingText="Actualizando..."
                // disabled={!hasChanges()}
              />
            </div>
          </>
        )}
      </FormContainer>
    </Layout>
  );
}
