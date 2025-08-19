// eslint-disable-next-line react/prop-types
const FormSubtitle = ({ children }) => {
  return (
    <div className="md:col-span-2 px-4 py-2 mt-6 mb-2 rounded-md font-apple dark:bg-[#6d6d6d] bg-[#ff9494] text-white font-medium">
      {children}
    </div>
  );
};

export default FormSubtitle;
