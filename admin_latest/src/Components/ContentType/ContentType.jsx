import { useState, useEffect, useRef } from "react"
import { useToImage } from '@hcorta/react-to-image'
import BaseUrl from '../../Constant';
import Updown from "../../icons/Updown";
import ShowEntries from "../Input/ShowEntries";
import BrandCard from "./ContentTypeCard";
import Loading from "../../icons/Loading";
import Notification from "../Input/Notification";
import Search from "../Input/Search";
import EscapeRedirect from "../Wholesale/EscapeRedirect";
import { useNavigate } from "react-router-dom";


const ContentType = ({ entries, info = {} }) => {

    const goto = useNavigate()
    const [selectAll, setSelectAll] = useState(false);
    const [preview, setPreview] = useState(false)
    const targetRef = useRef();
    const [inpo, setInpo] = useState(false)
    const option = { width: 950, backgroundColor: '#ffffff' };
    const { ref, getPng } = useToImage(option)
    const [image_url, setImage_Url] = useState();
    const [contentType, setContentType] = useState([])
    const [values, setValues] = useState({ name: "", });
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [totalItem, setTotalItem] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [showlotti, setLottiShow] = useState(false)
    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });

    const handleCreate = async (image_url) => {
        setIsLoading(true)
        values.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${BaseUrl}/api/create/brand`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setShow(false);
            setLottiShow(true)
            GetContentType();
            setValues({ ...values, name: '' })
            setMessage({ id: Date.now(), mgs: data?.message });
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }

    const handleCreateLocally = async (image_url) => {
        if (BaseUrl === "http://localhost:8050") {
            return
        }
        setIsLoading(true)
        values.image_url = image_url;
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:8050/api/create/brand`, {
                method: 'POST',
                headers: {
                    'authorization': token,
                    'Content-type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(values),
            });

            const data = await response.json();
            setShow(false);
            setLottiShow(true)
            GetContentType();
            setValues({ ...values, name: '' })
        } catch (error) {
            console.error('Error updating variant:', error);
        }
        setIsLoading(false)
    }

    const handleUpload = async () => {

        if (!values?.name) {
            setMessage({ id: Date.now(), mgs: "Required field is missing" });
            return
        }
        const formData = new FormData();
        if (image_url) {
            formData.append('image_url', image_url);
        } else {
            setMessage({ id: Date.now(), mgs: "Image file is missing in the payload" });
            setIsLoading(false)
            return;
        }
        setIsLoading(true)
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
                handleCreate(data.image_url);
                handleCreateLocally('')
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        }
        setIsLoading(false)
    }


    const GetContentType = async () => {
        // setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/content/type/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setContentType(data.items)
        setTotalItem(data?.count)
        setIsLoading(false)
    }

    useEffect(() => {
        document.title = `Content Type - Care-Connect`;
        GetContentType()
    }, [page, pageSize]);



    const SearchBrand = async (value) => {
        const name = value
        const token = localStorage.getItem('token')
        if (name !== '') {
            const response = await fetch(`${BaseUrl}/api/get/brand/filter/search/${name}`, {
                method: 'GET',
                headers: {
                    'authorization': token,
                },
            });
            const data = await response.json();
            setContentType(data?.items);
        } else {
            GetContentType()
        }
    }






    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage_Url(file);
            setImageFile(URL.createObjectURL(file));
        }
    };




    EscapeRedirect()


    const TikBox = (id) => {
        setContentType(prev => {
            const newData = prev.map(item => {
                if (item.id === id) {
                    return { ...item, active: !item.active };
                } else {
                    return item;
                }
            });
            const allActive = newData.every(item => item.active === false);
            setSelectAll(allActive)

            return newData;
        });
    };


    const BulkDelete = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/bulk/update/brand`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ data: contentType }),
        });
        const result = await response.json();
        setMessage({ id: Date.now(), mgs: result?.message });
        GetContentType()
    }

    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />

            <div className="flex justify-between items-center px-4 py-2.5 bg-[#FFFFFF] dark:bg-[#040404] dark:text-white rounded shadow">
                <h1 className="font-semibold text-lg">Content Type List</h1>

                <button onClick={() => { goto('/create/content/type') }} className={`bg-blue-500 rounded px-4 py-1.5 font-thin text-white`}>Create Content Type</button>
            </div>
            <div className="bg-[#FFFFFF] dark:bg-[#040404] dark:text-white p-4 shadow rounded-lg mt-2">
                <div className='flex justify-between items-center my-3'>
                    <div className="flex justify-start items-center gap-1.5">
                        <ShowEntries e options={entries} onSelect={(v) => { setPageSize(parseInt(v?.name)) }} />
                    </div>
                    <div className="flex justify-end items-center gap-8">
                        {/* <Excel filename='brand.xlsx' data={bran} handeldelete={() => { BulkDelete() }} onClick={() => setPreview(true)} Jpg={() => setPreview(true)} /> */}
                        <Search SearchProduct={SearchBrand} />
                    </div>
                </div>
                <div>
                    <div className="pt-3 w-full overflow-hidden overflow-x-auto">
                        <table class="min-w-[600px] w-full text-sm text-left rtl:text-right text-gray-500 dark:text-white ">
                            <thead class="text-md text-gray-900 bg-[#BCA88D]">
                                <tr className='border text-black font-bold'>
                                    <th className="w-4 py-2 px-4 border-r">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1"
                                                checked={selectAll}
                                                onChange={(e) => {
                                                    const isChecked = e.target.checked;
                                                    setSelectAll(isChecked);
                                                    setContentType(prev => prev.map(item => ({ ...item, active: !isChecked })));
                                                }}
                                                type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                            <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center font-bold text-[16px]">
                                            Conter type
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 border-r ">
                                        <div className="flex justify-between items-center font-bold text-[16px]">
                                            Code
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r">
                                        <div className="flex justify-between items-center text-[16px]">
                                            Logo
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-center border-r text-[16px]">
                                        <div className="flex justify-between items-center">
                                            Created by
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="px-2 py-2 text-right border-r text-[16px]">
                                        <div className="flex justify-between items-center">
                                            Created at
                                            <Updown />
                                        </div>
                                    </th>
                                    <th scope="col" className="pl-1 pr-1 py-2 text-center text-[16px]">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    contentType?.map((item, i) => (
                                        <BrandCard item={item} i={i} isChecked={!item?.active} TikBox={TikBox} info={info} getBrand={GetContentType} />
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>
                </div>
  
                <div className="flex justify-between items-center pt-3">
                    <h1 className='font-thin text-sm'>Showing {pageSize * parseInt(page - 1) + 1} to {pageSize * (page - 1) + contentType?.length} of {totalItem} entries</h1>
                    <div className='flex justify-start'>
                        <button disabled={page == 1 ? true : false} onClick={() => { page > 2 ? setPage(page - 1) : setPage(1) }} className={`border-y  border-l text-sm ${page === 1 ? 'text-gray-400' : 'text-blue-500'} rounded-l py-1.5 px-3 bg-blue-50`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Prev</p>}
                        </button>
                        <button className="border-y bg-blue-500 text-white py-[7px] px-3 font-thin">{page}</button>
                        <button disabled={totalItem === (pageSize * (page - 1) + contentType?.length) ? true : false} onClick={() => { setPage(page + 1) }} className={`border-y border-r rounded-r py-1.5 px-3 bg-blue-50 ${totalItem === (pageSize * (page - 1) + contentType?.length) ? 'text-gray-400' : 'text-blue-500'} text-sm`}>
                            {isLoading ? <Loading className='h-6 w-7' /> : <p className='font-thin'>Next</p>}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ContentType