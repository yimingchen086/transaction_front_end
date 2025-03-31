import { Box, SimpleGrid, GridItem } from '@chakra-ui/react';
import { Fragment } from 'react/jsx-runtime';
interface Column {
  id: string;
  header: string;
}

interface Data {
  id: string; // 假設主鍵 id 是 number
  [key: string]: any; // 支援其他欄位
}

interface HorizontalTableProps {
  columns: Column[];
  data: Data[];
}
const HorizontalTable: React.FC<HorizontalTableProps> = (props) => {
  const { columns, data } = props;
  return (
    <Box>
      {columns.length > 0 ? (
        <SimpleGrid
          columns={{ base: 2, md: 4 }}
          gap={{ base: '24px', md: '20px' }}
        >
          {columns.map((item) => {
            const { id: colId, header } = item;
            return (
              <Fragment key={colId}>
                <GridItem colSpan={{ base: 1, md: 1 }}>
                  <Box height='20' textAlign='left'>
                    {header}
                  </Box>
                </GridItem>
                {data.length > 0 ? (
                  data.map((dataItem, dataIndex) => {
                    return (
                      <GridItem key={dataIndex} colSpan={{ base: 1, md: 3 }}>
                        <Box height='20' textAlign='left'>
                          {dataItem[colId]}
                        </Box>
                      </GridItem>
                    );
                  })
                ) : (
                  <GridItem key='empty' colSpan={{ base: 1, md: 3 }}>
                    <Box height='20'></Box>
                  </GridItem>
                )}
              </Fragment>
            );
          })}
        </SimpleGrid>
      ) : null}
    </Box>
  );
};

export default HorizontalTable;
