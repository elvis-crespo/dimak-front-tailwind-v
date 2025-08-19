/* eslint-disable react/prop-types */
import { Container } from "./CustomFormStyled";
import { useState } from "react";

export const BackgroundEffect = ({ children }) => {
  const [coords, setCoords] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e) => {
    // const x = (e.clientX / window.innerWidth) * 100;
    // const y = (e.clientY / window.innerHeight) * 100;
    // setCoords({ x, y });
    const rect = e.currentTarget.getBoundingClientRect(); // Obtener tamaño y posición del contenedor
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setCoords({ x, y });
  };

  return (
    <Container
      onMouseMove={handleMouseMove}
      $mouseX={coords.x} // Ahora usa `$mouseX`
      $mouseY={coords.y}
    >
      {children}
    </Container>
  );
};


// export const BackgroundEffect = ({ children }) => {
//   const [coords, setCoords] = useState({ x: 50, y: 50 });

//   const handleMouseMove = (e) => {
//     const x = (e.clientX / window.innerWidth) * 100;
//     const y = (e.clientY / window.innerHeight) * 100;
//     setCoords({ x, y });
//   };

//   return (
//     <Container
//       onMouseMove={handleMouseMove}
//       $mouseX={coords.x}
//       $mouseY={coords.y}
//     >
//       {children}
//     </Container>
//   );
// };