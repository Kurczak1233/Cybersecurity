import application from "../authenticationConfig.json";
import { IUserCredentialsDto } from "../models/DTOs/UserCredentialsDto";
import { AxiosClient } from "./AxiosClient";

const base = application.baseUrl;
const Users = "Users";

const register = async (body: IUserCredentialsDto): Promise<null> => {
  return AxiosClient("POST", `${Users}/Register`, base, { body });
};

const login = async (body: IUserCredentialsDto): Promise<null> => {
  return AxiosClient("POST", `${Users}/Login`, base, { body });
};

export { register, login };
