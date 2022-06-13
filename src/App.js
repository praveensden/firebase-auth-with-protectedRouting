import "./App.css";
import Login from "./components/Login";
import { Col, Container, Row } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Home from "./components/Home";

function App() {
  return (
    <Container>
      <Row>
        <Col>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <Home />
                </ProtectedRoutes>
              }
            />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
