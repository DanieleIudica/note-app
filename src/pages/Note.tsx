import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "../api/notes-api";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner, Stack } from "react-bootstrap";
import { isDarkMode } from "../atom/atom";
import { useAtom } from "jotai";

const Note = () => {
  const { id } = useParams();
  const [isDark] = useAtom(isDarkMode);

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
          <span className="text-danger">Error: {error.message}</span>
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
            variant={isDark ? "outline-light" : "outline-dark"}
          >
            Back
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default Note;
