import React, { useEffect, useState } from 'react'

const InputComponent = ({ onChange, label, placeholder, type, isRequered, value, className, readOnly = false }) => {
    const [inputValue, setInputValue] = useState(null)

    useEffect(() => {
        if (type === 'number') {
            setInputValue(parseInt(value))
        } else {
            setInputValue(value)
        }

    }, [value])

    return (
        <div className='py-1'>
            <h1 for={label} className={`${className} mb-2 text-start text-[13px] font-bold text-gray-900 dark:text-white`}>{label}</h1>
            <input type={type} value={inputValue} required={isRequered} readOnly={readOnly} onChange={(e) => { onChange(e.target.value) }}
                className={`${className} font-thin border rounded-lg text-[#6B7280] dark:bg-[#040404] dark:text-white text-[15px] focus:outline-none block w-full px-1.5 pt-[3px] pb-[4px]`}
                placeholder={placeholder} />
        </div>
    )
}

export default InputComponent
