import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteForm from "./NoteForm";
import { createNote } from "../api/notes-api";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../pages/NoteLists";
import { Modal } from "react-bootstrap";
import { useState } from "react";

const AddNote = () => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      setShow(true);
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
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Body>Added Successfully!</Modal.Body>
        </Modal.Header>
      </Modal>
      <h2>Add New</h2>
      <NoteForm onSubmit={handleAddNote} />
    </div>
  );
};

export default AddNote;
