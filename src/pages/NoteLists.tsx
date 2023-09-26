import { Alert, Button, ListGroup, Spinner } from "react-bootstrap";
import AddNote from "../components/AddNote";
import { Book, CardList, Pencil, Trash } from "react-bootstrap-icons";
import "../style/style.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteNote, fetchNotes } from "../api/notes-api";
import { useNavigate } from "react-router-dom";
import { darkModeAtom } from "../atom/atom";
import { useAtom } from "jotai";
import "../style/style.scss";

export type Note = {
  id?: string;
  title: string;
  body: string;
};

const NoteLists = () => {
  const [darkMode] = useAtom(darkModeAtom);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    isLoading,
    data: notes,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    },
  });

  const handleDeleteNote = (id: string) => {
    deleteNoteMutation.mutate(id);
  };

  return (
    <div>
      <AddNote />
      <h2 className="mt-4">
        Note List
        <CardList className="ms-3 pb-1" />
      </h2>
      {isLoading && (
        <div className="container d-flex justify-content-center mt-4">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {error instanceof Error && (
        <div className="container d-flex justify-content-center mt-4">
          <Alert variant="danger">Error: {error.message}</Alert>
        </div>
      )}
      {notes && (
        <ListGroup>
          {notes.map((note: Note) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center list-item"
              key={note.id}
            >
              <div className="ellipsis">{note.title}</div>
              <div>
                <Button
                  variant={darkMode ? "success" : "outline-success"}
                  className="me-2"
                  onClick={() => navigate(`/note/${note.id}`)}
                >
                  <Book />
                </Button>
                <Button
                  variant={darkMode ? "dark" : "outline-dark"}
                  className="me-2"
                  onClick={() => navigate(`/note/${note.id}/edit`)}
                  disabled={note.id === "read-only"}
                >
                  <Pencil />
                </Button>
                <Button
                  variant={darkMode ? "danger" : "outline-danger"}
                  onClick={() => handleDeleteNote(note.id!)}
                  disabled={note.id === "read-only"}
                >
                  <Trash />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default NoteLists;
