import application from "../authenticationConfig.json";
import { PasswordChangeDTO } from "../models/DTOs/PasswordChangeDTO";
import { IPasswordValidDateDTO } from "../models/DTOs/PasswordValidDateDTO";
import { IUserCredentialsDto } from "../models/DTOs/UserCredentialsDto";
import { UsernameChangeDTO } from "../models/DTOs/UsernameChangeDTO";
import { AppUserVm } from "../models/ViewModels/AppUserVm";
import { LoggedUserVm } from "../models/ViewModels/LoggedUserVm";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Users = "Users";

const register = async (body: IUserCredentialsDto): Promise<null> => {
  return AxiosClient("POST", `${Users}/Register`, base, { body });
};

const login = async (body: IUserCredentialsDto): Promise<LoggedUserVm> => {
  return AxiosClient("POST", `${Users}/Login`, base, { body });
};

// Vulnerability...
const getAllApplicationUsers = async (): Promise<AppUserVm[]> => {
  return AxiosClient("GET", `${Users}/Users`, base);
};

const submitUsernameChange = async (body: UsernameChangeDTO): Promise<null> => {
  return AxiosClient("POST", `${Users}/ChangeUsername`, base, { body });
};

const submitPasswordChange = async (body: PasswordChangeDTO): Promise<null> => {
  return AxiosClient("POST", `${Users}/ChangePassword`, base, { body });
};

const blockAppUser = async (userId: number): Promise<null> => {
  return AxiosClient("PUT", `${Users}/Block/${userId}`, base);
};

const deleteAppUser = async (userId: number): Promise<null> => {
  return AxiosClient("PUT", `${Users}/Delete/${userId}`, base);
};

const changePasswordValidty = async (
  body: IPasswordValidDateDTO
): Promise<null> => {
  return AxiosClient("PUT", `${Users}/ValidDate`, base, { body });
};

export {
  register,
  login,
  submitPasswordChange,
  submitUsernameChange,
  getAllApplicationUsers,
  blockAppUser,
  deleteAppUser,
  changePasswordValidty,
};
