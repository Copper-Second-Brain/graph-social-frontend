// LoginPage.js
import {
    Container,
    FormContainer,
    Title,
    Input,
    Button,
    ErrorMessage
} from "../../components/login/login.styles"
import { useState } from "react";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const default_id = "om"
    const default_pass = "1234"

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Simple validation
        if (!username || !password || username !== default_id || password !== default_pass) {
            setError('Please fill in all fields');
            return;
        }
        setError('');
        // Handle login logic here
        console.log('Logging in with:', { username, password });
        window.location.pathname = "/"
    };

    return (
        <Container>
            <FormContainer>
                <Title>Login</Title>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        onChange={(e: any) => setPassword(e.target.value)}
                    />
                    <Button type="submit">Login</Button>
                </form>
            </FormContainer>
        </Container>
    );
};

export default LoginPage;