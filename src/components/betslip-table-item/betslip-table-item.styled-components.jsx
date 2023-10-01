import styled, { css } from 'styled-components'



const handleProp = ({data, cardtype}) => {
  const list = []
  if (data.length){
    var width = 0
    if (document.documentElement.clientWidth > 768){
      width = 37
    }
    else if (document.documentElement.clientWidth <= 768){
      width = 33
    }
    else if (document.documentElement.clientWidth <= 414){
      width = 30
    }
    data.map(obj => Object.keys(obj).map(str => {
      if (cardtype==="MainContentCard"){
          list.push(str)
      } else {
        Object.keys(obj[str]).map(i => {
          list.push(i)
        })
      }
    }))
    const num = (width * list.length) / data.length
    const styleCss = data.length === 1 ? css`grid-template-columns: ${num}px;`
              : data.length === 2 ? css`grid-template-columns: ${num}px ${num}px;`
              :null
    return styleCss

  }
  return 0
}
const handleProp2 = ({data, cardtype}) => {
  if (data.length){
    let list=[]
    data.map(obj => {
      if (cardtype==="MainContentCard"){
        list.push(Object.keys(obj))
      } else {
        list = Object.keys(obj).map(i => Object.keys(obj[i]))
      }
    })
    const cols = list[0].length === 1 ? css`grid-template-columns: auto;`
              : list[0].length === 2 ? css`grid-template-columns: auto auto;`
              : list[0].length === 3 ? css`grid-template-columns: auto auto auto;`
              : list[0].length === 4 ? css`grid-template-columns: auto auto auto auto;`
              : list[0].length === 5 ? css`grid-template-columns: auto auto auto auto auto;`
              : list[0].length === 6 ? css`grid-template-columns: auto auto auto auto auto auto;`
              : list[0].length === 7 ? css`grid-template-columns: auto auto auto auto auto auto auto;`
              : list[0].length === 8 ? css`grid-template-columns: auto auto auto auto auto auto auto auto;`
              :null
    return cols

  }
  return 0
}
export const StyledOption4Container = styled.div`
  display: grid;
  ${handleProp}
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-content: space-between;

  .table-item__odd-item{
      display: grid;
      ${handleProp2}
      grid-template-rows: auto;
    
      .odd-text {
          background-color: var(--black);
          text-align: center;
          padding: 10px 0;
          cursor: pointer;
          border-right: 1px solid var(--mask);

          &:hover{
              background-color: var(--yellow);
              color: var(--black);
          }

          &:first-child {
              border-radius: 5px 0 0 5px;
          }
          &:last-child {
              border-radius: 0 5px 5px 0;
          }
      }
      .odd-text.active-odd-text {
          background-color: var(--green);
          color: var(--white);
      }
  }
`;
