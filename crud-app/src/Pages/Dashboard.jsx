import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ListPost from "./ListPost";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function Dashboard({ records, deleteRecord, isLoggedIn }) {
  return (
    <>
      <Container className="py-4">
        <Row className="align-items-center mb-4">
          <Col xs={12} md={6}>
            <h2 className="mb-3 mb-md-0">Posts List</h2>
          </Col>
          <Col xs={12} md={6} className="text-md-end">
            <Link to="/AddPost">
              <Button variant="outline-dark" className="me-2">
                Add Post
              </Button>
            </Link>
            {!isLoggedIn && (
              <Link to="/login">
                <Button variant="outline-secondary">Login</Button>
              </Link>
            )}
          </Col>
        </Row>

        <Table
          striped
          bordered
          hover
          responsive
          className="text-center table-bordered"
        >
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <ListPost
              records={records}
              deleteRecord={deleteRecord}
              isLoggedIn={isLoggedIn}
            />
          </tbody>
        </Table>
      </Container>
    </>
  );
}

export default Dashboard;
