import styled, { css } from 'styled-components'


const handleProp = ({data}) => {
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
    // data.map(obj => Object.keys(obj).map(str => list.push(str)))
    data.map(obj => Object.keys(obj).map(i => {
      Object.keys(obj[i]).map((str,idx) => {
        list.push(str)
      })
    }))
    const num = (width * list.length) / data.length
    const styleCss = data.length === 1 ? css`grid-template-columns: ${num}px;`
              : data.length === 2 ? css`grid-template-columns: ${num}px ${num}px;`
              :null
    return styleCss

  }
  return 0
}
export const Option3Container = styled.div`
  display: grid;
  ${handleProp}
  grid-template-rows: auto;
  grid-gap: 10px;
  justify-content: space-between;

  
  .content-odd__title-col{
      display: flex;
      justify-content: center;
  }
`;
