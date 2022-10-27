import { AppUserVm } from "../../models/ViewModels/AppUserVm";
import "./CurrentUsersComponent.scss";
import CurrentUserComponent from "./CurrentUserComponent/CurrentUserComponent";

interface ICurrentUsersComponent {
  allUsers: AppUserVm[];
  setListShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentUsersComponent = ({
  allUsers,
  setListShouldUpdate,
}: ICurrentUsersComponent) => {
  return (
    <div>
      {allUsers.map((item, index) => {
        return (
          <CurrentUserComponent
            key={`${index} ${item.username}`}
            user={item}
            setListShouldUpdate={setListShouldUpdate}
          />
        );
      })}
    </div>
  );
};

export default CurrentUsersComponent;
