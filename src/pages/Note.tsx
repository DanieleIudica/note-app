import { useQuery } from "@tanstack/react-query";
import { fetchNote } from "../api/notes-api";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner, Stack } from "react-bootstrap";

const Note = () => {
  const { id } = useParams();

  const {
    isLoading,
    data: note,
    error,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNote(id!),
  });
  console.log(note);
  if (isLoading) {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h2>{note.title}</h2>
      <div>{note.body}</div>
      <Stack direction="horizontal" className="justify-content-end mt-5">
        <Link to="..">
          <Button type="button" variant="outline-dark">
            Back
          </Button>
        </Link>
      </Stack>
    </>
  );
};

export default Note;
