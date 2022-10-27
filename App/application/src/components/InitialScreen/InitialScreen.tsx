import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { login, register } from "../../api/UsersClient";
import { IUserCredentialsDto } from "../../models/DTOs/UserCredentialsDto";
import "./InitialScreen.scss";

interface IInitialScreen {
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAdmin: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setShouldChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const InitialScreen = ({
  setIsLogged,
  setIsAdmin,
  setUserId,
  setShouldChangePassword,
}: IInitialScreen) => {
  const [showRegister, setShowRegister] = useState<boolean>(false);
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [isLogging, setIsLogging] = useState<boolean>(false);
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
        createdByAdmin: false,
      };
      await register(request);
      setShowRegister(false);
      setIsRegistering(false);
    } catch {
      setIsRegistering(false);
      return toast("Register failed");
    }
  };

  const submitLogin = async () => {
    try {
      setIsLogging(true);
      const request: IUserCredentialsDto = {
        username: registerUsername.current
          ? registerUsername.current.value
          : "",
        password: registerPassword.current
          ? registerPassword.current.value
          : "",
        createdByAdmin: false,
      };
      const response = await login(request);
      setIsLogged(response.logged);
      setIsAdmin(response.isAdmin);
      setUserId(response.userId);
      setShouldChangePassword(response.shouldChangePassword);
      setShowLogin(false);
      setIsLogging(false);
    } catch {
      setIsLogging(false);
      return toast("Login failed");
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
            {isLogging ? "Logging..." : "Login"}
          </button>
        </>
      )}
    </>
  );
};

export default InitialScreen;
