import React, { useEffect, useState } from 'react';
import Modal from '../Input/Modal';
import InputComponent from '../Input/InputComponent';
import Button from '../Input/Button';
import HotsaleCard from './HotsaleCard';


const Hotsale = () => {
    const [data, setData] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const [value, setValue] = useState({})
    const [image_url, setImage_Url] = useState()

    const fetchCategory = async () => {
        const response = await fetch(`http://localhost:8050/api/get/hotsale`);
        const data = await response.json();
        setData(data.items)
    }

    useEffect(() => {
        fetchCategory();
    }, [])



    const handleCreate = async (image_url) => {
        value.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8050/api/create/carousel', {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(value),
            });

            const data = await response.json();
            alert(data?.message)
            setIsDisable(false);
            setOpenModal(false);
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
        <div className='relative'>
            <div className='absolute top-0 right-0'>
                <button onClick={() => setOpenModal(!openModal)} className={`flex justify-end items-center gap-1 font-semibold border rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 my-2 focus:ring-blue-300  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>Create
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20" /></svg>
                </button>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 bg-gray-100'>
                {
                    data.map(({ id, template_id, product_template }) => {
                        return <HotsaleCard id={id} template_id={template_id} product_template={product_template} />
                    })
                }
            </div>

            <Modal show={openModal} handleClose={() => setOpenModal(false)} size={'500px'} >
                <InputComponent type={'text'} onChange={(e) => { setValue({ ...value, name: e }) }} label={'Carousel item Name'} />
                <input accept="image/*" onChange={(e) => { setImage_Url(e.target.files[0]) }} type='file' />
                <Button onClick={handleUpload} isDisable={isDisable} name={'Create'} />
            </Modal>
        </div>
    );
};

export default Hotsale;