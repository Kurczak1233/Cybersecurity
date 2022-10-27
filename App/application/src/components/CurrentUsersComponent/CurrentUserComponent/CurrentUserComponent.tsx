import { useState } from "react";
import toast from "react-hot-toast";
import {
  blockAppUser,
  changePasswordValidty,
  deleteAppUser,
} from "../../../api/UsersClient";
import { AppUserVm } from "../../../models/ViewModels/AppUserVm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IPasswordValidDateDTO } from "../../../models/DTOs/PasswordValidDateDTO";

interface ICurrentUserComponent {
  user: AppUserVm;
  setListShouldUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CurrentUserComponent = ({
  user,
  setListShouldUpdate,
}: ICurrentUserComponent) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    new Date(user.passwordValidDate).getFullYear() > 2000
      ? new Date(user.passwordValidDate)
      : new Date()
  );
  const blockUser = async (userId: number) => {
    try {
      await blockAppUser(userId);
      setListShouldUpdate(true);
    } catch {
      return toast("Blocking user failed");
    }
  };

  const deleteUser = async (userId: number) => {
    try {
      await deleteAppUser(userId);
      setListShouldUpdate(true);
    } catch {
      return toast("Deleting user failed");
    }
  };

  const changePasswordValidDate = async (date: Date) => {
    date && setSelectedDate(date);
    try {
      const changePasswordValidtyRequest: IPasswordValidDateDTO = {
        date: date,
        userId: user.userId,
      };
      await changePasswordValidty(changePasswordValidtyRequest);
      setListShouldUpdate(true);
    } catch {
      return toast("Deleting user failed");
    }
  };

  return (
    <div>
      <span>{user.username}</span>{" "}
      {user.isBlocked ? (
        <span className="text-red">Blocked</span>
      ) : (
        <span onClick={() => blockUser(user.userId)} className="text-orange">
          Block
        </span>
      )}{" "}
      <span onClick={() => deleteUser(user.userId)} className="text-red">
        Delete
      </span>{" "}
      <span>
        Password valid to:{" "}
        {new Date(user.passwordValidDate).getFullYear() > 2000
          ? new Date(user.passwordValidDate).toDateString()
          : "-"}{" "}
        Change valid date:{" "}
        <DatePicker
          selected={selectedDate}
          onChange={(date) => date && changePasswordValidDate(date)}
        />
      </span>
    </div>
  );
};

export default CurrentUserComponent;
