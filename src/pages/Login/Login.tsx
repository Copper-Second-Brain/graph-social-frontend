// src/pages/Login/Login.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// Auth Context
import { useAuth } from "../../contexts/AuthContext";

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: stretch;
`;

const FormSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 400px;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(106, 61, 232, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: #4a2b9e;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid #e0d8ff;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #6a3de8;
    box-shadow: 0 0 0 2px rgba(106, 61, 232, 0.2);
  }
`;

const Button = styled.button`
  background: linear-gradient(90deg, #6a3de8 0%, #9c6dff 100%);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(106, 61, 232, 0.2);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const ErrorMessage = styled.div`
  background-color: rgba(255, 0, 0, 0.1);
  color: #d00;
  padding: 0.75rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  font-size: 0.875rem;
  border: 1px solid rgba(255, 0, 0, 0.2);
`;

const ToggleFormText = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #6d6a7c;

  a {
    color: #6a3de8;
    font-weight: 500;
    margin-left: 0.25rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const BrandSide = styled.div`
  flex: 1;
  display: none;
  background: linear-gradient(135deg, #6a3de8 0%, #9c6dff 100%);
  position: relative;
  overflow: hidden;

  @media (min-width: 1024px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: white;
    padding: 2rem;
  }
`;

const BrandContent = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 500px;
`;

const BrandTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const BrandDescription = styled.p`
  font-size: 1.125rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const BackgroundPattern = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Use the auth context
  const { login, signup } = useAuth();

  const validateForm = () => {
    if (!username || !password) {
      setError("Please fill in all required fields");
      return false;
    }

    if (!isLogin) {
      if (!email) {
        setError("Email is required");
        return false;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return false;
      }

      if (password.length < 8) {
        setError("Password must be at least 8 characters long");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;

    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
        navigate("/");
      } else {
        await signup(username, email, password);
        navigate("/");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginContainer>
      <div className="gradient-bg"></div>

      <FormSide>
        <FormCard>
          <Title>{isLogin ? "Welcome Back" : "Create Account"}</Title>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </FormGroup>
            )}

            <FormGroup>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </FormGroup>

            {!isLogin && (
              <FormGroup>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </FormGroup>
            )}

            <Button type="submit" disabled={loading}>
              {loading
                ? "Processing..."
                : isLogin
                ? "Sign In"
                : "Create Account"}
            </Button>
          </Form>

          <ToggleFormText>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </a>
          </ToggleFormText>
        </FormCard>
      </FormSide>

      <BrandSide>
        <BackgroundPattern />
        <BrandContent>
          <BrandTitle>Knowledge Graph Social</BrandTitle>
          <BrandDescription>
            Connect with others through a network of shared knowledge and
            discover insights you never knew existed.
          </BrandDescription>
        </BrandContent>
      </BrandSide>
    </LoginContainer>
  );
};

export default LoginPage;
