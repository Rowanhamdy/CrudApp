import React from "react";
import Button from "react-bootstrap/Button";
import { Link, useNavigate } from "react-router-dom";

export default function ListPost({ records, deleteRecord, isLoggedIn }) {
  const navigate = useNavigate();

  const deleteHandler = (item) => {
    if (window.confirm(`Do you really want to delete record ${item.title} ?`)) {
      deleteRecord(item.id);
    }
  };

  const postDetail = (e) => {
    const confirmed = window.confirm(
      "Do you really want to show details of this record?"
    );
    if (!confirmed) {
      e.preventDefault(); // prevent navigation if canceled
      console.log("Action cancelled.");
    }
  };
  const record = records.map((el, index) => (
    <tr key={el.id}>
      <td scope="row ">#{index++}</td>
      <td>
        {" "}
        <Link
          onClick={(e) => postDetail(e, el.id)}
          className="text-decoration-none text-black"
          to={`/post/${el.id}`}
        >
          {el.title}
        </Link>
      </td>
      <td>{el.description}</td>
      <td>
        <div className="d-flex justify-content-center">
          <Button
            className="nav ps-2 me-2"
            variant="info"
            onClick={() => navigate(`post/${el.id}/edit`)}
            disabled={!isLoggedIn}
          >
            Edit Post
          </Button>
          <Button
            className="me-5"
            variant="danger"
            onClick={() => deleteHandler(el)}
            disabled={!isLoggedIn}
          >
            Delete
          </Button>
        </div>
      </td>
    </tr>
  ));
  return <>{record}</>;
}
