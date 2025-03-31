CREATE TABLE cards_info
(
card_id SERIAL PRIMARY KEY,
card_name VARCHAR(50),
bank VARCHAR(50),
maxConsume INT,
currAmount INT,
description TEXT,
store TEXT,
rewardsType VARCHAR(50),
dateRange_start DATE,
dateRange_end DATE,
postingDate VARCHAR(10)
);

INSERT INTO cards_info (
  card_name
  ,bank
  ,maxConsume
  ,currAmount
  ,description
  ,store
  ,rewardsType
  ,daterange_start
  ,daterange_end
  ,postingDate
)
VALUES (
  '聯邦LINE BANK卡'
  ,'聯邦'
  ,10000
  ,0
  ,'國內1%無上限，電商、影音加碼3%'
  ,'momo、PChome、蝦皮、酷澎'
  ,'信用卡折抵'
  ,TO_TIMESTAMP('2024-08-01', 'YYYY-MM-DD')
  ,TO_TIMESTAMP('2025-07-31', 'YYYY-MM-DD')
  ,'1'
);
