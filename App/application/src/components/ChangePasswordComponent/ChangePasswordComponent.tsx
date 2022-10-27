import { useRef, useState } from "react";
import { PasswordChangeDTO } from "../../models/DTOs/PasswordChangeDTO";
import "./ChangePasswordComponent.scss";
import toast from "react-hot-toast";
import { submitPasswordChange } from "../../api/UsersClient";

interface IChangePasswordComponent {
  userId: number;
}

const ChangePasswordComponent = ({ userId }: IChangePasswordComponent) => {
  const [isChanging, setIsChanging] = useState<boolean>();
  const oldPassword = useRef<HTMLInputElement>(null);
  const newPassword = useRef<HTMLInputElement>(null);

  const changePassword = async () => {
    try {
      setIsChanging(true);
      const request: PasswordChangeDTO = {
        userId: userId,
        newPassword: newPassword.current ? newPassword.current.value : "",
        oldPassword: oldPassword.current ? oldPassword.current.value : "",
      };

      await submitPasswordChange(request);
      setIsChanging(false);
      if (newPassword.current && oldPassword.current) {
        newPassword.current.value = "";
        oldPassword.current.value = "";
      }
      return toast("Changed password");
    } catch {
      setIsChanging(false);

      return toast("Changing password failed");
    }
  };

  return (
    <>
      <div className="text">Change password</div>
      <input
        className="input"
        ref={oldPassword}
        type="password"
        placeholder={"Old password"}
      />
      <input
        className="input"
        ref={newPassword}
        type="password"
        placeholder={"New Password"}
      />
      <button
        className="button"
        onClick={() => !isChanging && changePassword()}
      >
        {isChanging ? "Changing..." : "Change password"}
      </button>
    </>
  );
};

export default ChangePasswordComponent;
