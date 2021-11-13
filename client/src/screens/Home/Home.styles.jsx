import styled, { keyframes } from "styled-components";


export const HomeContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const welcomeAnimation = keyframes`
0% { opacity: 0% }
25% { opacity: 100% }
50% {opacity: 0% }
75% {opacity: 100% }
100% { opacity: 0%  }
`;

export const Welcome = styled.h1`
color: #7CFC00;
animation-name: ${welcomeAnimation}};
animation-duration: 1s;
animation-iteration-count: 5;
`;
