import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import PostLists from "./pages/PostLists";
import Post from "./pages/Post";
import EditPost from "./pages/EditPost";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container className="my-4">
      <h1>My Notes App</h1>
      <Routes>
        <Route path="/" element={<PostLists />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/post/:id/edit" element={<EditPost />} />
      </Routes>
    </Container>
  );
}

export default App;
