/* eslint-disable react/prop-types */
export const NavigationIcon = ({text, type, icon, onClick, className}) => {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`flex items-center relative cursor-pointer px-6 py-2 h-[42px] gap-2 text-center font-barlow justify-center text-base text-black dark:text-white rounded-lg border-solid animate-fadeInScale transition-colors duration-300 ease-in-out 
                group outline-offset-4 focus:outline dark:focus:outline-white focus:outline-black focus:outline-offset-4 overflow-hidden hover:scale-105 ${className}`}
      >
        {icon}

        <span className="relative z-20">{text}</span>

        {/* Brillo */}
        <span className={`absolute left-[-75%] top-0 h-full w-[50%] bg-black/10 dark:bg-white/20 rotate-12 z-10 blur-lg group-hover:left-[125%] transition-all duration-1000 ease-in-out ${className}`}></span>

        {/* Bordes */}
        <span className={`w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#000000] dark:border-[#D4EDF9] absolute h-[20%] rounded-tl-lg border-l-2 border-t-2 top-0 left-0 ${className}`}></span>
        <span className={`w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#000000] dark:border-[#D4EDF9] absolute group-hover:h-[90%] h-[60%] rounded-tr-lg border-r-2 border-t-2 top-0 right-0 ${className}`}></span>
        <span className={`w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#000000] dark:border-[#D4EDF9] absolute h-[60%] group-hover:h-[90%] rounded-bl-lg border-l-2 border-b-2 left-0 bottom-0 ${className}`}></span>
        <span className={`w-1/2 drop-shadow-3xl transition-all duration-300 block border-[#000000] dark:border-[#D4EDF9] absolute h-[20%] rounded-br-lg border-r-2 border-b-2 right-0 bottom-0 ${className}`}></span>
      </button>
    </>
  );
};
