import React from 'react';

function TopList(props) {
    return(   
    <div style={{display: 'flex'}}>
         <div style={{display: 'flex', flexDirection: 'column'}}><p>1</p><img src={props.poster1} width="192" height="256" alt=""></img></div>
         <div style={{display: 'flex', flexDirection: 'column'}}><p>2</p><img src={props.poster2} width="192" height="256" alt=""></img></div>
         <div style={{display: 'flex', flexDirection: 'column'}}><p>3</p><img src={props.poster3} width="192" height="256" alt=""></img></div>
         <div style={{display: 'flex', flexDirection: 'column'}}><p>4</p><img src={props.poster4} width="192" height="256" alt=""></img></div>
         <div style={{display: 'flex', flexDirection: 'column'}}><p>5</p><img src={props.poster5} width="192" height="256" alt=""></img></div>
    </div>
) 
        
}

export default TopList; 