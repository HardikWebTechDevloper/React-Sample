import React from 'react';
import ReactLoading from 'react-loading';

export const Loading =({ type, color, height, width }) => { 
    return (
        <ReactLoading type={type} color={color} height={`${height||24}px`} width={`${width||50}px`} className="btn-loader" />
    ); 
}

// type = "balls", "bars", "bubbles", "cubes", "cylon", "spin", "spinningBubbles", "spokes" 