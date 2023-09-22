import { Button, ListGroup, Spinner } from "react-bootstrap";
import AddPost from "../components/AddPost";
import { Pencil, Trash } from "react-bootstrap-icons";
import "../style/style.scss";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "../api/notes";

const PostLists = () => {
  const { isLoading, data, error } = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  });
  console.log(data);
  if (isLoading) {
    return <Spinner animation="border" variant="secondary" />;
  }

  if (error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div>
      <AddPost />
      <ListGroup className="mt-4">
        <ListGroup.Item className="d-flex justify-content-between align-items-center list-item">
          Cras justo odio Cras justo odio Cras justo odio
          <div>
            <Button variant="outline-secondary" className="me-2">
              <Pencil />
            </Button>
            <Button variant="outline-danger">
              <Trash />
            </Button>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
};

export default PostLists;
