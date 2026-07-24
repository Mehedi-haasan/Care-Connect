import React from 'react';

const Edit = ({onClick}) => {

    return (
        <svg xmlns="http://www.w3.org/2000/svg" onClick={onClick} className='cursor-pointer' width="1.5em" height="1.5em" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none" />
            <path fill="currentColor" d="M16.293 2.293a1 1 0 0 1 1.414 0l4 4a1 1 0 0 1 0 1.414l-13 13A1 1 0 0 1 8 21H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 .293-.707l10-10zM14 7.414l-9 9V19h2.586l9-9zm4 1.172L19.586 7L17 4.414L15.414 6z" />
        </svg>
    );
};

export default Edit;
