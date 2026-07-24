import { useState, useEffect, useRef } from "react"
import BaseUrl from '../../Constant';
import Button from "../Input/Button";
import Notification from "../Input/Notification";

import SelectionComponent from "../Input/SelectionComponent";
import { useNavigate } from "react-router-dom";


const CreateUpazila = () => {


    const [values, setValues] = useState({ name: "", });
    const [isLoading, setIsLoading] = useState(false)
    const [districts, setDistricts] = useState([])
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const input_name = useRef()
    const [first, setFirst] = useState({
        first: true,
        value: 'Select a filter'
    })
    const goto = useNavigate()

    const handleCreate = async () => {
        setIsLoading(true)
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/upazila`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setValues({ ...values, name: '' })
            setMessage({ id: Date.now(), mgs: data?.message });
            goto('/division')
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }




    const GetDistricts = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/just/districts`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setDistricts(data.items)
    }

    useEffect(() => {
        document.title = `Attributes - Care-Connect`;
        GetDistricts()
    }, []);




    return (
        <div className="px-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <div className="pt-1 bg-[#FFFFFF] rounded-lg w-full">
                <div className="border-b">
                    <h1 className="pl-5 text-xl py-2">Upazila Details</h1>
                </div>
                <div className="px-6 py-4">
                    <SelectionComponent options={districts} default_select={first?.first} default_value={first?.value}
                        onSelect={(v) => {
                            setValues({
                                ...values,
                                district_id: v?.id,
                                type: v?.name,
                            })
                            input_name.current.focus()
                            setFirst({ ...first, value: v?.name })
                        }} label={"Districts"} className='rounded-r' />
                    <div className='w-full pt-1'>
                        <h1 className='text-[15px] pb-1.5'>Name</h1>
                        <input
                            type="text"
                            ref={input_name}
                            value={values?.name}
                            placeholder="Enter name"
                            onChange={(e) => setValues({ ...values, name: e.target.value })}
                            className="px-2 pt-[7px] pb-[6px] text-[#6B7280] focus:outline-none rounded font-thin border w-full dark:bg-[#040404] dark:text-white"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleCreate();
                                }
                            }}
                        />
                    </div>
                    <Button isDisable={isLoading} name="Create" onClick={() => { handleCreate(); }} className="mt-3 border bg-blue-500 text-white font-thin text-lg" />
                </div>
            </div>
        </div>
    )
}

export default CreateUpazila