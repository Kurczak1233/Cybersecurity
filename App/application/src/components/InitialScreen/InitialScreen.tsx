import { useRef, useState } from "react";
import { login, register } from "../../api/UsersClient";
import { IUserCredentialsDto } from "../../models/DTOs/UserCredentialsDto";
import "./InitialScreen.scss";

const InitialScreen = () => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const registerUsername = useRef<HTMLInputElement>(null);
  const registerPassword = useRef<HTMLInputElement>(null);

  const handleShowRegister = () => {
    return setShowRegister((oldValue) => !oldValue);
  };

  const handleShowLogin = () => {
    return setShowLogin((oldValue) => !oldValue);
  };

  const submitRegister = async () => {
    try {
      const request: IUserCredentialsDto = {
        username: registerUsername.current
          ? registerUsername.current.value
          : "",
        password: registerPassword.current
          ? registerPassword.current.value
          : "",
      };
      await register(request);
      setShowRegister(false);
    } catch {
      return;
    }
  };

  const submitLogin = async () => {
    const request: IUserCredentialsDto = {
      username: registerUsername.current ? registerUsername.current.value : "",
      password: registerPassword.current ? registerPassword.current.value : "",
    };
    await login(request);
    setShowLogin(false);
  };

  return (
    <>
      {!showRegister && !showLogin && (
        <div className="wrapper">
          <div className="button" onClick={handleShowRegister}>
            Register
          </div>
          <div onClick={handleShowLogin} className="button">
            Login
          </div>
        </div>
      )}
      {showRegister && (
        <>
          <div onClick={handleShowRegister} className="button">
            Return
          </div>
          <input
            className="input"
            ref={registerUsername}
            placeholder={"Username"}
          />
          <input
            className="input"
            ref={registerPassword}
            type="password"
            placeholder={"Password"}
          />
          <button className="button" onClick={submitRegister}>
            Register
          </button>
        </>
      )}
      {showLogin && (
        <>
          <div onClick={handleShowLogin} className="button">
            Return
          </div>
          <input
            className="input"
            ref={registerUsername}
            placeholder={"Username"}
          />
          <input
            className="input"
            ref={registerPassword}
            type="password"
            placeholder={"Password"}
          />
          <button className="button" onClick={submitLogin}>
            Login
          </button>
        </>
      )}
    </>
  );
};

export default InitialScreen;
