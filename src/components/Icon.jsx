/* eslint-disable react/prop-types */
const Icon = ({ name, className, onClick }) => {
  return (
    <svg
      onClick={onClick}
      className={`fill-current text-black dark:text-white ${className}`}
      width="24"
      height="24"
    >
      <use xlinkHref={`/assets/images/sprite.svg#${name}`} />
    </svg>
  );
};

export default Icon;