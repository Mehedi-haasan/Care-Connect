import React, { useState, useEffect } from 'react'
import ProductCard from './ProductCard';


const Practice = () => {

    const [data, setData] = useState([]);
    const fetchData = async () => {
        const response = await fetch(`http://localhost:8050/api/get/product/templete`)
        const data = await response.json();
        setData(data.items);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className='bg-gray-100 h-screen'>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mx-auto w-full gap-2'>
                {data.map(({ id, category_id, description, image_url, name, price, standerd_price }) => (
                    <div key={id} className="grid duration-300 mx-auto border shadow p-2 w-full px-4 bg-white rounded-lg">
                        <ProductCard id={id} category_id={category_id} description={description} image_url={image_url} name={name} price={price} standerd_price={standerd_price} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Practice
