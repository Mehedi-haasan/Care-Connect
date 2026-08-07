import { useState, useEffect } from "react"
import BaseUrl from '../../Constant';
import Notification from "../Input/Notification";
import DoctorProfile from "./DoctorProfile";
import { NavLink } from "react-router-dom";
import InputComponent from '../Input/InputComponent'
import Calendar from "../Wholesale/Calender";


const Appoinment = () => {


    const [category, setCategory] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)
    const today = new Date();
    const [values, setValues] = useState({
        pay: 0,
        paking: 0,
        delivary: 0,
        pay_type: 'Challan',
        lastdiscount: 0,
        lastdiscounttype: "Fixed",
        deliverydate: '',
        sup_invo: '',
        status: "Due"
    })

    const [message, setMessage] = useState({ id: '', mgs: '' });
    const [selected, setSelected] = useState("self");

    const getCategory = async () => {
        // setIsLoading(true)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/get/category/${page}/${pageSize}`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json()
        setCategory(data.items)
        setTotalItem(data?.count)
        setIsLoading(false)
    }


    useEffect(() => {
        document.title = `Appoinment - Care-Connect`;
        getCategory()
    }, [page, pageSize]);

    const doctor = {
        name: "ডাঃ লুবনা জামানুল",
        title: "স্ত্রীরোগ ও প্রসূতি বিশেষজ্ঞ",
        degree: "BBSFCPS (Obs & Gynae) Diploma in ART (ISRME, Mumbai)",
        experience: "১৫ বছরের সেবা অভিজ্ঞতা",
        image: "http://localhost:8050/uploads/1785514016738-97ce03195574677.Y3JvcCwzMDY4LDI0MDAsNjgsMA (1).jpg",

        hospital: {
            name: "হলি ফ্যামিলি রেড ক্রিসেন্ট মেডিকেল কলেজ হাসপাতাল",
            address: "বনানী, ঢাকা",
        },

        specialties: [
            "গর্ভকালীন যত্ন",
            "সিজারিয়ান অপারেশন",
            "বন্ধ্যাত্ব চিকিৎসা",
            "মেনোপজ",
            "হাই রিস্ক প্রেগন্যান্সি",
            "জরায়ুর টিউমার",
            "স্বাভাবিক প্রসব",
            "নারী স্বাস্থ্য",
            "পলিসিস্টিক ওভারি",
            "জরায়ুর ক্যান্সার স্ক্রিনিং"
        ],

        schedule: [
            { day: "রবি", active: true },
            { day: "সোম", active: true },
            { day: "মঙ্গল", active: true },
            { day: "বুধ", active: false },
            { day: "বৃহ", active: true },
            { day: "শুক্র", active: true },
            { day: "শনি", active: false },
        ],

        time: "সন্ধ্যা ৭টা থেকে রাত ১০টা পর্যন্ত"
    };
    const [raw, setRaw] = useState({
        fromDate: today.toISOString(),
        toDate: today.toISOString()
    });

    const handleDateConvert = (date) => {
        const formatted = date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
        return formatted
    };

    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-16 bg-white">
            <Notification message={message} />
            <DoctorProfile doctor={doctor} />

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
                <div className={`my-6 flex justify-center items-center gap-3 text-sm ${today ? 'hidden':''}`}>
                    <NavLink to={'/'} className="text-indigo-700 hover:underline font-medium"                    >
                        ইতিমধ্যে অ্যাকাউন্ট আছে
                    </NavLink>

                    <span className="text-gray-400">|</span>

                    <NavLink to={'/'} className="text-indigo-700 hover:underline font-medium"                    >
                        সাইনআপ করুন
                    </NavLink>
                </div>

                {/* Bottom Text */}
                <p className="text-lg text-gray-800">
                    অ্যাপয়েন্টমেন্ট সম্পর্কিত তথ্য প্রদান করুন
                </p>
            </div>

            <div className="grid grid-cols-2 gap-5 px-10 pt-5">
                <InputComponent placeholder={'আপনার পূর্ণ নাম লিখুন'} />
                <InputComponent placeholder={'পূর্বের রোগ ইতিহাস (যেমন ডায়াবেটিস, উচ্চ রক্তচাপ ইত্যাদি)'} />

                <InputComponent placeholder={'আপনার বয়স উল্লেখ করুন'} />
                <InputComponent placeholder={'বর্তমান ব্যবহৃত ওষুধ (যদি থাকে)'} />

                <InputComponent placeholder={'আপনার লিঙ্গ নির্বাচন করুন'} />
                <InputComponent placeholder={'অ্যালার্জি (ওষুধ বা খাবারের প্রতি)'} />

                <InputComponent placeholder={'আপনার ঠিকানা লিখুন'} />
                <InputComponent placeholder={'পূর্বে অস্ত্রোপচার বা গুরুতর অসুস্থতা'} />

                <InputComponent placeholder={'আপনার মোবাইল নাম্বার লিখুন'} />
                <InputComponent placeholder={'বর্তমানের স্বাস্থ্যগত অসুবিধা উল্লেখ করুন'} />

                <InputComponent placeholder={'জরুরি যোগাযোগের নাম্বার'} />
                <InputComponent placeholder={'আপনার ইমেইল লিখুন'} />

                <div className='relative'>
                    <Calendar value={handleDateConvert(new Date(raw?.fromDate))}
                        getDate={(date) => { setValues({ ...values, deliverydate: date }) }}
                        getTime={(ti) => { setRaw({ ...raw, fromDate: ti }) }} />
                </div>
            </div>
        </div>
    )
}

export default Appoinment