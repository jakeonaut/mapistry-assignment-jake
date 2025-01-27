import styled from 'styled-components';

interface ViewLogEntriesHeaderProps {
  onAddNew: () => void;
  logName: string;
}

const StyledLogEntriesHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.5em;
  background: #ddd;
`;

export function ViewLogEntriesHeader({
  onAddNew,
  logName,
}: ViewLogEntriesHeaderProps) {
  return (
    <StyledLogEntriesHeader>
      <span>{logName}</span>
      <button type="button" onClick={onAddNew}>
        Add New Entry
      </button>
    </StyledLogEntriesHeader>
  );
}
