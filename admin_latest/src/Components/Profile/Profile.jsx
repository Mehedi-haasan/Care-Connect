import React, { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import EscapeRedirect from '../Wholesale/EscapeRedirect';
import Notification from "../Input/Notification";
import { useParams } from 'react-router-dom';
import Edit from './Edit';
import Add from '../../icons/Add';
import InputComponent from '../Input/InputComponent';
import SelectionComponent from '../Input/SelectionComponent';
import PersonalInformation from './PersonalInformation';
import ProfessionalInformation from './ProfessionalInformation';
import ChamberDetails from './ChamberDetails';
import ConsultationPayment from './ConsultationPayment';

const Profile = () => {
    const [user, setUser] = useState({});
    const [info, setInfo] = useState(false)
    const [selected, setSelected] = useState('Personal')
    const [hospital, setHospital] = useState([])
    const [exactUser, setExactUser] = useState({})
    const [division, setDivision] = useState([])
    const [districs, setDistrics] = useState([])
    const [upazila, setUpazila] = useState([])
    const [adress, setAddress] = useState({
        address_type_value: 'Select a filter',
        division_value: 'Select a filter',
        distric_value: 'Select a filter',
        upazila_value: 'Select a filter',
    })
    const [addAddress, setAddAddress] = useState(false)
    const [message, setMessage] = useState({ id: '', mgs: '' });
    const params = useParams()

    const GetUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/single/users/${params?.id}`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json()
        setUser(data?.items || {})
        setExactUser(data?.exactUser)
    }
    const GetCommonState = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/common/state`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json()
        setDivision(data?.divitions)
        setDistrics(data?.districts)
        setUpazila(data?.upazilas)
    }

    const GetHospita = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/just/hospital`, {
            method: 'GET',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            }
        });
        const data = await response.json()
        setHospital(data?.items || [])
    }


    useEffect(() => {
        document.title = `Profile - Care-Connect`;
        GetUser()
        GetCommonState()
        GetHospita()
    }, [])



    const UpdateUser = async () => {
        adress['user_id'] = params?.id
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/update/single/user`, {
            method: 'PATCH',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ user: exactUser })
        });
        const data = await response.json()
        setUser(data?.items || {})
    }


    const handleChange = (key, value) => {
        setExactUser((prev) => ({
            ...prev,
            [key]: value,
        }));
    };


    EscapeRedirect()

    return (
        <div className='pb-12 dark:bg-[#040404] dark:text-white min-h-screen px-3 py-5'>
            <Notification message={message} />

            <div className='shadow bg-[#FFFFFF]'>
                <div className='flex flex-col justify-center items-center gap-5 p-5'>
                    <div className='border h-[120px] w-[120px] flex justify-center items-center rounded-full'>
                        <img src={user?.image_url ? user?.image_url : `https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt='fjgkfd' className='h-[100px] w-[100px] rounded-full' />
                    </div>
                    <div>
                        <div className='flex justyfy-start items-center gap-1'>
                            <h1>{user?.name}</h1>
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-[#3B82F6]" width="1.5em" height="1.5em" viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path fill="currentColor" fill-rule="evenodd" d="M15.418 5.643a1.25 1.25 0 0 0-1.34-.555l-1.798.413a1.25 1.25 0 0 1-.56 0l-1.798-.413a1.25 1.25 0 0 0-1.34.555l-.98 1.564c-.1.16-.235.295-.395.396l-1.564.98a1.25 1.25 0 0 0-.555 1.338l.413 1.8a1.25 1.25 0 0 1 0 .559l-.413 1.799a1.25 1.25 0 0 0 .555 1.339l1.564.98c.16.1.295.235.396.395l.98 1.564c.282.451.82.674 1.339.555l1.798-.413a1.25 1.25 0 0 1 .56 0l1.799.413a1.25 1.25 0 0 0 1.339-.555l.98-1.564c.1-.16.235-.295.395-.395l1.565-.98a1.25 1.25 0 0 0 .554-1.34L18.5 12.28a1.25 1.25 0 0 1 0-.56l.413-1.799a1.25 1.25 0 0 0-.554-1.339l-1.565-.98a1.25 1.25 0 0 1-.395-.395zm-.503 4.127a.5.5 0 0 0-.86-.509l-2.615 4.426l-1.579-1.512a.5.5 0 1 0-.691.722l2.034 1.949a.5.5 0 0 0 .776-.107z" clip-rule="evenodd" />
                            </svg>
                        </div>

                        <span className='text-sm'>
                            <div>
                                <input value={user?.designation} onChange={(e) => { setExactUser({ ...exactUser, designation: e.target.value }) }}
                                    readOnly={!info}
                                    className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
                            </div>

                        </span>
                    </div>
                </div>

                <div className="mb-3 flex h-10 items-center justify-between  bg-gray-100 px-3 mx-auto">
                    {["Personal", "Professional", "Chamber", "Schedule", "Fees", "Media"].map((item) => (
                        <button key={item} onClick={() => setSelected(item)} className={`px-3 py-2 text-[11px] font-medium transition ${item === selected ? "text-blue-700" : "text-gray-600 hover:text-blue-700"}`}                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>


            <div>
                {selected === 'Personal' && <PersonalInformation onClick={UpdateUser} user={exactUser} handleChange={handleChange} />}
                {selected === 'Professional' && <ProfessionalInformation onClick={UpdateUser} user={user} exactUser={exactUser} handleChange={handleChange} hospital={hospital} />}
                {selected === 'Chamber' && <ChamberDetails onClick={UpdateUser} user={user} exactUser={exactUser} handleChange={handleChange} hospital={hospital} />}
                {selected === 'Schedule' && <ProfessionalInformation onClick={UpdateUser} />}
                {selected === 'Fees' && <ConsultationPayment onClick={UpdateUser} />}
                {selected === 'Media' && <ProfessionalInformation onClick={UpdateUser} />}
            </div>






        </div>
    );
};

export default Profile;



// <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3 py-5'>
// <div className='grid col-span-1 shadow bg-[#FFFFFF] rounded'>
//     <div className='flex justify-start items-center gap-5 p-5'>
//         <div className='border h-[120px] w-[120px] flex justify-center items-center rounded-full'>
//             <img src={user?.image_url ? user?.image_url : `https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt='fjgkfd' className='h-[100px] w-[100px] rounded-full' />
//         </div>
//         <div>
//             <div className='flex justyfy-start items-center gap-1'>
//                 <h1>{user?.name}</h1>
//                 <svg xmlns="http://www.w3.org/2000/svg" className="text-[#3B82F6]" width="1.5em" height="1.5em" viewBox="0 0 24 24">
//                     <path d="M0 0h24v24H0z" fill="none" />
//                     <path fill="currentColor" fill-rule="evenodd" d="M15.418 5.643a1.25 1.25 0 0 0-1.34-.555l-1.798.413a1.25 1.25 0 0 1-.56 0l-1.798-.413a1.25 1.25 0 0 0-1.34.555l-.98 1.564c-.1.16-.235.295-.395.396l-1.564.98a1.25 1.25 0 0 0-.555 1.338l.413 1.8a1.25 1.25 0 0 1 0 .559l-.413 1.799a1.25 1.25 0 0 0 .555 1.339l1.564.98c.16.1.295.235.396.395l.98 1.564c.282.451.82.674 1.339.555l1.798-.413a1.25 1.25 0 0 1 .56 0l1.799.413a1.25 1.25 0 0 0 1.339-.555l.98-1.564c.1-.16.235-.295.395-.395l1.565-.98a1.25 1.25 0 0 0 .554-1.34L18.5 12.28a1.25 1.25 0 0 1 0-.56l.413-1.799a1.25 1.25 0 0 0-.554-1.339l-1.565-.98a1.25 1.25 0 0 1-.395-.395zm-.503 4.127a.5.5 0 0 0-.86-.509l-2.615 4.426l-1.579-1.512a.5.5 0 1 0-.691.722l2.034 1.949a.5.5 0 0 0 .776-.107z" clip-rule="evenodd" />
//                 </svg>
//             </div>

//             <span className='text-sm'>
//                 <div>
//                     <input value={user?.designation} onChange={(e) => { setExactUser({ ...exactUser, designation: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//                 <button onClick={UpdateUser}>Save</button>
//             </span>
//         </div>
//     </div>
// </div>

// <div className='grid col-span-1 lg:col-span-2 '>
//     <div className='grid grid-cols-2 gap-5 '>
//         <div className='grid col-span-1 p-5 bg-[#FFFFFF] rounded border shadow'>
//             <div className='flex justify-between items-start'>
//                 <div className='w-[50%]'>Experience Info</div>
//                 <Edit />
//             </div>
//             <div className='flex py-2 justify-between'>
//                 <div className='w-[50%]'>Stuff ID</div>
//                 <div>
//                     <input value={user?.reg_number} onChange={(e) => { setExactUser({ ...exactUser, reg_number: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//             </div>
//             <div className='flex py-2 justify-between'>
//                 <div className='w-[50%]'>Email</div>
//                 <div>
//                     <input value={user?.email} onChange={(e) => { setExactUser({ ...exactUser, email: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//             </div>
//             <div className='flex py-2 justify-between'>
//                 <div className='w-[50%]'>Date Of Birth</div>
//                 <div>
//                     <input value={user?.date_of_birth} onChange={(e) => { setExactUser({ ...exactUser, date_of_birth: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//             </div>

//         </div>

//         <div className='grid col-span-1 p-5 bg-[#FFFFFF] rounded border shadow'>
//             <div className='flex justify-between items-start'>
//                 <div className='w-[50%]'>{user?.name}</div>
//                 <Edit onClick={() => { setInfo(!info) }} />
//             </div>
//             <div className='flex py-2 justify-between'>
//                 <div className='w-[50%]'>Stuff ID</div>
//                 <div>
//                     <input value={user?.barcode} onChange={(e) => { setExactUser({ ...exactUser, barcode: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//             </div>
//             <div className='flex py-2 justify-between'>
//                 <div className='w-[50%]'>Email</div>
//                 <div>
//                     <input value={user?.email} onChange={(e) => { setExactUser({ ...exactUser, email: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//             </div>
//             <div className='flex py-2 justify-between'>
//                 <div className='w-[50%]'>Date Of Birth</div>
//                 <div>
//                     <input value={user?.date_of_birth} type='date' onChange={(e) => { setExactUser({ ...exactUser, date_of_birth: e.target.value }) }}
//                         readOnly={!info}
//                         className={`focus:outline-none ${info ? 'border rounded p-1.5' : ''}`} />
//                 </div>
//             </div>
//             <div className='flex justify-between'>
//                 <div className='w-[50%]'>Current roles</div>
//                 <div className='flex justify-between gap-2'>
//                     {user?.roles?.map((role) => {
//                         return <span>{role?.name}</span>
//                     })}
//                 </div>
//             </div>

//         </div>
//     </div>
// </div>
// </div>



// <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 px-3'>
// <div className='grid col-span-1 shadow bg-[#FFFFFF] rounded p-5'>
//     <div className='flex justify-between items-start gap-5 pb-5'>
//         <h1>General Information</h1>
//         <Edit />
//     </div>

//     <div className='flex justify-between items-start py-2'>
//         <h1>Gender</h1>
//         <h1>Male</h1>
//     </div>

//     <div className='flex justify-between items-start py-2'>
//         <h1>Phone</h1>
//         <h1>{user?.phone}</h1>
//     </div>

//     <div className='flex justify-between items-start py-2'>
//         <h1>Personal Email</h1>
//         <span>{user?.personal_email}</span>
//     </div>
//     <div className='flex justify-between items-start py-2'>
//         <h1>Department</h1>
//         <h1>{user?.department}</h1>
//     </div>
//     <div className='flex justify-between items-start py-2'>
//         <h1>User Type</h1>
//         <span>{user?.user_type}</span>
//     </div>
// </div>

// <div className='grid col-span-1 lg:col-span-2 '>

//     <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 bg-[#FFFFFF] rounded border shadow'>
//         <div className='grid col-span-2'>
//             <div className='flex justify-between items-start'>
//                 <h1>Educational Information</h1>
//                 <Add onClick={() => setAddDegree(!addDegree)} />
//             </div>
//         </div>

//         {addDegree && <div className='grid col-span-2'>
//             <div className='flex justify-between items-center'>
//                 <InputComponent label={'Degree Name'} onChange={(v) => { setDegree({ ...degree, name: v }) }} />
//                 <InputComponent label={'Major'} onChange={(v) => { setDegree({ ...degree, major: v }) }} />
//                 <InputComponent label={'Institution Name'} onChange={(v) => { setDegree({ ...degree, institute: v }) }} />
//                 <InputComponent label={'Passing Year'} onChange={(v) => { setDegree({ ...degree, year: v }) }} />
//                 <button onClick={CreateDegree} className='border rounded py-1.5 px-2.5 mt-6'>Save</button>
//             </div>
//         </div>}

//         {user?.degrees?.map((degree) => {
//             return <div className='grid col-span-2'>
//                 <h1>{degree?.name} in {degree?.major}</h1>
//                 <div className='flex justify-between items-start'>
//                     <p className='text-xs'>{degree?.institute}, {degree?.year}</p>
//                     <Edit />
//                 </div>
//             </div>
//         })}


//     </div>

    // <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 p-5 bg-[#FFFFFF] rounded border shadow mt-5'>
    //     <div className='grid col-span-2'>
    //         <div className='flex justify-between items-start'>
    //             <h1>Address Information</h1>
    //             <Add onClick={() => setAddAddress(!addAddress)} />
    //         </div>
    //     </div>

    //     {addAddress && <div className='grid col-span-2'>
    //         <div className='flex justify-between items-center'>
    //             <div className='w-[180px]'>
    //                 <SelectionComponent options={[{ id: 1, name: 'Parmanent' }]} default_value={adress?.address_type_value}
    //                     onSelect={(v) => { setAddress({ ...adress, address_type: v?.name, address_type_value: v?.name }) }} label={'Address Type'} />
    //             </div>
    //             <InputComponent label={'Name'} onChange={(v) => setAddress({ ...adress, name: v })} />
    //             <div className='w-[200px]'>
    //                 <SelectionComponent options={division} default_value={adress?.division_value}
    //                     onSelect={(v) => { setAddress({ ...adress, division_id: v?.id, division_value: v?.name }) }} label={'Division'} />
    //             </div>
    //             <div className='w-[200px]'>
    //                 <SelectionComponent options={districs} default_value={adress?.distric_value}
    //                     onSelect={(v) => { setAddress({ ...adress, district_id: v?.id, distric_value: v?.name }) }} label={'District'} />
    //             </div>
    //             <div className='w-[200px]'>
    //                 <SelectionComponent options={upazila} default_value={adress?.upazila_value}
    //                     onSelect={(v) => { setAddress({ ...adress, upazila_id: v?.id, upazila_value: v?.name }) }} label={'Upazila'} />
    //             </div>
    //             <button onClick={CreateAddress} className='border rounded py-1.5 px-2.5 mt-6'>Save</button>
    //         </div>
    //     </div>}


    //     {user?.address?.map((add) => {
    //         return <div className='grid col-span-2'>
    //             <h1>{add?.address_type} Address</h1>
    //             <div className='flex justify-between items-start'>
    //                 <h1 className='text-xs'>{add?.name}, {add?.upazila?.name} {add?.district?.name}, {add?.division?.name}</h1>
    //                 <Edit />
    //             </div>
    //         </div>
    //     })}

    // </div>
// </div>
// </div>