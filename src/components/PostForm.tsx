import { useState } from "react";
import { Button, Col, Row, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const PostForm = () => {
  const [post, setPost] = useState({
    title: "",
    body: "",
  });

  const handleChangeInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(post);
    setPost({
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
                onChange={handleChangeInput}
                name="title"
                value={post.title}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markdown">
          <Form.Label>Body</Form.Label>
          <Form.Control
            onChange={handleChangeInput}
            name="body"
            value={post.body}
            required
            as="textarea"
            rows={5}
          />
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-dark">
              Cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default PostForm;
