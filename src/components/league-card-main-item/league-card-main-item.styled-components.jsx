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
    else if (document.documentElement.clientWidth >= 768){
      width = 30
    }
    
    // data.map(obj => Object.keys(obj).map(str => list.push(str)))
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
    
    // const list = data.map(obj => Object.keys(obj))
    let list=[]
    data.map(obj => {
      if (cardtype==="MainContentCard"){
        list.push(Object.keys(obj))
      } else {
        list = Object.keys(obj).map(i => Object.keys(obj[i]))
      }
    })
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
export const StyledOption4Container = styled.div`
  display: grid;
  ${handleProp}
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-content: space-between;
  
  .content-odd__head-col {
      display: grid;
      ${handleProp2}
      grid-template-rows: auto;

      .odd__head-text {
          text-align: center;
      } 
  }
`;
// export const Option3Container = styled.div`
//   background-color: blue;
//   display: grid;
//   grid-template-columns: ${handleProp}px;
//   grid-template-rows: auto;
//   justify-content: center;
// `;
// export const StyledOption4Content = styled.div`
//   background-color: brown;
//   display: grid;
//   ${handleProp2}
//   grid-template-rows: auto;
//   justify-content: center;

//   .odd__head-text {
//     text-align: center;
//     background-color: green;
//   } 
// `;