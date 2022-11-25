import React, { useState } from "react";
import "./App.scss";
import AdminsComponent from "./components/AdminsComponent/AdminsComponent";
import InitialScreen from "./components/InitialScreen/InitialScreen";
import UsersComponent from "./components/UsersComponent/UsersComponent";
import { Toaster } from "react-hot-toast";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
function App() {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [oneTimePassword, setOneTimePassword] = useState<string>("");
  const [shouldChangePassword, setShouldChangePassword] =
    useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const captchaRef = useRef(null);

  return (
    <>
      <Toaster />
      {!isLogged && (
        <ReCAPTCHA
          sitekey={"6LcmNjMjAAAAAAy9zlxv8FQ1mzU3pOp4lAADxTwW"}
          ref={captchaRef}
        >
          <InitialScreen
            setIsLogged={setIsLogged}
            setIsAdmin={setIsAdmin}
            setOneTimePassword={setOneTimePassword}
            setUserId={setUserId}
            setShouldChangePassword={setShouldChangePassword}
          />
        </ReCAPTCHA>
      )}
      {!isAdmin && isLogged && (
        <UsersComponent
          userId={userId}
          shouldChangePassword={shouldChangePassword}
          oneTimePassword={oneTimePassword}
        />
      )}
      {isAdmin && isLogged && <AdminsComponent userId={userId} />}
    </>
  );
}

export default App;
