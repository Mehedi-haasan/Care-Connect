import React, { useState } from 'react'
import { NavLink } from "react-router-dom";

const AddToCart = ({ id, qty }) => {
    const [addCart, setAddCard] = useState(true);
    const [count, setCount] = useState(1);

    const handleAddToCart = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/product/add/to/cart`, {
            method: "POST",
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                id: id,
                qty: count,

            }),
        });

        const data = await response.json();
        alert(data.message)
    }


    return (
        <div>
            <button onClick={() => { if (count > 1) { setCount(count - 1) } else { setCount(1) } }} className='border p-2 hover:bg-red-500'>-</button>
            <button className='border p-2'>{count}</button>
            <button onClick={() => { setCount(count + 1) }} className='border p-2 hover:bg-red-500'>+</button>
            {
                addCart ? <button onClick={handleAddToCart} className='border px-3 lg:px-5 py-1 lg:py-2 ml-2 lg:ml-4 rounded-md text-white font-semibold bg-red-600'>Add to Card</button> : <button className='border py-2 px-5 ml-4 rounded-md text-white font-semibold bg-red-600'>Remove From Card</button>
            }
            <NavLink to={`/payments/${id}/${count}`} className='border py-1 lg:py-2 ml-2 lg:ml-4 rounded-md bg-black text-white font-semibold px-3 lg:px-5'>Buy Now</NavLink>
        </div>
    )
}

export default AddToCart
