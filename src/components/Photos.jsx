import React from 'react';

//Create photo function to render photo
function Photo({ photo }) {
    return (
        <li>
            <img src={photo.webformatURL} alt={photo.tags || 'Gallery image'} />
        </li>
    );
}

export default Photo;