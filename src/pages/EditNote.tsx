import { useNavigate, useParams } from "react-router-dom";
import NoteForm from "../components/NoteForm";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "react-bootstrap";
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

  console.log(note);
  if (isLoading) {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  const handleAddNote = (updatedNote: Note) => {
    console.log(updatedNote);
    updateNoteMutation.mutate({
      id,
      ...updatedNote,
    });
  };

  return (
    <div>
      <NoteForm initialValue={note} onSubmit={handleAddNote} />
    </div>
  );
};

export default EditNote;
