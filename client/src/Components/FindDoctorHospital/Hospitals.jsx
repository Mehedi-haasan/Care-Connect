import React, { useState, useEffect } from "react";
import BASE_URL from "../URL/baseurl";
import { Hospital } from "lucide-react";

const hospitals = [
  {
    id: 1,
    name: "Holy Family Red Crescent Medical College Hospital ",
    address: "1 Eskaton Garden Road, Dhaka-1000",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Ramna",
    doctors: 15,
    services: ["General", "Emergency", "ICU", "Lab"],
    phone: "01309760132",
  },
  {
    id: 2,
    name: "Square Hospital",
    address: "18/F, Bir Uttam Qazi Nuruzzaman Sarak, Dhaka-1205",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Dhanmondi",
    doctors: 25,
    services: ["General", "ICU", "Ambulance"],
    phone: "01309760111",
  },
];

// 👨‍⚕️ Sample doctor data
const doctors = [
  {
    id: 1,
    name: "ডা. মোঃ কামরুল হাসান",
    specialty: "মেডিসিন বিশেষজ্ঞ",
    hospital: "Square Hospital",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Dhanmondi",
    phone: "01712345678",
    experience: "১২ বছর",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774299.png",
  },
  {
    id: 2,
    name: "ডা. ফারজানা ইসলাম",
    specialty: "গাইনোকোলজি বিশেষজ্ঞ",
    hospital: "Holy Family Hospital",
    division: "Dhaka",
    district: "Dhaka",
    upazila: "Ramna",
    phone: "01812345678",
    experience: "৮ বছর",
    image:
      "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  },
];



const Hospitals = () => {
  const [tab, setTab] = useState("hospital");

  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdistrict, setSubDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [subupazila, setSubUpazila] = useState([]);


  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [values, setValues] = useState({
    division: '', district: '', upazila: ''
  })




  const GetState = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/api/get/common/state`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setDivision(data?.divitions)
    setDistrict(data?.districts)
    setUpazila(data?.upazilas)
  }

  const GetDoctors = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/api/get/doctors`, {
      method: 'POST',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(values),
    });
    const data = await response.json()
    setDoctors(data?.items)
  }

  useEffect(() => {
    GetState()
    GetDoctors()
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-200 p-6 text-center">
        <h2 className="text-xl font-bold mb-3">
          আপনার এলাকায় বিশেষজ্ঞ ডাক্তার ও হাসপাতাল খুঁজুন
        </h2>

        {/* 🟣 Tabs */}
        <div className="flex w-full max-w-2xl mx-auto mt-4 rounded overflow-hidden shadow-sm">
          <button
            onClick={() => setTab("hospital")}
            className={`w-1/2 py-3 font-medium transition ${tab === "hospital"
              ? "bg-purple-700 text-white"
              : "bg-blue-100 text-gray-800"
              }`}
          >
            নিকটস্থ হাসপাতাল
          </button>
          <button
            onClick={() => setTab("doctor")}
            className={`w-1/2 py-3 font-medium transition ${tab === "doctor"
              ? "bg-purple-700 text-white"
              : "bg-blue-100 text-gray-800"
              }`}
          >
            বিশেষজ্ঞ ডাক্তার
          </button>
        </div>

        {/* 🗂️ Filters */}
        <div className="flex flex-wrap justify-center gap-2 mt-4 w-full max-w-2xl mx-auto">
          <select
            value={values?.division}
            onChange={(e) => {
              let divi = division.find((d) => d.name === e.target.value);
              let dis = district.filter((d) => d.division_id === divi?.id);
              setValues({
                ...values,
                division: e.target.value,
                division_id: divi?.id
              })
              setSubDistrict(dis)
            }}
            className="flex-1 min-w-[150px] bg-blue-100 p-3 rounded focus:outline-none">
            <option value="">বিভাগ</option>
            {division?.map((div) => (
              <option key={div} value={div?.name}>
                {div?.name}
              </option>
            ))}
          </select>

          <select
            value={values?.district}
            onChange={(e) => {
              let dis = district.find((d) => d.name === e.target.value);
              let upa = upazila.filter((d) => d.district_id === dis?.id);
              setValues({
                ...values,
                district: e.target.value,
                district_id: dis?.id
              })
              setSubUpazila(upa)
            }}
            setUpazila
            disabled={!division}
            className="flex-1 min-w-[150px] bg-blue-100 p-3 rounded focus:outline-none disabled:opacity-50"
          >
            <option value="">জেলা</option>
            {subdistrict?.map((dis) => (
              <option key={dis.id} value={dis.name}>
                {dis.name}
              </option>
            ))}
          </select>

          <select
            value={values?.upazila}
            onChange={(e) => {
              let upa = subupazila.find((d) => d.name === e.target.value);
              setValues({
                ...values,
                upazila: e.target.value,
                upazila_id: upa?.id
              })
            }}
            disabled={!district}
            className="flex-1 min-w-[150px] bg-blue-100 p-3 rounded focus:outline-none disabled:opacity-50"
          >
            <option value="">উপজেলা</option>
            {subupazila?.map((upa) => (
              <option key={upa.id} value={upa.name}>
                {upa.name}
              </option>
            ))}
          </select>
        </div>
      </div>


      {/* 🏥 Hospital Cards */}
      {tab === "hospital" && (
        <div className="p-6 max-w-5xl mx-auto grid gap-4">
          {hospitals.map((h) => (
            <div key={h.id} className="bg-white shadow p-4 rounded flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/4 flex items-center justify-center bg-gray-100 rounded">
                <img
                  src="https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop"
                  alt="Hospital"
                  className="rounded h-full max-h-40 w-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800">
                  {h.name}
                </h3>
                <p className="text-sm text-gray-600">{h.address}</p>
                <p className="text-sm text-purple-600 mt-1">
                  {h.services.join(", ")}
                </p>
              </div>
              <div className="w-full md:w-1/4 text-sm flex flex-col justify-between">
                <div className="mt-2 bg-purple-400 text-white py-1 px-2 rounded">
                  <p>ডাক্তার: {h.doctors} জন</p>
                  <a href={`tel:${h.phone}`} className="text-blue-600 mt-2">
                    📞 {h.phone}
                  </a>
                </div>
                <button className="mt-2 bg-purple-600 text-white py-1 px-2 rounded">
                  অ্যাপয়েন্টমেন্ট নিন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 👨‍⚕️ Doctor Cards */}
      {tab === "doctor" && (
        <div className="p-6 max-w-5xl mx-auto grid gap-4">
          {doctors?.map((d) => (
            <div key={d.id} className="bg-white shadow p-4 rounded flex flex-col md:flex-row gap-4" >
              <div className="w-full md:w-1/4 flex items-center justify-center bg-gray-100 rounded">
                <img
                  src={d.image_url}
                  alt={d.image_url}
                  className="rounded-full w-24 h-24"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-blue-800">
                  {d?.name}
                </h3>
                <p className="text-sm text-gray-700">{d?.designation}</p>
                <p className="text-sm text-gray-500">
                  হাসপাতাল: {d?.hospitals?.map((item)=>{
                    return item?.name
                  })}
                </p>
                <p className="text-sm text-gray-500">
                  অভিজ্ঞতা: {'12 Years'}
                </p>
              </div>
              <div className="w-full md:w-1/4 flex flex-col justify-between text-sm">
                <a href={`tel:${d?.phone}`} className="text-blue-600">
                  📞 {d?.phone}
                </a>
                <button className="mt-2 bg-purple-600 text-white py-1 px-2 rounded">
                  অ্যাপয়েন্টমেন্ট নিন
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hospitals