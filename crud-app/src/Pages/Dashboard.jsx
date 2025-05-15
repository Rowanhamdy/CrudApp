import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ListPost from "./ListPost";
import { Link } from "react-router-dom";
function Dashboard({ records,deleteRecord,isLoggedIn }) {
  return (
    <>
      {/* <div className=" container d-flex justify-content-between">
        <h2 className="mb-4">Posts List</h2>
        <div className="d-flex  ">
          <Button className="nav mb-4 me-4" variant="warning">
            <Link className="add" to="AddPost">
              Add Post
            </Link>
          </Button>
          <Button className="nav mb-4 me-4" variant="warning">
            <Link className="add" to="login">
              LogIn
            </Link>
          </Button>
        
        </div>
      </div> */}
    <h2 className="container mt-5 bg-body-tertiary">Posts List</h2>
      <Table striped bordered hover className="text-center mt-3 container w-sm-75">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            <ListPost records={records} deleteRecord={deleteRecord}  isLoggedIn={isLoggedIn}/>
        </tbody>
      </Table>
    </>
  );
}

export default Dashboard;
