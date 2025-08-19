// // export default ReusableForm;
// import styled from "styled-components";
// import { themeTypography } from "../utils/themes";

// export const Container = styled.div.attrs(({ $mouseX, $mouseY }) => ({
//   style: {
//     "--mouseX": `${$mouseX}%`,
//     "--mouseY": `${$mouseY}%`,
//   },
// }))`
//   color: ${({ theme }) => theme.text};
//   min-height: 100vh;
//   scrollbar-width: none;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   position: relative;

//   --s: 37px;
//   --c: #0000, ${({ theme }) => theme.bgContainer} 0.5deg 119.5deg, #0000 120deg;
//   --g1: conic-gradient(from 60deg at 56.25% calc(425% / 6), var(--c));
//   --g2: conic-gradient(from 180deg at 43.75% calc(425% / 6), var(--c));
//   --g3: conic-gradient(from -60deg at 50% calc(175% / 12), var(--c));

//   background: var(--g1), var(--g1) var(--s) calc(1.73 * var(--s)), var(--g2),
//     var(--g2) var(--s) calc(1.73 * var(--s)), var(--g3) var(--s) 0,
//     var(--g3) 0 calc(1.73 * var(--s)) ${({ theme }) => theme.bgContainer2};
//   background-size: calc(2 * var(--s)) calc(3.46 * var(--s));

//   &::after {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     pointer-events: none;
//     transition: background 0.2s ease-out;
//     background: radial-gradient(
//       circle at var(--mouseX) var(--mouseY),
//       rgba(255, 255, 255, 0.05) 0%,
//       ${({ theme }) => theme.bgContainerEffect} 15%
//     );
//   }
// `;

// export const ResponsiveContainerCard = styled(Container)`
//   min-width: 100vw;
//   justify-content: space-evenly;
//   flex-direction: row;
//   gap: 2rem;

//   @media (max-width: 920px) {
//     flex-direction: column;
//     margin: 80px auto;
//   }
// `;

// export const FormContainer = styled.div`
//   width: 700px;
//   margin: 1.5rem auto;
//   padding: 2rem;
//   background-color: ${({ theme }) => theme.bgForm};
//   z-index: 4;
//   border-radius: 10px;
//   font-family: ${themeTypography.fontFamily};
//   transition: box-shadow 0.3s ease-in-out;

//   border: 0;
//   box-shadow: 0 2px 6px 0 ${({ theme }) => theme.boxShadow1};

//   &:hover {
//     box-shadow: 0 4px 6px 0 ${({ theme }) => theme.boxShadow2};
//   }

//   @media (max-width: 920px) {
//     margin: 80px auto;
//     width: 500px;
//   }

//   @media (max-width: 768px) {
//     width: 100vw;
//   }
// `;

// export const Title = styled.h1`
//   font-size: 1.8rem;
//   text-align: center;
//   margin-bottom: 1.5rem;
//   font-family: ${themeTypography.fontFamily};
//   color: ${({ theme }) => theme.text};
//   line-height: 1.3em;
//   font-weight: 500;
//   font-size: clamp(1.8rem, 1.2rem, 1rem);
//   z-index: 4;

//   @media (max-width: 768px) {
//     font-size: 1.5rem;
//   }

//   @media (max-width: 480px) {
//     font-size: 1.2rem;
//   }

//   @media (max-width: 320px) {
//     font-size: 1rem;
//   }
// `;

// export const SectionTitle = styled.div`
//   font-size: 1rem;
//   color: ${({ theme }) => theme.text};
//   padding: 0.5rem;
//   border-radius: 5px;
//   margin-bottom: 1rem;
//   font-weight: 500;
//   background-color: ${({ theme }) => theme.bgSubtitle};
//   color: white;
// `;

// export const StyledForm = styled.form`
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   font-family: ${themeTypography.fontFamily};
// `;

// export const FormField = styled.div`
//   padding-top: 6px;
//   padding-bottom: 6px;
//   border-width: 2px;
//   display: flex;
//   flex-direction: column;
//   gap: 0.5rem;
// `;

// export const Label = styled.label`
//   font-size: 1rem;
//   line-height: 1.3em;
//   font-weight: 500;
//   margin-bottom: 0px;
//   color: ${({ theme }) => theme.labelForm};
// `;

// export const Input = styled.input`
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
//   border-radius: 5px;
//   background-color: ${({ theme }) => theme.inputForm};
//   box-shadow: inset 0 2px 4px 0 hsla(0, 0, 0, 0.8);

//   &:focus {
//     border-color: ${({ $hasError }) => ($hasError ? "darkred" : "#007bff")};
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
//   }
// `;

// export const InputFile = styled(Input)`
//   color: #000;
//   box-shadow: inset 0 2px 4px 0 hsla(0, 0, 0, 0.8);
// `;

// export const Select = styled.select`
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
//   border-radius: 5px;
//   background-color: ${({ theme }) => theme.inputForm};
//   box-shadow: inset 0 2px 4px 0 hsla(0, 0, 0, 0.8);

//   &:focus {
//     border-color: #007bff;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
//   }
// `;

// export const TextArea = styled.textarea`
//   padding: 0.5rem;
//   font-size: 1rem;
//   border: 1px solid ${({ $hasError }) => ($hasError ? "red" : "#ccc")};
//   border-radius: 5px;
//   resize: vertical;
//   word-break: break-word;
//   field-sizing: content;
//   padding: 0.5rem;
//   background-color: ${({ theme }) => theme.inputForm};

//   &:focus {
//     border-color: #007bff;
//     outline: none;
//     box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.2);
//   }
// `;

// export const SubmitButton = styled.button`
//   padding: 0.75rem;
//   font-size: 1rem;
//   color: white;
//   background-color: #007bff;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }

//   &:disabled {
//     background-color: #cccccc;
//     cursor: not-allowed;
//   }
// `;

