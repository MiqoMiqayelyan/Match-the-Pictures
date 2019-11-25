import React from 'react';


export default function Win ({min, sec, showWinBlock, playAgain}){
    return (
        <div className="win-container" style={{display: (showWinBlock) ? 'flex' : 'none'}}>
            <div className="win-popup">
                <h2>You Win!</h2>
                <p>Time: {min} : {sec}</p>
                <button onClick={playAgain}>Play Again!</button>
            </div>
        </div>
        
    )
}