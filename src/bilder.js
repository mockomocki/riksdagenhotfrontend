import React from 'react';

function Bilder(props) {
    return(   
    <div>
         <img src={props.poster1} width="192" height="256" alt=""></img>
         <img src={props.poster2} width="192" height="256" alt=""></img>
    </div>
) 
        
}

export default Bilder; 