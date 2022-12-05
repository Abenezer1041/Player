import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faMusic} from "@fortawesome/free-solid-svg-icons"

const  Nav = ({setLibraryStat, libraryStat} ) =>{
    return(
         
        <nav>
            <h1>Wave</h1>
            <button onClick={()=> setLibraryStat((!libraryStat))}>
                Library 
                <FontAwesomeIcon icon={faMusic}/>
            </button>
        </nav>
    )
}


export default Nav;