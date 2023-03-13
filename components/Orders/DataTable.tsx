import { Box, Flex } from '@chakra-ui/react';

interface BorderData {
  title: string;
  value: string;
  // eslint-disable-next-line react/require-default-props
  color?: string;
}

function DataTable({ title, value, color = '#707070' }: BorderData) {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      padding="0.4rem 0"
      width="100%"
    >
      <Box fontWeight="bold" color={color}>
        {title}
      </Box>
      <Box>{value}</Box>
    </Flex>
  );
}

export default DataTable;
