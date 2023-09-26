import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "../api/notes-api";
import { Link, useParams } from "react-router-dom";
import { Alert, Button, Spinner, Stack } from "react-bootstrap";
import { darkModeAtom } from "../atom/atom";
import { useAtom } from "jotai";

const Note = () => {
  const { id } = useParams();
  const [darkMode] = useAtom(darkModeAtom);

  const {
    isLoading,
    data: note,
    error,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNote(id!),
  });

  return (
    <>
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
      {note && (
        <>
          <h2>{note.title}</h2>
          <div>{note.body}</div>
        </>
      )}
      <Stack
        direction="horizontal"
        className="justify-content-end m-5 fixed-bottom"
      >
        <Link to="..">
          <Button
            type="button"
            variant={darkMode ? "outline-light" : "outline-dark"}
          >
            Back
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default Note;
