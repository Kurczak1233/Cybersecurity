export interface LoggedUserVm {
  isAdmin: boolean;
  logged: boolean;
  userId: number;
  shouldChangePassword: boolean;
  oneTimePassword: string;
}
