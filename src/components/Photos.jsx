import React from 'react';

function Photo({ photo }) {
    return (
        <li>
            <img src={photo.webformatURL} alt={photo.tags || 'Gallery image'} />
        </li>
    );
}

export default Photo;