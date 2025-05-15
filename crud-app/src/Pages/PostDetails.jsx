import React, { useEffect } from "react";
import usePostDetails from "../hooks/use-post-details";
import { useDispatch } from "react-redux";
import { postsAction } from "../Store/postSlice";
import Loading from "../Components/Loading/Loading";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function PostDetails() {
  const { record, loading, error } = usePostDetails();
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(postsAction.cleanRecord());
    };
  }, [dispatch]);
 
  return (
    <>
      <div className="backgound">
        <div className="container border bg-body p-3 text-center">
          <Loading loading={loading} error={error}>
            <div className="d-flex justify-content-between border-bottom">
              <h6 className="text-capitalize text-info fw-bold ">
                Details of post
              </h6>
              <Button
                className="btn mb-1 ps-2 "
                variant="warning"
                as={Link}
                to="/"
              >
                Dashboard
              </Button>
            </div>

            <h6 className="pt-2">Title :{record?.title}</h6>
            <p>Description :{record?.description}</p>
          </Loading>

          
        </div>
      </div>
    </>
  );
}
