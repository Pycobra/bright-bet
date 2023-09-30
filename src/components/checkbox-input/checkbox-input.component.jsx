import React from 'react';
import "./checkbox-input.styles.css"

const CheckboxInput = ({children, handleChange, inputType, ...otherProps}) => {
    return (
        <div className={`${inputType==='CHECKBOX1' ? 'checkbox-1' : 'checkbox-2'}`} >
            <input 
                type="checkbox"
                onChange={handleChange}
                {...otherProps}>
                { children }
            </input>
        </div>
        )
}
export default CheckboxInput;