import { Button, ListGroup, Spinner } from "react-bootstrap";
import AddNote from "../components/AddNote";
import { Book, Pencil, Trash } from "react-bootstrap-icons";
import "../style/style.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../api/notes-api";
import { useNavigate } from "react-router-dom";

export type Note = {
  id?: string;
  title: string;
  body: string;
};

// export type NoteData = {
//   title: string;
//   body: string;
// };

const NoteLists = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    data: notes,
    error,
  } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
  console.log(notes);
  // if (isLoading) {
  //   return <Spinner animation="border" variant="secondary" />;
  // }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <AddNote />
      <h2 className="mt-4">Note List</h2>
      {isLoading && (
        <div className="container d-flex justify-content-center mt-4">
          <Spinner animation="border" variant="secondary" />
        </div>
      )}
      {notes && (
        <ListGroup>
          {notes.map((note: Note) => (
            <ListGroup.Item
              className="d-flex justify-content-between align-items-center"
              key={note.id}
            >
              {note.title}
              <div>
                <Button
                  variant="outline-success"
                  className="me-2"
                  onClick={() => navigate(`/note/${note.id}`)}
                >
                  <Book />
                </Button>
                <Button
                  variant="outline-dark"
                  className="me-2"
                  onClick={() => navigate(`/note/${note.id}/edit`)}
                >
                  <Pencil />
                </Button>
                <Button variant="outline-danger">
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
