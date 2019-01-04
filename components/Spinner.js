import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerWrapper = styled.div`
`;

const StyledSpinner = styled.div`
    animation: ${rotate} 0.75s linear infinite;
    border: 0.1rem solid #00000030;
    border-top-color: black;
    border-radius: 50%;
    height: 4rem;
    width: 4rem;
`;

export const Spinner = () => {
    return (
        <SpinnerWrapper>
            <StyledSpinner />
        </SpinnerWrapper>
    );
}
