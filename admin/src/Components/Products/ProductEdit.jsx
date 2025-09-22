import React, { useEffect, useState } from 'react';
import InputComponent from '../Input/InputComponent';
import { useParams } from 'react-router-dom';
import Button from '../Input/Button';


const ProductEdit = () => {
    const params = useParams();
    const [value, setValue] = useState({})

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:8050/api/get/single/product/variant/${params.id}`);
            const data = await response.json();
            setValue(data.items[0])
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleUpdate = async () => {
        console.log(value);

        const token = localStorage.getItem('token');

        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('standard_price', value.standard_price);
        formData.append('price', value.price);
        formData.append('id', value.id);
        formData.append('description', value.description);
        formData.append('category_id', value.category_id);
        formData.append('template_id', value.template_id);

        if (value.image_url) {
            formData.append('image_url', value.image_url); 
        } else {
            console.error("Image file is missing in the payload");
        }

        try {
            const response = await fetch('http://localhost:8050/api/update/variant', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // Only set Authorization header, if needed
                    // 'Content-Type' is automatically set by the browser when using FormData
                },
                body: formData, // Send the formData object directly as the body
            });

            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    };



    return (
        <div>
            <img src={value.image_url} className='h-48 w-72 rounded mx-auto' alt='nothing' />
            <input accept="image/*" onChange={(e) => { setValue({ ...value, image_url: e.target.files[0] }) }} type='file' />
            <InputComponent onChange={(e) => setValue({ ...value, name: e })} label={"Product Name"} placeholder={value.name} type={""} isRequered={""} />
            <InputComponent onChange={(e) => setValue({ ...value, price: e })} label={"Product Price"} placeholder={value.price} type={""} isRequered={""} />
            <InputComponent onChange={(e) => setValue({ ...value, standard_price: e })} label={"Standard Price"} placeholder={value.standard_price} type={""} isRequered={""} />
            <InputComponent onChange={(e) => setValue({ ...value, description: e })} label={"Product Description"} placeholder={value.description} type={""} isRequered={""} />
            <Button onClick={handleUpdate} name={"Update"} />
        </div>
    );
};

export default ProductEdit;