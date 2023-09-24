import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NoteLists from "./pages/NoteLists";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="my-4">
      <h1 className="mb-5">My Notes App</h1>
      <Routes>
        <Route path="/" element={<NoteLists />} />
        <Route path="/note/:id" element={<Note />} />
        <Route path="/note/:id/edit" element={<EditNote />} />
      </Routes>
    </Container>
  );
}

export default App;
