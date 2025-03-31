export type CardInfo = {
  card_id: number;
  card_name: string; // 卡片名稱
  bank: string; // 銀行
  maxConsume: number; // 獲得回饋最高消費金額
  currAmount: number; // 目前消費金額
  description: string;
  store: string;
  rewardsType: string;
  postingDate: Date | null;
  dateRange: string;
};
