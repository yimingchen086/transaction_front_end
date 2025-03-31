import { Box, Flex, FlexProps, Input, Button } from '@chakra-ui/react';
import { CardInfo } from './types/card';
import { memo } from 'react';
import { Field } from '@/components/ui/field';
import {
  NumberInputField,
  NumberInputRoot,
} from '@/components/ui/number-input';

interface CardTableProps extends FlexProps {
  cardData: CardInfo;
}

const RecordConsumption: React.FC<CardTableProps> = memo(
  ({ cardData, ...otherProps }) => {
    return (
      <Box>
        <Field label='消費金額' required mb='20px'>
          <NumberInputRoot defaultValue='0' width='200px' mb='20px'>
            <NumberInputField />
          </NumberInputRoot>
        </Field>
        <Flex justifyContent='flex-end'>
          <Button colorPalette='blue'>送出</Button>
        </Flex>
      </Box>
    );
  }
);

export default RecordConsumption;
