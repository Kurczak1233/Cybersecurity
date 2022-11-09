import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import "./UsersComponent.scss";

interface IUsersComponent {
  userId: number;
  shouldChangePassword: boolean;
  oneTimePassword: string;
}

const UsersComponent = ({
  userId,
  shouldChangePassword,
  oneTimePassword,
}: IUsersComponent) => {
  return (
    <div>
      <div className="text">User component</div>
      <div className="text">
        You are {!shouldChangePassword && "not"} obliged to change password.
      </div>
      {oneTimePassword && (
        <>
          <div className="text">Youre one time password: {oneTimePassword}</div>
          <div className="text">
            If you do not change password now you will lose access to this
            account
          </div>
        </>
      )}
      <br />
      <ChangePasswordComponent userId={userId} />
    </div>
  );
};
export default UsersComponent;
