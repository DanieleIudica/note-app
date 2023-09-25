import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NoteLists from "./pages/NoteLists";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import { Button, Container, Stack } from "react-bootstrap";
import { Moon, Sun } from "react-bootstrap-icons";
import { isDarkMode } from "./atom/atom";
import { useAtom } from "jotai";

function App() {
  const [isDark, setIsDark] = useAtom(isDarkMode);

  const handleDarkMode = () => {
    setIsDark(!isDark);
  };
  return (
    <div
      style={{
        backgroundColor: isDark ? "#152e47" : "#adccff",
        height: "100vh",
        color: isDark ? "#f5f9ff" : "#191a1b",
      }}
    >
      <Container className="py-4">
        <Stack
          direction="horizontal"
          className="justify-content-end m-4 fixed-top"
        >
          <Button
            type="button"
            variant="dark"
            className="d-flex align-items-center p-2"
            onClick={handleDarkMode}
          >
            {isDark ? <Sun /> : <Moon />}
          </Button>
        </Stack>
        <h1 className="mb-5">My Notes App</h1>
        <Routes>
          <Route path="/" element={<NoteLists />} />
          <Route path="/note/:id" element={<Note />} />
          <Route path="/note/:id/edit" element={<EditNote />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
