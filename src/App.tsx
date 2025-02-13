// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout/Layout";
import { Home } from "./pages/Home/Home";
import { Profile } from "./pages/Profile/Profile";
import { Create } from "./pages/Create/Create";
import { GlobalStyles } from "./styles/GlobalStyles";

function App() {
  return (
    <Router>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="create" element={<Create />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
