import { useState } from "react";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faDoorOpen } from "@fortawesome/free-solid-svg-icons";

function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="" className="bg-body-tertiary p-3" onClick={handleShow}>
        <FontAwesomeIcon  icon={faBars} />
      </Button>

      <Offcanvas className="bg-body-tertiary"  show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton className="main-title">
          <Offcanvas.Title >CRUD OPERATIONS</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="admin">
            <img
              className="img"
              src="../../../public/man-inscription-admin-icon-outline-600nw-1730974153.webp"
              alt=""
            />

            <h6 className="mt-3">Rowanita hamdy</h6>
            <p className="text-warning fs-5">Admin</p>
          </div>

          <ul className="text-center mt-5 navLinks">
            <li className="mb-3 p-2">
              <Link to="/">
                <FontAwesomeIcon icon={faHouse} className="me-2" /> Home
              </Link>
            </li>
            <li className="mb-3 p-2">
              <Link to="AddPost">
                <FontAwesomeIcon icon={faPlus} className="me-2" />
                AddPost
              </Link>
            </li>
            <li className="mb-3 p-2">
              <Link to="login">
                <FontAwesomeIcon icon={faRightToBracket} className="me-2" />
                Login
              </Link>
            </li>
            <li className="mb-3 p-2 ">
              <Link to="signup">
                <FontAwesomeIcon icon={faUserPlus} className="me-2" />
                SignUp
              </Link>
            </li>
            <li className="mb-3 p-2 ">
              <Link to="logout">
                <FontAwesomeIcon icon={faDoorOpen} className="me-2" />
                LogOut
              </Link>
            </li>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;
