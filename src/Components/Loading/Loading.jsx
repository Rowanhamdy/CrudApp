import React from "react";

export default function Loading({ loading, error, children }) {

  // Check the type of the child component to see if it's a Button.
  const elementType = children?.type?.render?.displayName;

  // A helper function to decide what to render based on props.
  const renderHandler = () => {

    
      // Clone the original button and modify its behavior if loading is true.
      // This avoids needing to write separate button rendering logic.
    if (elementType === "Button") {
      //"Take the original button, make a copy of it, but change it to be disabled and show 'Loading' as its label."
      const cloneButton = React.cloneElement(
        children,
        //If you are loading ? Disable the button so the user can't click it. =>
        {
          disabled: true,
        },
        //Change the label to "Loading"
        "Loading"
      );

      // Return UI for the button case:
      return (
        <>
          {loading ? (
         // If loading, show the cloned disabled button with "Loading" label
            cloneButton
          ) : error ? (
          // If there's an error and not loading, show the original button and error message
            <>
              {children}
              <p>{error}</p>
            </>
          ) : (
          // If neither loading nor error, just show the original button
            children
          )}
        </>
      );
    }

    // For all other components (not Button)
    return (
      <>
        {loading ? (
        // If loading, show a generic loading message
          <p>loading pleas wait ...</p>
        ) : error ? (
        // If there's an error, show an error message
          <p>Error occurred {error} </p>
        ) : (
        // Otherwise, render the children normally
          children
        )}
      </>
    );
  };

  return renderHandler();
}
