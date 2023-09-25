import { useState } from "react";
import { Button, Col, Row, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Note } from "../pages/NoteLists";
import { isDarkMode } from "../atom/atom";
import { useAtom } from "jotai";

type NoteFormProps = {
  onSubmit: (note: Note) => void;
  initialValue?: Note;
};

const NoteForm = ({ onSubmit, initialValue }: NoteFormProps) => {
  const [isDark] = useAtom(isDarkMode);

  const [note, setNote] = useState({
    title: initialValue?.title || "",
    body: initialValue?.body || "",
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({
      ...note,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit!(note);
    setNote({
      title: "",
      body: "",
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={2}>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                className="input"
                onChange={handleChangeInput}
                name="title"
                value={note.title}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            className="input"
            onChange={handleChangeInput}
            name="body"
            value={note.body}
            required
            as="textarea"
            rows={5}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button
            type="submit"
            variant={isDark ? "outline-success" : "success"}
          >
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant={isDark ? "outline-light" : "dark"}>
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;
