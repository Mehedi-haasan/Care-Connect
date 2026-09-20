import React, { useState, useEffect } from "react";
import BASE_URL from "../URL/baseurl";
import HospitalCard from "./HospitalCard";
import DoctorCard from "./DoctorCard";



const Hospitals = () => {
  const [tab, setTab] = useState("hospital");
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [subdistrict, setSubDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [subupazila, setSubUpazila] = useState([]);


  const [hospitals, setHospitals] = useState([])
  const [doctors, setDoctors] = useState([])
  const [div_id, setDivId] = useState(null)
  const [dis_id, setDisId] = useState(null)
  const [upa_id, setUpaId] = useState(null)
  const [values, setValues] = useState({
    division: '',
    division_id: null,
    district: '',
    district_id: null,
    upazila: '',
    upazila_id: null
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
      body: JSON.stringify({
        division_id: div_id,
        district_id: dis_id,
        upazila_id: upa_id
      }),
    });
    const data = await response.json()
    setDoctors(data?.items)
  }

  const GetHospitals = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/api/get/hospital/${div_id}/${dis_id}/${upa_id}`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      }
    });
    const data = await response.json()
    setHospitals(data?.items)
  }

  useEffect(() => {
    GetHospitals()
    GetDoctors()
  }, [div_id, dis_id, upa_id]);

  useEffect(() => {
    GetState()
  }, []);



  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-blue-200 p-6 text-center">
        <h2 className="text-xl font-bold mb-3">
          আপনার এলাকায় বিশেষজ্ঞ ডাক্তার ও হাসপাতাল খুঁজুন
        </h2>

        <div className="flex w-full max-w-2xl mx-auto mt-4 rounded overflow-hidden shadow-sm">
          <button
            onClick={() => setTab("hospital")}
            className={`w-1/2 py-3 font-medium transition ${tab === "hospital"
              ? "bg-purple-700 text-white" : "bg-blue-100 text-gray-800"}`}>
            নিকটস্থ হাসপাতাল
          </button>
          <button
            onClick={() => setTab("doctor")}
            className={`w-1/2 py-3 font-medium transition ${tab === "doctor"
              ? "bg-purple-700 text-white" : "bg-blue-100 text-gray-800"}`}>
            বিশেষজ্ঞ ডাক্তার
          </button>
        </div>

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
              setDivId(divi?.id)
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
              setDisId(dis?.id)
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
              setUpaId(upa?.id)
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
          {hospitals?.map((hospital) => {
            return <HospitalCard
              key={hospital.id}
              hospital={hospital}
            />
          })}
        </div>
      )}

      {/* 👨‍⚕️ Doctor Cards */}
      {tab === "doctor" && (
        <div className="p-6 max-w-5xl mx-auto grid gap-4">
          {doctors?.map((doctor, index) => (
            <DoctorCard
              key={index}
              doctor={doctor}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Hospitals