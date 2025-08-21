// eslint-disable-next-line react/prop-types
const FormSubtitle = ({ children, className }) => {
  return (
    <div className={`md:col-span-2 px-4 py-2 mt-6 mb-2 font-normal text-sm rounded-md font-apple dark:bg-[#6d6d6d] bg-[#ff9494] text-white ${className}`}>
      {children}
    </div>
  );
};

export default FormSubtitle;
