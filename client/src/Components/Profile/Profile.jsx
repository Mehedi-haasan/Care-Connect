import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PersonalInformation from './PersonalInformation';
import ProfessionalInformation from './ProfessionalInformation';
import ChamberDetails from './ChamberDetails';
import ConsultationPayment from './ConsultationPayment';
import BASE_URL from '../URL/baseurl';

const Profile = () => {
    const [user, setUser] = useState({});
    const [info, setInfo] = useState(false)
    const [selected, setSelected] = useState('Personal')
    const [hospital, setHospital] = useState([])
    const [exactUser, setExactUser] = useState({})
    const [adress, setAddress] = useState({
        address_type_value: 'Select a filter',
        division_value: 'Select a filter',
        distric_value: 'Select a filter',
        upazila_value: 'Select a filter',
    })

    const params = useParams()

    const GetUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/get/single/users/${params?.id}`, {
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


    const GetHospita = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/get/just/hospital`, {
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
        GetHospita()
    }, [])



    const UpdateUser = async () => {
        adress['user_id'] = params?.id
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/update/single/user`, {
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



    return (
        <div className='pb-12 dark:bg-[#040404] dark:text-white min-h-screen px-3 py-5'>

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
                    {["Personal", "Professional", "Chamber", "Schedule", "Fees", "Media"]?.map((item) => (
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