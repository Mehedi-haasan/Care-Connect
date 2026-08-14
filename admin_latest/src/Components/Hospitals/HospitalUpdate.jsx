import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Button from '../Input/Button';
import SelectionComponent from '../Input/SelectionComponent'
import BaseUrl from '../../Constant';
import Notification from '../Input/Notification';
import { useNavigate, useParams } from 'react-router-dom';
import Add from '../../icons/Add';
import logo from '../Logo/photo.png'
import ImageSelect from '../Input/ImageSelect'
import EscapeRedirect from '../Wholesale/EscapeRedirect';
import InputComponent from '../Input/InputComponent'



const UpdateHospital = () => {
    const goto = useNavigate()
    const params = useParams()
    const input_name = useRef(null);
    const [filter, setFilter] = useState({
        editor_value: "Select a filter",
        bran_value: 'Select a filter',
        cate_value: 'Select a filter',
        sup_value: 'Select a filter',
    })
    const desc = useRef(null)

    useEffect(() => {
        input_name.current?.focus();
    }, []);


    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [creator, setCreator] = useState(false)
    const [first, setFirst] = useState(false)
    const [second, setSecond] = useState(false)
    const [third, setThird] = useState(false)
    const [docts, setDocts] = useState([]);
    const [division, setDivision] = useState([]);
    const [district, setDistrict] = useState([])
    const [users, setUsers] = useState([])
    const [upazila, setUpazila] = useState([])
    const [hospital, setHospital] = useState({})


    const [image_url, setImage_Url] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [active, setActive] = useState("Pricing")

    const [values, setValues] = useState({
        category_id: 1,
        sub_cate_id: 1,
        name: '',
        title: '',
        description: '',
        image_url: "",
        price: 0,
        standard_price: 1,
        sku: 1,
        type_id: 1,
        creator_id: 1,

    })


    EscapeRedirect("/items")

    const GetSingleHospital = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/single/hospital/${params?.id}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setValues(data?.items)
        setUsers(data?.items?.allDoctors)
        setFilter({
            ...filter,
            bran_value: data?.items?.division?.name,
            cate_value: data?.items?.district?.name,
            sup_value: data?.items?.upazila?.name,
            editor_value: data?.items?.creator?.name,
        })

    }

    const GetCommonData = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/common/state`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setDivision(data?.divitions);
        setDistrict(data?.districts);
        setUpazila(data?.upazilas)
    }




    useEffect(() => {
        document.title = "Items - Care-Connect";
        GetCommonData()
        GetSingleHospital()
    }, []);



    const HandleUpdate = async (image_url) => {
        values.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/update/hospital`, {
                method: 'PATCH',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            setMessage({ id: Date.now(), mgs: data?.message });
            goto('/hospitals')
        } catch (error) {
            console.error('Error updating variant:', error);
        }

    }


    const handleUpload = async () => {
        setIsLoading(true)

        const formData = new FormData();
        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            setMessage({ id: Date.now(), mgs: "Image file is missing in the payload" });
            setIsLoading(false)
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
                HandleUpdate(data.image_url);
            }
            setIsLoading(false)
        } catch (error) {
            console.error('Error uploading image:', error);
            setIsLoading(false)
        }
        setIsLoading(false)
    }


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };


    return (
        <div className='min-h-screen pb-12 py-5 px-3 relative'>

            <div className='shadow-lg bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded-xl'>
                <div className='border-b px-5 flex justify-between items-center'>
                    <h1 className='text-2xl font-semibold  py-5'>Hospita Details</h1>
                    <Notification message={message} />
                </div>

                <div className='w-full mx-auto rounded-lg p-5'>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pb-14'>

                        <div>
                            <div className='flex justify-start items-center w-full z-50'>
                                <div className='w-full'>
                                    <h1 className='text-[15px] pb-1.5'>Hospital Name</h1>
                                    <input
                                        type="text"
                                        ref={input_name}
                                        value={values?.name}
                                        placeholder="Enter item name"
                                        onChange={(e) => setValues({ ...values, name: e.target.value })}
                                        className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded-l font-thin border w-full dark:bg-[#040404] dark:text-white"

                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                setFirst(true);
                                            } else if (e.key === "Escape") { }
                                        }}
                                    />

                                </div>
                            </div>
                        </div>
                        <InputComponent label='Phone' placeholder={'Enter hospital phone'} value={values?.phone} onChange={(v) => { setValues({ ...values, phone: v }) }} />
                        <InputComponent label='Email' placeholder={'Enter hospital email'} value={values?.email} onChange={(v) => { setValues({ ...values, email: v }) }} />
                        <div className='flex justify-start items-end pb-1 z-50'>
                            <SelectionComponent options={division} default_select={first} default_value={filter?.bran_value}
                                onSelect={(v) => {
                                    setFirst(false); setSecond(true); setValues({ ...values, division_id: v?.id });
                                    setFilter({ ...filter, bran_value: v?.name })
                                }}
                                label={"Division"} className='rounded-l' />
                            <div onClick={() => goto(`/create/brand`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>

                        <div className='flex justify-start items-end pb-1 '>
                            <SelectionComponent options={district} default_select={second} default_value={filter?.cate_value}
                                onSelect={(v) => {
                                    setSecond(false); setThird(true); setValues({ ...values, district_id: v?.id });
                                    setFilter({ ...filter, cate_value: v?.name })
                                }} label={"District"} className='rounded-l' />
                            <div onClick={() => goto(`/create/category`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>


                        <div className='flex justify-start items-end pb-1 z-40'>
                            <SelectionComponent options={upazila} default_select={third} default_value={filter?.sup_value}
                                onSelect={(v) => { desc.current?.focus(); setValues({ ...values, upazila_id: v?.id }); setFilter({ ...filter, sup_value: v?.name }) }}
                                label={"Upazila"} className='rounded-l' />
                            <div onClick={() => goto(`/create/supplier`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE] '>
                                <Add />
                            </div>
                        </div>
                        <div className='my-2 grid col-span-1 pb-2'>
                            <div>
                                <h1 className="py-1">Address</h1>
                                <textarea placeholder="Enter your address" ref={desc} value={values?.address}
                                    onChange={(e) => { setValues({ ...values, address: e?.target?.value }) }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            setCreator(true)
                                        }
                                    }}
                                    className="font-thin focus:outline-none border p-1.5 w-full rounded dark:bg-[#040404] dark:text-white" />

                            </div>
                        </div>

                        <div className='pt-1'>
                            <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={logo} />
                            {/* <div className="p-3">
                                <div className="flex justify-start items-end">
                                    <button onClick={() => { setActive("Pricing") }} className={`${active === "Pricing" ? "border-x border-t border-green-500 text-green-500" : "border-b text-blue-500"} px-4 py-1.5 rounded-t flex justify-start items-start font-thin`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className='mt-0.5 mr-1' width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4c4.411 0 8 3.589 8 8s-3.589 8-8 8s-8-3.589-8-8s3.589-8 8-8m0-2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m5 9h-4V7h-2v4H7v2h4v4h2v-4h4z" /></svg>
                                        Doctors
                                    </button>
                                    <button onClick={() => { setActive("Image") }} className={`${active === "Image" ? "border-x border-t border-green-500 text-green-600" : "border-b text-blue-500"} px-4 py-1.5 rounded-t flex justify-start items-center gap-1 font-thin`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4z" /><path fill="currentColor" d="m8 11l-3 4h11l-4-6l-3 4z" /><path fill="currentColor" d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" /></svg>
                                        Image</button>
                                    <div className="border-b w-full"></div>
                                </div>
                            </div>

                            <div className='h-[120px]'>
                                {active === "Pricing" && <div className="px-3 pt-3 grid grid-cols-1">
                                    <div className='flex justify-start items-center gap-3'>
                                        {values?.doctors?.map((item) => {
                                            return <p>{item?.name}</p>
                                        })}
                                    </div>
                                    <div className='flex justify-start items-end pb-1'>
                                        <SelectionComponent options={users} default_select={creator} default_value={filter?.editor_value}
                                            onSelect={(v) => {
                                                setCreator(false); setValues({ ...values, creator_id: v?.id });
                                                setFilter({ ...filter, editor_value: v?.name });
                                                if (v?.name) {
                                                    setDocts(prev => prev.includes(v.name) ? prev : [...prev, v.name]);
                                                }
                                                setValues({
                                                    ...values,
                                                    doctor_ids: values?.doctor_ids?.includes(v.id)
                                                        ? values?.doctor_ids
                                                        : [...values?.doctor_ids, v.id],
                                                });
                                            }} label={""} className='rounded-l' />
                                        <div onClick={() => goto(`/create/category`)} className='border-y border-r px-3 pt-[7px] pb-[6px] rounded-r cursor-pointer text-[#3C96EE]'>
                                            <Add />
                                        </div>
                                    </div>
                                </div>}

                                {active === "Image" && <div className=" grid grid-cols-1 gap-4">
                                    <ImageSelect handleImageChange={handleImageChange} imageFile={imageFile} logo={values?.image_url ? values?.image_url : logo} />
                                </div>}

                            </div> */}
                        </div>

                    </div>
                    <div className='flex justify-start items-center gap-2'>
                        <Button onClick={() => { image_url == null ? HandleUpdate('') : handleUpload() }} isDisable={isLoading} name={isLoading ? 'Updateing' : 'Update'} />
                        <button onClick={() => { goto('/') }} className='bg-gray-100 dark:text-black rounded-md px-5 py-2 font-thin hover:bg-gray-300'>Close</button>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default UpdateHospital;