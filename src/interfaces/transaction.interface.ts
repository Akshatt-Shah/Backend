export interface ITransaction {
  sender_account_no: number;
  receiver_account_no?: number;
  transactionType: "Credit" | "Debit" | "Transfer";
  description: string;
  amount: number;
  date?: Date;
}
