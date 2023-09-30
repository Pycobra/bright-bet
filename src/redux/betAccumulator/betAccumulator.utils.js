
export const AccumulationAppender = (newObj, formerObj) => {
    const objExist = formerObj.find(itm => itm.elementID === newObj.elementID)
    if (objExist) {
        return formerObj.filter(itm => 
            itm.elementID !== newObj.elementID)
    }
    formerObj.push(newObj)
    return formerObj
}
export const AccumulationRemover = (elementID, formerObj) =>{ 
    return formerObj.filter(i => i.elementID !== elementID)}




