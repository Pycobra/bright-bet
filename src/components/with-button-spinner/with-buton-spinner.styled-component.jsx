import styled from 'styled-components';




const elementSize = ({widthAndHeight}) => widthAndHeight
const elementBorder = ({borderColor}) => borderColor
const elementTopBorder = ({topBorderColor}) => topBorderColor

const FrameBox = ({elemStr}) => elemStr==="fullscreen" ? "100%" : "auto"
export const SpinnerOverlay = styled.div`
  height: ${FrameBox};
  width: ${FrameBox};
  display: grid;
  justify-content: center;
  align-items: center;
  padding-right:2px;
`;
export const SpinnerContainer = styled.div`
  display: inline-block;
  width: ${elementSize}px;
  height: ${elementSize}px;
  border-radius: 50%;
  border: ${elementBorder};
  border-top-color: ${elementTopBorder};
  animation: spin 1s ease-in-out infinite;
  -webkit-animation: spin 1s ease-in-out infinite;
  @keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
  @-webkit-keyframes spin {
    to {
      -webkit-transform: rotate(360deg);
    }
  }
`;
