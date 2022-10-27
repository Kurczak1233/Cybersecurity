import { useState, useRef } from "react";
import toast from "react-hot-toast";
import { submitUsernameChange } from "../../api/UsersClient";
import { UsernameChangeDTO } from "../../models/DTOs/UsernameChangeDTO";
import "./ChangeUsernameComponent.scss";

interface IChangeUsernameComponent {
  userId: number;
}

const ChangeUsernameComponent = ({ userId }: IChangeUsernameComponent) => {
  const [isChanging, setIsChanging] = useState<boolean>();
  const newUsername = useRef<HTMLInputElement>(null);

  const changeUsername = async () => {
    try {
      setIsChanging(true);
      const request: UsernameChangeDTO = {
        userId: userId,
        newUsername: newUsername.current ? newUsername.current.value : "",
      };

      await submitUsernameChange(request);
      setIsChanging(false);
      if (newUsername.current) {
        newUsername.current.value = "";
      }
      return toast("Changed username");
    } catch {
      setIsChanging(false);
      return toast("Changing username failed");
    }
  };
  return (
    <>
      <div>Change your name</div>
      <input
        className="input"
        ref={newUsername}
        type="text"
        placeholder={"New username"}
      />
      <button
        className="button"
        onClick={() => !isChanging && changeUsername()}
      >
        {isChanging ? "Changing..." : "Change username"}
      </button>
    </>
  );
};
export default ChangeUsernameComponent;
