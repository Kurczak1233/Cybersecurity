import React, { useState } from "react";
import "./App.scss";
import AdminsComponent from "./components/AdminsComponent/AdminsComponent";
import InitialScreen from "./components/InitialScreen/InitialScreen";
import UsersComponent from "./components/UsersComponent/UsersComponent";
import { Toaster } from "react-hot-toast";

function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);

  return (
    <>
      <Toaster />
      {!isLogged && (
        <InitialScreen
          setIsLogged={setIsLogged}
          setIsAdmin={setIsAdmin}
          setUserId={setUserId}
        />
      )}
      {!isAdmin && isLogged && <UsersComponent userId={userId} />}
      {isAdmin && isLogged && <AdminsComponent />}
    </>
  );
}

export default App;
