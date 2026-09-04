import React, { useState } from 'react'

const InputComponent = ({ onChange, label, placeholder, type, isRequered }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        const newValue = event.target.value;
        setValue(newValue);
        onChange(newValue);
    };
    return (
        <div className='py-1'>
            <label for={label} className="block text-gray-700 mb-1 font-medium">{label}</label>
            <input type={type} required={isRequered} onChange={handleChange}
                className="w-full px-4 py-2 border border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder={placeholder} />
        </div>
    )
}

export default InputComponent
