import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteForm from "./NoteForm";
import { createNote } from "../api/notes-api";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../pages/NoteLists";

const AddNote = () => {
  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      alert("Note created successfully");
    },
  });

  const handleAddNote = (note: Note) => {
    createNoteMutation.mutate({
      ...note,
      id: uuidv4(),
    });
  };

  return (
    <div>
      <h2>Add New Note</h2>
      <NoteForm onSubmit={handleAddNote} />
    </div>
  );
};

export default AddNote;
