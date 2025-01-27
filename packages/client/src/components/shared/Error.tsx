import styled from 'styled-components';

export interface ErrorProps {
  message: string;
}

const FullWidthAndCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  margin: auto;
  color: red;
`;

export const Error = (props: ErrorProps) => {
  const { message } = props;
  return (
    <FullWidthAndCentered>
      <span>{message}</span>
    </FullWidthAndCentered>
  );
};
