export enum TransactionType {
  EXPENSE = 'expense',
  INCOME = 'income',
}

export type Category = {
  category_id: number;
  category_name: string;
  transaction_type: TransactionType;
};
