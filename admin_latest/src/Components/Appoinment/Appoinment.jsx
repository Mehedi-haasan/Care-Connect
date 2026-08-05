import { useState, useEffect } from "react"
import BaseUrl from '../../Constant';
import Notification from "../Input/Notification";
import DoctorProfile from "./DoctorProfile";


const Appoinment = ({ entries, info = {} }) => {


    const [category, setCategory] = useState([])
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isLoading, setIsLoading] = useState(false)
    const [totalItem, setTotalItem] = useState(0)

    const [message, setMessage] = useState({ id: '', mgs: '' });

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
        document.title = `Categorys - Care-Connect`;
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

    return (
        <div className="pl-4 pr-2 pt-5 min-h-screen pb-12">
            <Notification message={message} />
            <DoctorProfile doctor={doctor} />
        </div>
    )
}

export default Appoinment