export interface IAccount {
  _id?: string;
  Account_No?: number;
  type?: "Current" | "Saving";
  user?: string;
  totalamount?: number;
}
