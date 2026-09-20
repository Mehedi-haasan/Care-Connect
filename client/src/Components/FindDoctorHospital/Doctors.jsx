import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../URL/baseurl";
import DoctorCard from "./DoctorCard";
import SelectionComponent from "../Input/SelectionComponent";


const DoctorListPage = () => {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  const [division, setDivision] = useState([]);
  const [district, setDistrict] = useState([]);
  const [upazila, setUpazila] = useState([]);
  const [doctors, setDoctors] = useState([])
  const [div_id, setDivId] = useState(null)
  const [dis_id, setDisId] = useState(null)
  const [upa_id, setUpaId] = useState(null)
  const [gender, setGender] = useState(null)
  const [name, setName] = useState(null)




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
        name: name,
        gender: gender,
        division_id: div_id,
        district_id: dis_id,
        upazila_id: upa_id
      }),
    });
    const data = await response.json()
    setDoctors(data?.items)
  }



  useEffect(() => {
    GetDoctors()
  }, [div_id, dis_id, upa_id, name, gender]);

  useEffect(() => {
    GetState()
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ===== HEADER + FILTER ===== */}
      <div ref={panelRef} className="w-full px-4 md:px-10 pt-6">

        <div className="bg-[##FDF7FD] p-4 md:p-6 rounded-2xl shadow-lg">

          {/* SEARCH */}
          <div className="flex justify-center mb-8 px-3">
            <div className="w-full md:w-[85%] relative">

              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-full px-4 py-3 transition-all duration-300 focus-within:shadow-xl focus-within:scale-[1.02]">

                {/* Input */}
                <input
                  type="text"
                  onChange={(e) => { setName(e.target.value) }}
                  placeholder="ডাক্তার/ হাসপাতাল/ ডায়াগনস্টিক/ কনসালটেন্ট খুঁজুন..."
                  className="w-full bg-transparent outline-none text-sm md:text-base placeholder-gray-400"
                />



                {/* Search Button */}
                <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold hover:scale-105 transition">
                  খুজুন
                </button>

              </div>



            </div>
          </div>

          {/* FILTERS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <SelectionComponent label={'Type'} onSelect={(v) => { }} options={[{ 'id': 'ডাক্তার', 'name': 'ডাক্তার' }, { 'id': 'হাসপাতাল', 'name': 'হাসপাতাল' }]} />
            <SelectionComponent label={'চিকিৎসা ক্ষেত্র'} onSelect={(v) => { }} options={[{ 'id': 'চিকিৎসা ক্ষেত্র', 'name': 'চিকিৎসা ক্ষেত্র' }, { 'id': '2', 'name': 'মানসিক সাপোর্ট' }]} />

            <SelectionComponent label={'Division'} onSelect={(v) => { setDivId(v); }} options={division} />
            <SelectionComponent label={'District'} onSelect={(v) => { setDisId(v) }} options={district} />
            <SelectionComponent label={'Upazila'} onSelect={(v) => { setUpaId(v) }} options={upazila} />
            <SelectionComponent label={'Gender'} onSelect={(v) => { setGender(v) }} options={[{ 'id': 'Male', 'name': 'পুরুষ' }, { 'id': 'Femele', 'name': 'নারী' }]} />
            <SelectionComponent label={'পরামর্শের ধরন'} onSelect={(v) => { console.log(v) }} options={[{ 'id': '1', 'name': 'পরামর্শের ধরন' }]} />



            <div className="pt-[27px]">
              <button
                onClick={() => navigate("/search")}
                className="bg-gradient-to-r from-[#cfd9ff] via-[#e0c3fc] to-[#fbc2eb] rounded-lg py-2 font-semibold w-full"
              >
                সার্চ করুন
              </button>
            </div>

          </div>
        </div>
      </div>




      {/* ===== DOCTOR LIST ===== */}
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">

        {doctors.length === 0 && (
          <p className="text-center text-gray-500">
            কোন ডাক্তার পাওয়া যায়নি
          </p>
        )}
        <div className="space-y-5">
          {doctors?.map((doctor, index) => (
            <DoctorCard
              key={index}
              doctor={doctor}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default DoctorListPage;