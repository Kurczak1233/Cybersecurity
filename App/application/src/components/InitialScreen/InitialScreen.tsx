import { useRef, useState } from "react";
import { login, register } from "../../api/UsersClient";
import { IUserCredentialsDto } from "../../models/DTOs/UserCredentialsDto";
import "./InitialScreen.scss";

interface IInitialScreen {
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
}

const InitialScreen = ({
  setIsLogged,
  setIsAdmin,
  setUserId,
}: IInitialScreen) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
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
      setIsRegistering(true);
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
      setIsRegistering(false);
    } catch {
      setIsRegistering(false);
      return;
    }
  };

  const submitLogin = async () => {
    try {
      const request: IUserCredentialsDto = {
        username: registerUsername.current
          ? registerUsername.current.value
          : "",
        password: registerPassword.current
          ? registerPassword.current.value
          : "",
      };
      const response = await login(request);
      setIsLogged(response.logged);
      setIsAdmin(response.isAdmin);
      setUserId(response.userId);
      setShowLogin(false);
    } catch {
      return;
    }
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
          {!isRegistering && (
            <div onClick={handleShowRegister} className="button">
              Return
            </div>
          )}
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
          <button
            className="button"
            onClick={() => !isRegistering && submitRegister()}
          >
            {isRegistering ? "Submitting..." : "Register"}
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
