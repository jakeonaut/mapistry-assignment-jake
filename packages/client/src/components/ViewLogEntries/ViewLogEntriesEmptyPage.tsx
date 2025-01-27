import styled from 'styled-components';

const FullPageDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export function ViewLogEntriesEmptyPage() {
  return (
    <FullPageDiv>
      <span>No log entries.</span>
    </FullPageDiv>
  );
}
