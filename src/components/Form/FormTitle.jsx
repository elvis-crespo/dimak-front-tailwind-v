// eslint-disable-next-line react/prop-types
const FormTitle = ({ children }) => {
  return (
    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 md:col-span-2">
      {children}
    </h2>
  );
}

export default FormTitle