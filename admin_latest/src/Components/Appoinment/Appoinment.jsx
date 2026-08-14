import { useState, useEffect } from "react"
import BaseUrl from '../../Constant';
import Notification from "../Input/Notification";
import DoctorProfile from "./DoctorProfile";
import { NavLink, useParams } from "react-router-dom";
import InputComponent from '../Input/InputComponent'
import Calendar from "../Wholesale/Calender";
import SelectionComponent from '../Input/SelectionComponent'


const Appoinment = () => {

    const params = useParams()
    const [doctor, setDoctor] = useState({})
    const today = new Date();
    const [values, setValues] = useState({
        is_emergency: false,
        new_patient: true,
        name: '',
        appoinment_date: '',
        appoinment_time: null,
        consultation_type: 'in_person',
        status: 'draft',
    })

    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [selected, setSelected] = useState("self");

    const GetDoctor = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/single/doctor/${params?.doctor_id}/${params?.hospital_id}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setDoctor(data.items)
    }


    useEffect(() => {
        document.title = `Appoinment - Care-Connect`;
        GetDoctor()
    }, []);


    const [raw, setRaw] = useState({
        fromDate: today.toISOString(),
        toDate: today.toISOString(),
        gender: 'আপনার লিঙ্গ নির্বাচন করুন'
    });

    const handleDateConvert = (date) => {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formatted
    };

    const handleEnter = () => { }

    const HandleSubmit = () => {
        values['doctor_id'] = params?.doctor_id
        values['hospital_id'] = params?.hospital_id
        console.log(values)
        setMessage({
            ...message,
            id: Date.now(),
            mgs: 'Your Appoinment booked Succesffully',
        })
    }

    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-16 bg-white">
            <Notification message={message} />
            <DoctorProfile doctor={doctor} HandleSubmit={HandleSubmit} />

            <div className="text-center">
                {/* Heading */}
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    আপনি কি নিজের জন্য অ্যাপয়েন্টমেন্ট নিচ্ছেন?
                </h2>

                {/* Toggle Buttons */}
                <div className="inline-flex rounded overflow-hidden py-4">
                    <button onClick={() => setSelected("self")}
                        className={`px-10 py-3 text-sm font-medium transition-all ${selected === "self" ? "bg-purple-700 text-white" : "bg-[#F7F5EE] text-gray-700"}`}>
                        নিজের জন্য
                    </button>

                    <button
                        onClick={() => setSelected("other")}
                        className={`px-10 py-3 text-sm font-medium transition-all ${selected === "other" ? "bg-purple-700 text-white" : "bg-[#F7F5EE] text-gray-700"}`}>
                        অন্যের জন্য
                    </button>
                </div>

                {/* Links */}
                <div className={`my-6 flex justify-center items-center gap-3 text-sm ${today ? 'hidden' : ''}`}>
                    <NavLink to={'/'} className="text-indigo-700 hover:underline font-medium" >
                        ইতিমধ্যে অ্যাকাউন্ট আছে
                    </NavLink>

                    <span className="text-gray-400">|</span>

                    <NavLink to={'/'} className="text-indigo-700 hover:underline font-medium" >
                        সাইনআপ করুন
                    </NavLink>
                </div>

                {/* Bottom Text */}
                <p className="text-lg text-gray-800">
                    অ্যাপয়েন্টমেন্ট সম্পর্কিত তথ্য প্রদান করুন
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5 px-10 pt-5">
                <InputComponent placeholder={'আপনার পূর্ণ নাম লিখুন'} onChange={(v) => setValues({ ...values, name: v })} value={values?.name} handleEnter={handleEnter} />
                <InputComponent placeholder={'পূর্বের রোগ ইতিহাস (যেমন ডায়াবেটিস, উচ্চ রক্তচাপ ইত্যাদি)'}
                    onChange={(v) => setValues({ ...values, prev_history: v })} value={values?.prev_history} handleEnter={handleEnter} />

                <InputComponent placeholder={'আপনার বয়স উল্লেখ করুন'} handleEnter={handleEnter} onChange={(v) => setValues({ ...values, patient_age: v })} value={values?.patient_age} />
                <InputComponent placeholder={'বর্তমান ব্যবহৃত ওষুধ (যদি থাকে)'} handleEnter={handleEnter} onChange={(v) => setValues({ ...values, running_medecine: v })} value={values?.running_medecine} />


                <SelectionComponent default_select={false} options={[{ id: 1, name: "Male" }, { id: 1, name: "Female" }, { id: 1, name: "Other" }]} default_value={raw?.gender}
                    onSelect={(v) => {
                        setValues({ ...values, gender: v?.name })
                        setRaw({ ...raw, gender: v?.name })
                    }} />

                <InputComponent placeholder={'অ্যালার্জি (ওষুধ বা খাবারের প্রতি)'} handleEnter={handleEnter}
                    onChange={(v) => setValues({ ...values, allergic_food: v })} value={values?.allergic_food} />

                <InputComponent placeholder={'আপনার ঠিকানা লিখুন'} handleEnter={handleEnter}
                    onChange={(v) => setValues({ ...values, address: v })} value={values?.address} />

                <InputComponent placeholder={'পূর্বে অস্ত্রোপচার বা গুরুতর অসুস্থতা'} handleEnter={handleEnter}
                    onChange={(v) => setValues({ ...values, previous_surgery_or_serious_illness: v })} value={values?.previous_surgery_or_serious_illness} />

                <InputComponent placeholder={'আপনার মোবাইল নাম্বার লিখুন'} handleEnter={handleEnter} onChange={(v) => setValues({ ...values, phone: v })} value={values?.phone} />
                <InputComponent placeholder={'বর্তমানের স্বাস্থ্যগত অসুবিধা উল্লেখ করুন'} handleEnter={handleEnter} onChange={(v) => setValues({ ...values, reason_for_visit: v })} value={values?.reason_for_visit} />

                <InputComponent placeholder={'জরুরি যোগাযোগের নাম্বার'} handleEnter={handleEnter} onChange={(v) => setValues({ ...values, emergency_number: v })} value={values?.emergency_number} />
                <InputComponent placeholder={'আপনার ইমেইল লিখুন'} handleEnter={handleEnter} onChange={(v) => setValues({ ...values, email: v })} value={values?.email} />

                <div className='relative'>
                    <Calendar value={handleDateConvert(new Date(raw?.fromDate))}
                        getDate={(date) => { setValues({ ...values, appoinment_date: date }) }}
                        getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                </div>
                <div className='relative'>
                    <input type="datetime-local" value={values?.appoinment_time} onChange={(e) => { setValues({ ...values, appoinment_time: e.target.value }) }} className={`font-thin border border-transparent rounded [border-image:linear-gradient(to_right,#3b82f6,#ef4444)_1]
                                            text-[#6B7280] dark:bg-[#040404] dark:text-white text-[15px] focus:outline-none block w-full px-1.5 pt-[6px] pb-[7px] mt-2`} placeholder={''} />
                </div>
                <InputComponent type={'file'} placeholder={'Attachment'} handleEnter={handleEnter}
                    onChange={(v) => setValues({ ...values, attachment: v })} value={values?.attachment} />
            </div>
        </div>
    )
}

export default Appoinment