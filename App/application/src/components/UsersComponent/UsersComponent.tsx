import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import "./UsersComponent.scss";

interface IUsersComponent {
  userId: number;
}

const UsersComponent = ({ userId }: IUsersComponent) => {
  return (
    <div>
      <div className="text">User component</div>
      <ChangePasswordComponent userId={userId} />
    </div>
  );
};
export default UsersComponent;
