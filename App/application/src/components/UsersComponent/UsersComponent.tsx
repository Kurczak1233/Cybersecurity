import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import "./UsersComponent.scss";

interface IUsersComponent {
  userId: number;
  shouldChangePassword: boolean;
}

const UsersComponent = ({ userId, shouldChangePassword }: IUsersComponent) => {
  return (
    <div>
      <div className="text">User component</div>
      <div className="text">
        You are {!shouldChangePassword && "not"} obliged to change password.
      </div>
      <br />
      <ChangePasswordComponent userId={userId} />
    </div>
  );
};
export default UsersComponent;
