import styled, { css } from 'styled-components'



const handleProp = (data) => {
  const list = []
  if (data.length){
    var width = 0
    if (document.documentElement.clientWidth > 768){
      width = 45
    }
    else if (document.documentElement.clientWidth <= 768){
      width = 33
    }
    else if (document.documentElement.clientWidth >= 768){
      width = 30
    }
    data.map(obj => Object.keys(obj).map(str => list.push(str)))
    const num = (width * list.length) / data.length
    const styleCss = data.length === 1 ? css`grid-template-columns: ${num}px;`
              : data.length === 2 ? css`grid-template-columns: ${num}px ${num}px;`
              :null
    return styleCss

  }
  return 0
}
const handleProp2 = (data) => {
  if (data.length){
    const list = data.map(obj => Object.keys(obj))
    const p = list[0].length === 1 ? css`grid-template-columns: auto;`
              : list[0].length === 2 ? css`grid-template-columns: auto auto;`
              : list[0].length === 3 ? css`grid-template-columns: auto auto auto;`
              : list[0].length === 4 ? css`grid-template-columns: auto auto auto auto;`
              : list[0].length === 5 ? css`grid-template-columns: auto auto auto auto auto;`
              : list[0].length === 6 ? css`grid-template-columns: auto auto auto auto auto auto;`
              : list[0].length === 7 ? css`grid-template-columns: auto auto auto auto auto auto auto;`
              : list[0].length === 8 ? css`grid-template-columns: auto auto auto auto auto auto auto auto;`
              :null
    return p
  }
  return 0
}



export const StyledOption4Container1 = (data) => css`
  background-color: blue;
  display: grid;
  ${handleProp(data)}
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-content: space-between;
  
  .content-odd__head-col {
      background-color: brown;
      display: grid;
      ${handleProp2(data)}
      grid-template-rows: auto;
      justify-content: center;

      .odd__head-text {
          text-align: center;
          background-color: green;
      } 
  }
`;

export const StyledOption4Container2 = (data) => css`
  background-color: blue;
  display: grid;
  ${handleProp(data)}
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-content: space-between;

  .table-item__odd-item{
      display: grid;
      ${handleProp2(data)}
      grid-template-rows: auto;
    
      .odd-text {
          background-color: var(--black);
          text-align: center;
          padding: 10px 0;
          cursor: pointer;

          &:hover{
              background-color: var(--yellow);
              color: var(--black);
          }

          &:first-child {
              border-radius: 5px 0 0 5px;
              border-right: 1px solid var(--mask);
          }
          &:last-child {
              border-radius: 0 5px 5px 0;
              border-left: 1px solid var(--mask);
          }
      }
      .odd-text.active-odd-text {
          background-color: var(--green);
          color: var(--white);
      }
      @media screen and (max-width:768px){
          ${handleProp2(data)}
      }
      @media screen and (max-width:414px){
          ${handleProp2(data)}
      }
  }
`;

const getStyle = ({page, data}) => {
  if (page === "betslip-table-item"){
    return StyledOption4Container1(data)
  }
  else if (page === "betslip-table-"){
    return StyledOption4Container2(data)
  }

}

export const StyledOption4Container = styled.div`
  ${getStyle}
`
