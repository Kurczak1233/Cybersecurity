import { useState, useEffect } from "react";
import { getAllApplicationUsers } from "../../api/UsersClient";
import { AppUserVm } from "../../models/ViewModels/AppUserVm";
import ChangePasswordComponent from "../ChangePasswordComponent/ChangePasswordComponent";
import ChangeUsernameComponent from "../ChangeUsernameComponent/ChangeUsernameComponent";
import CreateNewListComponent from "../CreateNewListComponent/CreateNewListComponent";
import CurrentUsersComponent from "../CurrentUsersComponent/CurrentUsersComponent";
import "./AdminsComponent.scss";

interface IAdminsComponent {
  userId: number;
}

const AdminsComponent = ({ userId }: IAdminsComponent) => {
  const [allUsers, setAllUsers] = useState<AppUserVm[]>([]);
  const [listShouldUpdate, setListShouldUpdate] = useState<boolean>(true);

  const getAllUsers = async (isApiSubscribed: boolean) => {
    const data = await getAllApplicationUsers();
    if (isApiSubscribed) {
      setAllUsers(data);
      setListShouldUpdate(false);
    }
  };

  useEffect(() => {
    let isApiSubscribed = true;
    if (listShouldUpdate) {
      getAllUsers(isApiSubscribed);
    }
    return () => {
      isApiSubscribed = false;
    };
  }, [listShouldUpdate]);

  return (
    <div className="text">
      <ChangePasswordComponent userId={userId} />
      <br />
      <ChangeUsernameComponent userId={userId} />
      <br />
      <CreateNewListComponent setCreatedNewUser={setListShouldUpdate} />
      <br />
      <CurrentUsersComponent
        allUsers={allUsers}
        setListShouldUpdate={setListShouldUpdate}
      />
    </div>
  );
};

export default AdminsComponent;
