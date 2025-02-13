// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #1a73e8;
    --secondary-color: #4285f4;
    --background-color: #f8f9fa;
    --text-color: #202124;
    --border-color: #dadce0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Roboto', sans-serif;
    background-color: var(--background-color);
    color: var(--text-color);
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;
