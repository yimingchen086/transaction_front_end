import { Box, Flex, FlexProps } from '@chakra-ui/react';
import { CardInfo } from './types/card';
import { memo } from 'react';

const titles = ['回饋上限額度', '回饋高通路', '說明', '結帳日', '活動時間'];

const itemStyle = {
  mb: '12px',
  h: '48px',
};
interface CardTableProps extends FlexProps {
  data: CardInfo;
}

const CardTable: React.FC<CardTableProps> = memo(({ data, ...otherProps }) => {
  const { currAmount, maxConsume, store, description, postingDate, dateRange } =
    data;
  return (
    <Flex bg='white' borderRadius='4px' {...otherProps}>
      <Box>
        {titles.map((item) => {
          return (
            <Box key={item} textAlign='left' {...itemStyle}>
              {item}
            </Box>
          );
        })}
      </Box>
      <Box>
        <Box {...itemStyle}>{`${currAmount}/${maxConsume}`}</Box>
        <Box {...itemStyle}>{store}</Box>
        <Box {...itemStyle}>{description}</Box>
        <Box {...itemStyle}>{postingDate}</Box>
        <Box {...itemStyle}>{dateRange}</Box>
      </Box>
    </Flex>
  );
});

export default CardTable;
