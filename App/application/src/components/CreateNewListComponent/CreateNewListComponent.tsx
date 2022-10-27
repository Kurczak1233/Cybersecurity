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
        type="password"
        placeholder={"Password"}
      />
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
