import React from 'react';
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function AuthMessage() {
  return (
    <div className="container d-flex justify-content-between align-items-center p-4 mt-5 bg-light rounded-3 shadow-sm">
      <h5 className="text-danger fw-semibold mb-0">
        🔒 Access Denied: Please log in to continue.
      </h5>
      <Button 
        as={Link} 
        to="/login" 
        variant="warning" 
        className="fw-bold px-4 py-2"
      >
        Log In
      </Button>
    </div>
  );
}
