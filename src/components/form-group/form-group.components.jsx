import React, { useState } from "react";
import FormInput from "../form-input/form-input.component";
// import { ReactComponent as Search } from '../asset/search-2.svg';
import './form-group.styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"


const FormGroup = ({HeaderType, MenuBarType, SideBarType}) => {
    const [search, setSearch] = useState('')
    const handleInput = (e) => {
        const {value} = e.target
        setSearch(value)
    }

    return (
        <form className={`${
            HeaderType ? "header-form"
            : SideBarType ? "side-bar-form" 
            : MenuBarType ? "menu-bar-form": ''
            } search-form`}>
            <FormInput  
                inputtype='SearchInputType'
                type="text" 
                placeholder="SEARCH" 
                value={search}
                onChange={(e) => handleInput(e)}
                name="search1" 
                required/>
            <button className="search-icon"><FontAwesomeIcon icon={faSearch} /></button>
        </form>
    )
}

export default FormGroup;


