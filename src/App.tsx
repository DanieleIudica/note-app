import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NoteLists from "./pages/NoteLists";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { JournalBookmarkFill, Moon, Sun } from "react-bootstrap-icons";
import { darkModeAtom } from "./atom/atom";
import { useAtom } from "jotai";

function App() {
  const [darkMode, setDarkMode] = useAtom(darkModeAtom);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <div
      style={{
        backgroundColor: darkMode ? "#152e47" : "#adccff",
        minHeight: "100vh",
        color: darkMode ? "#f5f9ff" : "#191a1b",
      }}
    >
      <Container className="py-4">
        <Row>
          <Col className="mx-auto" lg={7} xs={12}>
            <Stack
              direction="horizontal"
              className="m-4 position-absolute top-0 end-0"
            >
              <Button
                type="button"
                variant="dark"
                className="d-flex align-items-center p-2"
                onClick={handleDarkMode}
              >
                {darkMode ? <Sun /> : <Moon />}
              </Button>
            </Stack>
            <h1 className="mb-5">
              <JournalBookmarkFill className="me-2" />
              My Notes:
            </h1>
            <Routes>
              <Route path="/" element={<NoteLists />} />
              <Route path="/note/:id" element={<Note />} />
              <Route path="/note/:id/edit" element={<EditNote />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
