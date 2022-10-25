import application from "../authenticationConfig.json";
import { PasswordChangeDTO } from "../models/DTOs/PasswordChangeDTO";
import { IUserCredentialsDto } from "../models/DTOs/UserCredentialsDto";
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

const submitPasswordChange = async (
  body: PasswordChangeDTO
): Promise<LoggedUserVm> => {
  return AxiosClient("POST", `${Users}/ChangePassword`, base, { body });
};

export { register, login, submitPasswordChange };
