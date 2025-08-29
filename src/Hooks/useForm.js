import { useState } from "react";

export const useForm = (initialValues) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;
    if (type === "file") {
      setValues({
        ...values,
        [name]: files[0],
      });
    } else {
      const upperCaseFields = ["plate", "technicalFileNumber", "invoiceNumber"];

      // Normalización general
      let cleanedValue = value;
      if (typeof cleanedValue === "string") {
        cleanedValue = upperCaseFields.includes(name)
          ? cleanedValue.toUpperCase().trim()
          : cleanedValue.trimStart();
      }
      setValues({
        ...values,
        [name]: cleanedValue,
      });
    }
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    initialValues,
    setValues,
    handleChange,
    resetForm,
  };
};
