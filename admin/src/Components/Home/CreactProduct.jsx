import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button';
import MiniButton from '../Input/MiniButton';
import SelectionComponent from '../Input/SelectionComponent'
import Modal from '../Input/Modal';
import ShowAttribute from './ShowAttribute';


const CreactProduct = () => {

    const [category, setCategory] = useState([])
    const [image_url, setImage_Url] = useState()
    let type = [{ id: 1, name: "Physical" }, { id: 0, name: "Digital" }]
    const [value, setValue] = useState('');
    const [values, setValues] = useState({
        category_id: 1,
        attribute: [],
        product_type: 1,
    })
    const [attr, setAttr] = useState({
        name: "",
        value: []
    })
    const [atrv, setAtrv] = useState('')
    const [show, setShow] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault()
        setValues({
            ...values,
            attribute: [...values.attribute, attr]
        })
        setAttr({
            name: "",
            value: []
        })
        setShow(false);
    }


    const fetchCategory = async () => {
        const response = await fetch(`http://localhost:8050/api/get/category`);
        const data = await response.json()
        setCategory(data?.items)
    }

    useEffect(() => {
        fetchCategory()
    }, [])



    const handleCreate = async (image_url) => {

        values.image_url = image_url;
        values.description = value;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8050/api/create/product', {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            alert(data?.message)
        } catch (error) {
            console.error('Error updating variant:', error);
        }
    }




    const handleUpload = async () => {
        const formData = new FormData();

        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            console.error("Image file is missing in the payload");
            return;
        }

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8050/api/upload/image', {
                method: 'POST',
                headers: {
                    'authorization': token,
                },
                body: formData,
            });

            const data = await response.json();
            if (data) {
                handleCreate(data.image_url)
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }



    return (
        <div className=''>
            <div className=''>
                <h1 className='text-3xl font-semibold text-center py-5'>Product Create</h1>

                <div className='max-w-[600px] mx-auto border border-[#c71f66] rounded-lg p-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>
                        <div className='mt-5 grid col-span-2'>
                            <h1 className='font-semibold py-1'>Select your Product image/Picture</h1>
                            <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                        </div>
                        <InputComponent onChange={(e) => setValues({ ...values, name: e })} label={"Product Name"} placeholder={"Product Name"} type={""} isRequered={""} />
                        <SelectionComponent options={type} onSelect={(e) => setValues({ ...values, product_type: e })} label={"Product Type"} />
                        <InputComponent onChange={(e) => setValues({ ...values, price: e })} label={"Price"} placeholder={"Price"} type={"number"} isRequered={""} />
                        <InputComponent onChange={(e) => setValues({ ...values, standerd_price: e })} label={"Standrard Price"} placeholder={"Standrard Price"} type={"number"} isRequered={""} />
                        <SelectionComponent options={category} onSelect={(e) => setValues({ ...values, category_id: e })} label={"Category"} />
                        <div>
                            <ShowAttribute values={values.attribute}/>
                            <div className={`${values.attribute.length > 0 ? '':'mt-[22px]'}`}>
                            <Button onClick={() => { setShow(!show) }} isDisable={false} name={values.attribute.length > 0 ? "Add More Attribute" : "Add Attribute"} />
                            </div>
                        </div>
                        <div className='my-2 grid col-span-2'>
                            <h1 className='font-semibold py-1'>Description</h1>
                            <ReactQuill theme="snow" value={value} onChange={setValue} />
                        </div>
                    </div>
                    <div className=''>
                        <Button onClick={handleUpload} isDisable={false} name={"Create"} />
                    </div>



                    


                    <Modal size={"500px"} show={show} handleClose={() => { setShow(false) }} className='w-[450px]'>
                        <div className={`pb-5 ${attr.value.length > 0 ? "block" : "hidden"}`}>
                            <h1 className='text-start'>Attribute Name : {attr.name}</h1>
                            <div className='flex gap-2'>
                                <h1>Attribute Value : </h1>
                                {
                                    attr.value.map((a) => {
                                        return <MiniButton name={a} />
                                    })
                                }
                            </div>
                        </div>
                        <InputComponent onChange={(e) => setAttr({ ...attr, name: e })} valuee={attr.name} label={"Attribute Name"} placeholder={""} type={""} isRequered={""} />
                        <InputComponent onChange={(e) => setAtrv(e)} label={"Attribute Value"} valuee={atrv} placeholder={""} type={""} isRequered={""} />
                        <div className='flex justify-between'>
                            <Button onClick={() => { setAttr({ ...attr, value: [...attr.value, atrv] }); setAtrv('') }} isDisable={false} name={"Add"} />
                            <Button onClick={handleSubmit} isDisable={false} name={"Done"} />
                        </div>
                    </Modal>




                </div>
            </div>
        </div>
    );
};

export default CreactProduct;