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
      setValues({
        ...values,
        [name]: value || "",
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
