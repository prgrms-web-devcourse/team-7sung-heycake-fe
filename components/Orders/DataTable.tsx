import { Box, Flex } from '@chakra-ui/react';

interface BorderData {
  title: string;
  value: string;
}

function DataTable({ title, value }: BorderData) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="0.4rem 0"
      width="100%"
    >
      <Box fontWeight="bold" color="#707070">
        {title}
      </Box>
      <Box>{value}</Box>
    </Flex>
  );
}

export default DataTable;
