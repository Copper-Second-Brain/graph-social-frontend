// src/pages/Create/Create.styles.ts
import styled from "styled-components";

export const Form = styled.form`
  max-width: 800px;
  margin: 0 auto;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  min-height: 200px;
`;

export const Button = styled.button`
  background-color: var(--primary-color);
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: var(--secondary-color);
  }
`;
