import React from 'react'
import { useRouteError } from "react-router-dom";


export default function NotFound() {
    const error = useRouteError();

  return (
    <div className="container text-center mt-5">
      <h1>Oops!</h1>
      <p>Something went wrong while loading the page.</p>
      <p className="text-danger">
        <strong>{error.status}</strong> – {error.statusText || error.message}
      </p>
    </div>
  )
}
