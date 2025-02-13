// // src/pages/Home/Home.styles.ts
// import styled from "styled-components";

// export const Container = styled.div`
//   max-width: 800px;
//   margin: 0 auto;
// `;

// export const DocumentCard = styled.div`
//   background: white;
//   border-radius: 8px;
//   padding: 20px;
//   margin-bottom: 20px;
//   box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
// `;

// export const DocumentTitle = styled.h2`
//   margin-bottom: 12px;
//   color: var(--text-color);
// `;

// export const DocumentMeta = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 12px;
//   color: #5f6368;
//   font-size: 14px;
// `;

// src/pages/Home/Home.styles.tsx
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

export const DocumentCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const DocumentTitle = styled.h2`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.5rem;
`;

export const DocumentMeta = styled.div`
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9rem;
  margin-bottom: 15px;

  span {
    display: flex;
    align-items: center;
  }
`;

export const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  margin: 100px auto;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const ErrorMessage = styled.div`
  background-color: #fee;
  color: #c00;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  margin: 20px 0;
`;
