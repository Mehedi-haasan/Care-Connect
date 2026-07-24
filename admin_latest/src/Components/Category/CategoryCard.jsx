import Remove from "../../icons/Remove";
import Edit from "../../icons/Edit";
import Modal from "../Input/Modal";
import DownModal from '../Input/DownModal'
import { useState } from "react";
import InputComponent from "../Input/InputComponent";
import Button from "../Input/Button";
import BaseUrl from "../../Constant";
import logo from '../Logo/photo.png'
import ImageSelect from "../Input/ImageSelect";
import Notification from "../Input/Notification";
import { useNavigate } from "react-router-dom";



const CategoryCard = ({ item, i, isChecked, info = {}, getCategory, TikBox }) => {
    const [show, setShow] = useState(false);
    const [edit, setEdit] = useState(false);
    const [image_url, setImage_Url] = useState();
    const [imageFile, setImageFile] = useState(null);
    const [values, setValues] = useState({ name: item?.name, });
    const [isLoading, setIsLoading] = useState(false)
    const [showlotti, setLottiShow] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const goto = useNavigate()

    const handleUpdate = async (image_url, url, id) => {

        values.image_url = image_url;
        values.url = url;
        values.id = id;
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/category`, {
                method: 'PATCH',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setEdit(false)
            getCategory()
            setLottiShow(false)
            setMessage({ id: Date.now(), mgs: data?.message });
            setIsLoading(false)
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
            const response = await fetch(`${BaseUrl}/api/upload/image`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                },
                body: formData,
            });

            const data = await response.json();
            if (data) {
                handleUpdate(data.image_url, item?.image_url, item?.id);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    }

    const handleDelete = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/delete/category`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(item),
        });
        const data = await response.json();
        setShow(false)
        setIsLoading(false);
        getCategory();
        setMessage({ id: Date.now(), mgs: data?.message });
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };




    return (

        <div key={item.id} className="bg-white rounded-xl shadow flex flex-col hover:shadow-lg transition-shadow duration-200">
            <img
                src={item?.image_url}
                alt={item.name}
                className="h-40 object-cover rounded-t-xl cursor-pointer"
            />
            <div className="p-4 flex-1 flex flex-col">

                <div className="flex justify-between text-xs text-gray-500 mb-3">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <span className="mt-2">Pos: {item.sequence}</span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 mt-auto">
                    <button
                        onClick={() => { setEdit(true); setImageFile(item?.image_url) }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg hover:bg-gray-100"
                    >
                        <Edit /> Edit
                    </button>
                    <button
                        onClick={() => { }}
                        className="flex-1 flex items-center justify-center gap-1 px-3 py-2 border rounded-lg text-red-600 hover:bg-red-50"
                    >
                        <Remove /> Delete
                    </button>
                </div>
            </div>


            <Modal show={edit} handleClose={() => { setEdit(false) }} size={`800px`} className="w-[450px]">
                <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                    <div className="border-b">
                        <h1 className="pl-5 text-xl py-2">Update Category Details</h1>
                    </div>
                    <div className="pt-5">
                        <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                    </div>
                    <div className="px-6 py-4">
                        <InputComponent placeholder={`Enter Category name`} value={values?.name} label={`Category Name`} onChange={(e) => { setValues({ ...values, name: e }) }} handleEnter={() => { handleUpdate(item.image_url, "", item?.id) }} className='lg:text-lg font-thin' />
                        <Button isDisable={isLoading} name="Update" onClick={() => { image_url ? handleUpload() : handleUpdate(item.image_url, "", item?.id) }} className="mt-3 border bg-blue-500 text-white" />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default CategoryCard