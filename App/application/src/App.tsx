import React, { useState } from "react";
import "./App.scss";
import InitialScreen from "./components/InitialScreen/InitialScreen";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  return (
    <>
      {!isLogged && (
        <InitialScreen setIsLogged={setIsLogged} setIsAdmin={setIsAdmin} />
      )}
      {isAdmin && <div className="text">Hello you are an admin</div>}
    </>
  );
}

export default App;
