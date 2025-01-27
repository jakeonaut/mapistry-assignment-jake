import {
  EditLogEntryRequest,
  LogEntryResponse,
  DateLike,
} from '@mapistry/take-home-challenge-shared';
import { ReactNode } from 'react';
import styled from 'styled-components';

// TODO(jaketrower): This could probably be broken up to use the same rendering component as CreateLogEntryModal, and just split the business logic

interface EditLogEntryProps {
  logEntry: LogEntryResponse;
  handleClose: () => void;
  handleEdit: (logEntry: EditLogEntryRequest) => void;
}

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 20%;
`;

interface CloseButtonProps {
  type: string;
  onClick: () => void;
  children: ReactNode;
}

const CloseButton = styled.button<CloseButtonProps>`
  float: right;
`;

interface FormProps {
  onSubmit: (event: React.SyntheticEvent) => void;
  children: ReactNode;
}

const StyledForm = styled.form<FormProps>`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

  label {
    margin: 0.3rem;
    display: flex;
    flex-direction: column;
  }

  input {
    margin: 0.3rem 0;
  }
`;

const Header = styled.p`
  padding: 0.4rem;
  font-size: 1.2rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: right;

  button {
    margin-left: 0.3rem;
  }
`;

function getDateStrValue(date: DateLike): string {
  return new Date(date).toISOString().substring(0, 10);
}

export function EditLogEntryModal({
  logEntry,
  handleClose,
  handleEdit,
}: EditLogEntryProps) {
  return (
    <Modal>
      <ModalContent>
        <CloseButton type="button" onClick={handleClose}>
          X
        </CloseButton>
        <Header>Edit Log Entry</Header>
        <StyledForm
          onSubmit={(event: React.SyntheticEvent) => {
            event.preventDefault();
            const target = event.target as typeof event.target & {
              logDate: { value: string };
              logValue: { value: string };
            };
            const editRequest: EditLogEntryRequest = {
              logEntryId: logEntry.id,
              logDate: new Date(target.logDate.value),
              logValue: parseInt(target.logValue.value, 10),
            };
            handleEdit(editRequest);
          }}
        >
          <label htmlFor="logDate">
            Date:&nbsp;
            <input
              type="date"
              name="logDate"
              defaultValue={getDateStrValue(logEntry.logDate)}
            />
          </label>

          <label htmlFor="logValue">
            Value:&nbsp;
            <input
              type="text"
              name="logValue"
              defaultValue={logEntry.logValue}
            />
          </label>
          <ButtonContainer>
            <button type="button" onClick={handleClose}>
              Cancel
            </button>
            <button type="submit">Edit</button>
          </ButtonContainer>
        </StyledForm>
      </ModalContent>
    </Modal>
  );
}
