import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { register } from "../../api/UsersClient";
import { IUserCredentialsDto } from "../../models/DTOs/UserCredentialsDto";

interface ICreateNewListComponent {
  setCreatedNewUser: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateNewListComponent = ({
  setCreatedNewUser,
}: ICreateNewListComponent) => {
  const [isRegistering, setIsRegistering] = useState<boolean>(false);
  const [passwordWasGenerated, setPasswordWasGenerated] =
    useState<boolean>(false);
  const registerUsername = useRef<HTMLInputElement>(null);
  const registerPassword = useRef<HTMLInputElement>(null);

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
        createdByAdmin: true,
      };
      await register(request);
      setIsRegistering(false);
      if (registerUsername.current && registerPassword.current) {
        registerUsername.current.value = "";
        registerPassword.current.value = "";
      }
      setCreatedNewUser(true);
      return toast("Added a user");
    } catch {
      setIsRegistering(false);
      return toast("Adding user failed");
    }
  };

  const generateOneTimePassword = () => {
    if (registerPassword.current) {
      registerPassword.current.value = Math.round(
        Math.random() * 899999 + 100000
      ).toString();
      setPasswordWasGenerated(true);
    }
  };

  const handlePasswordChange = () => {
    setPasswordWasGenerated(false);
  };

  return (
    <div>
      <div>Users list</div>
      <br />
      <div>Add user</div>
      <input
        className="input"
        ref={registerUsername}
        placeholder={"Username"}
      />
      <input
        className="input"
        ref={registerPassword}
        type={passwordWasGenerated ? "text" : "password"}
        placeholder={"Password"}
        onChange={handlePasswordChange}
      />
      <button style={{ marginLeft: "12px" }} onClick={generateOneTimePassword}>
        Generate new one time user password
      </button>
      <button
        className="button"
        onClick={() => !isRegistering && submitRegister()}
      >
        {isRegistering ? "Submitting..." : "Add user"}
      </button>
    </div>
  );
};

export default CreateNewListComponent;
