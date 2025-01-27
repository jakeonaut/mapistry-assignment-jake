import styled from 'styled-components';

export interface LoadingProps {
  size?: 'small' | 'medium' | 'large';
}

const FullWidthAndCentered = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90%;
`;

export const Loading = () => (
  <FullWidthAndCentered>
    <span>Loading...</span>
  </FullWidthAndCentered>
);
