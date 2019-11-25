import React from 'react';

export default function Boxs({onSelect, id, img}){
    return(
        <div className="game-picturs" data-name={img}>
            <img
            onClick={onSelect} 
            src={'/imgs/' + img + '.jpg'}
            id={id}
            alt={img}
            />
        </div>
        
    )
}