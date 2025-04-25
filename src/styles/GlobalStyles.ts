// src/styles/GlobalStyles.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #6a3de8;
    --secondary-color: #9c6dff;
    --accent-color: #a78bfa;
    --background-color: #f9f7ff;
    --card-background: rgba(255, 255, 255, 0.8);
    --text-color: #2d2146;
    --border-color: #e0d8ff;
    --glass-effect: rgba(255, 255, 255, 0.25);
    --blur-amount: 15px;
    --shadow-color: rgba(109, 40, 217, 0.1);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', 'Roboto', sans-serif;
    background: linear-gradient(135deg, #f8f7ff 0%, #ede9ff 100%);
    color: var(--text-color);
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: 700;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2.5rem;
    background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  h2 {
    font-size: 1.8rem;
    color: #6a3de8;
  }

  button, .button {
    background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.6em 1.2em;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px var(--shadow-color);
    }
    
    &:active {
      transform: translateY(0);
    }
    
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }

  .card {
    background: var(--card-background);
    backdrop-filter: blur(var(--blur-amount));
    -webkit-backdrop-filter: blur(var(--blur-amount));
    border-radius: 16px;
    padding: 1.5rem;
    box-shadow: 0 8px 30px var(--shadow-color);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px var(--shadow-color);
    }
  }

  /* Purple gradient background with animated subtle movement */
  .gradient-bg {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: -1;
    background: linear-gradient(
      135deg,
      rgba(106, 61, 232, 0.2) 0%,
      rgba(156, 109, 255, 0.1) 25%,
      rgba(235, 225, 255, 0.1) 50%,
      rgba(167, 139, 250, 0.1) 75%,
      rgba(106, 61, 232, 0.2) 100%
    );
    filter: blur(70px);
    animation: gradientBG 15s ease infinite;
    background-size: 400% 400%;
  }

  @keyframes gradientBG {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  /* Glass morphism element styling */
  .glass {
    background: var(--glass-effect);
    backdrop-filter: blur(var(--blur-amount));
    -webkit-backdrop-filter: blur(var(--blur-amount));
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.07);
  }

  /* For form elements */
  input, textarea, select {
    background: rgba(255, 255, 255, 0.5);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: var(--text-color);
    transition: all 0.3s ease;
    width: 100%;
    margin-bottom: 1rem;
    
    &:focus {
      outline: none;
      border-color: var(--primary-color);
      box-shadow: 0 0 0 2px rgba(106, 61, 232, 0.2);
    }
  }

  /* Utility classes */
  .text-gradient {
    background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }
`;
