import styled, { keyframes } from "styled-components";

export const DuelContainer = styled.div``;

export const UsersForm = styled.div`
  display: flex;
  justify-content: center;
  text-align: left;
  margin-top: 25px;
`;

export const LoadingContainer = styled.div`
  margin-top: 100px;
  text-align: center;
`;

export const ResultsContainer = styled.div`
  margin-top: 20px;
`;

export const UserResults = styled.div`
  display: flex;
  justify-content: space-evenly;
  text-align: left;
`;

export const User1 = styled.div``;
export const User2 = styled.div``;

const winnerAnimation = keyframes`
0% { opacity: 0% }
25% { opacity: 100% }
50% {opacity: 0% }
75% {opacity: 100% }
100% { opacity: 0%  }
`;

export const Winner = styled.h3`
color: #7CFC00;
animation-name: ${winnerAnimation}};
animation-duration: 1s;
animation-iteration-count: infinite;
`;

export const RunnerUp = styled.h3`
  color: lightgray;
`;
