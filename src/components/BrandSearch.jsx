/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { FormField } from "./Form";

export const BrandSearch = ({
  id = "brand",
  label = "Marca",
  name,
  value,
  onChange,
  brands,
  iconName,
  placeholder,
  error,
  required = false,
}) => {
  const [filtered, setFiltered] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef(null);
  const listItemRefs = useRef([]);

  const handleChange = (e) => {
    const inputValue = e.target.value;
    onChange({ target: { name, value: inputValue } });

    if (inputValue.trim() === "") {
      setFiltered([]);
      setActiveIndex(-1);
      return;
    }

    const results = brands.filter((b) =>
      b.label.toLowerCase().includes(inputValue.toLowerCase())
    );
    setFiltered(results);
    setActiveIndex(-1);
  };

  const handleSelect = (brand) => {
    onChange({ target: { name, value: brand.label } });
    setFiltered([]);
    setActiveIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (filtered.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : prev));
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }
    if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      handleSelect(filtered[activeIndex]);
    }
    if (e.key === "Escape") {
      setFiltered([]);
      setActiveIndex(-1);
    }
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text
      .split(regex)
      .map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <strong key={i}>{part}</strong>
        ) : (
          part
        )
      );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setFiltered([]);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeIndex >= 0 && listItemRefs.current[activeIndex]) {
      listItemRefs.current[activeIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [activeIndex]);

  return (
    <div ref={containerRef} className="relative">
      <FormField
        id={id}
        label={label}
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        error={error}
        required={required}
        autoComplete="off"
      />

      {filtered.length > 0 && (
        <ul className="absolute top-full left-0 w-full mt-1 max-h-40 overflow-auto border rounded-md bg-white dark:bg-black dark:text-white border-gray-300 dark:border-gray-700 shadow z-10">
          {filtered.map((brand, idx) => (
            <li
              key={brand.value}
              ref={(el) => (listItemRefs.current[idx] = el)}
              className={`px-4 py-2 cursor-pointer flex items-center 
                ${
                  idx === activeIndex
                    ? "bg-blue-100 dark:bg-blue-600"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              onClick={() => handleSelect(brand)}
            >
              {iconName === "car" ? (
                <span className="mr-2">🚗</span>
              ) : (
                <span className="mr-2">🏍️</span>
              )}
              <span>{highlightText(brand.label, value)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};