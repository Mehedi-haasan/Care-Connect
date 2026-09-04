import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import BASE_URL from "../URL/baseurl";
import Advertisement from "../Common/Advertisement";
import Cart from "../Common/Cart";
import AllDoctors from "./AllDoctors";
import Hero from "./Hero";
import Banner from "./Banner";
import Recenthealth from "./RecentHealth";
import HealthVideoSection from "./HealthVideoSection";


const Home = () => {


  const [homeContents, setHomeContents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [contentType, setContentType] = useState([])
  const [diseases, setDiseases] = useState([])
  const [allDoctor, setAllDoctor] = useState([])

  const FetchContents = async () => {
    try {
      const res = await fetch(`${BASE_URL}/api/get/content`);
      const result = await res.json();
      setHomeContents(result?.items)
    } catch (err) {
      console.error("Failed to fetch content:", err);
    } finally {
      setLoading(false);
    }
  };

  const GerDisease = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`${BASE_URL}/api/get/disease/1/10`, {
        method: 'GET',
        headers: {
          'authorization': token,
          'Content-type': 'application/json; charset=UTF-8',
        }
      });

      const data = await response.json();
      setDiseases(data?.items)
    } catch (error) {

    }
  }


  const GetContentType = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/api/get/content/type/${1}/${10}`, {
      method: 'GET',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json()
    setContentType(data.items)
  }


  const GetDoctors = async () => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${BASE_URL}/api/get/doctors`, {
      method: 'POST',
      headers: {
        "authorization": token,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({})
    });
    const data = await response.json()
    setAllDoctor(data.items)
  }

  useEffect(() => {
    GetContentType()
    FetchContents()
    GerDisease()
    GetDoctors()
  }, []);


  return (
    <div className="bg-white min-h-screen">
      <Banner />

      <div className="bg-[#F9FFF2] py-5 px-3 md:px-10 lg:px-20">
        <div className="grid grid-cols-5 md:grid-cols-10 ">
          {contentType.map((content, i) => (
            <NavLink key={i} to={`/category/${content.id}`} className="text-center px-2 py-1.5 rounded-full hover:bg-[#8B61C2] hover:text-white  transition font-medium text-[10px] sm:text-xs md:text-sm whitespace-nowrap overflow-hidden text-ellipsis"  >
              {content?.name}
            </NavLink>
          ))}

        </div>

      </div>


      <Hero title="স্বাস্থ্য কথা" data={homeContents} />


      <div className="px-4 md:px-16 lg:px-32 mt-10">
        <div className="border-b pb-3 flex justify-between items-center">
          <h1 className="font-bold text-2xl text-[#6A1B9A]">
            স্বাস্থ্য সুরক্ষা
          </h1>

          {homeContents && (
            <h1 className="text-[#1976D2] text-[12px] sm:text-sm md:text-[13px] font-bold cursor-pointer" onClick={() => setShowAll(true)}>
              সমস্ত বিষয় পড়ুন
            </h1>
          )}
        </div>

        {loading ? (
          <p className="py-10 text-gray-500">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6">
            {homeContents?.map((item) => (
              <Cart key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>


      <div className="pt-12 px-4 md:px-16 lg:px-32">
        <div className="border-b pb-3">
          <h1 className="font-extrabold text-xl"></h1>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 py-4 bg-[#F2EEF8] mt-4 rounded-xl">
          {diseases?.map((d, i) => (
            <button key={i} className="rounded-lg px-3 py-2 font-semibold hover:bg-[#8B61C2] hover:text-white transition">
              {d?.name}
            </button>
          ))}
        </div>
      </div>


      <Recenthealth title="সাম্প্রতিক স্বাস্থ্য" data={homeContents} />
      <Advertisement className="bg-black text-[#ACA766] w-full my-10" />
      <AllDoctors data={allDoctor} />

      <section className="mx-auto w-[90%] py-7 bg-[#EFF7F9]">
        <h2 className="p-5 border-b border-[#e5cfe9] pb-4 text-[28px] font-bold text-[#8b5cc7]">স্বাস্থ্য সেবা লিংক</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-5">
          {diseases?.map((item) => (
            <a key={item.id} href={item.name} className="whitespace-nowrap text-md text-center font-semibold text-[#17669b] transition-colors duration-200 hover:text-[#8b5cc7]">
              {item.name}
            </a>
          ))}
        </div>

      </section>

      <HealthVideoSection homeContents={homeContents} />

    </div>
  );
};

export default Home;
