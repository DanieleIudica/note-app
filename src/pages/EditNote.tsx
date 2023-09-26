import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Alert, Spinner } from "react-bootstrap";
import { fetchNote, updateNote } from "../api/notes-api";
import { Note } from "./NoteLists";

const EditNote = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { id } = useParams();

  const {
    isLoading,
    data: note,
    error,
  } = useQuery({
    queryKey: ["notes", id],
    queryFn: () => fetchNote(id!),
  });

  const updateNoteMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      navigate("/");
    },
  });

  const handleAddNote = (updatedNote: Note) => {
    updateNoteMutation.mutate({
      id,
      ...updatedNote,
    });
  };

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
        <div>
          <NoteForm initialValue={note} onSubmit={handleAddNote} />
        </div>
      )}
    </>
  );
};

export default EditNote;
