export type Transaction = {
  transaction_method_id: number | undefined;
  transaction_title: string | undefined;
  amount: number | undefined;
  actual_amount: number | undefined;
  category_id: number | undefined;
  transaction_time: Date | null;
  card_id: number | null;
  store: string | undefined;
};

export type AddTransactionResponse = Transaction & {
  id: number;
};
