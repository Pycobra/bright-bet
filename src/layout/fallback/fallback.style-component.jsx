import styled from 'styled-components';

export const FallbackImageOverlay = styled.div`
  height: 70vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FallbackImageContainer = styled.div`
  display: inline-block;
  background-image: ${({ imageUrl }) => `url(${imageUrl})`};
  background-size: cover;
  background-position: center;
  width: 40vh;
  height: 40vh;
`;

export const FallbackImageText = styled.h2`
  font-size: 28px;
  color: #2f8e89;
  @media screen and (max-width:375px){
    font-size: 18px;
  }
`;
