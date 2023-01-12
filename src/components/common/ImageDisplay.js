import React from 'react';
import { mediaURL } from "../../helpers/authUtils" 

const ImageDisplay = ({ image, alter, path }) => { 
    if(image ==='' || !image) return '';
    return <img width="50" src={mediaURL(path, image)} alt={alter} />; 
}

export default ImageDisplay;