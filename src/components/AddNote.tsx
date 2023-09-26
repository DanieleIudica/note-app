import { useMutation, useQueryClient } from "@tanstack/react-query";
import NoteForm from "./NoteForm";
import { createNote } from "../api/notes-api";
import { v4 as uuidv4 } from "uuid";
import { Note } from "../pages/NoteLists";
import { Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { CheckLg, FileEarmarkPlus } from "react-bootstrap-icons";

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
      <Modal
        show={show}
        onHide={handleClose}
        animation={false}
        centered
        size="sm"
      >
        <Modal.Body className="d-flex justify-content-between align-items-center">
          Added Successfully!
          <Button onClick={handleClose} variant="outline-success">
            <CheckLg />
          </Button>
        </Modal.Body>
      </Modal>
      <h2>
        Add New
        <FileEarmarkPlus className="ms-3 pb-1" />
      </h2>
      <NoteForm onSubmit={handleAddNote} />
    </div>
  );
};

export default AddNote;
