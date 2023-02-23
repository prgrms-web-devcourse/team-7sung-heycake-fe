import styled from '@emotion/styled';

interface BorderData {
  title: string;
  value: string;
}

function DataTable({ title, value }: BorderData) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <div>{value}</div>
    </Wrapper>
  );
}

export default DataTable;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
  border-bottom: 1px solid #c7c7c7;
  font-size: 0.8rem;
`;

const Title = styled.div`
  font-weight: bold;
`;
