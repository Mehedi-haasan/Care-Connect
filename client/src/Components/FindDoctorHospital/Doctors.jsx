import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

// 👨‍⚕️ Doctor Data
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
    division: "ঢাকা",
    district: "Dhaka",
    upazila: "Ramna",
    phone: "01812345678",
    experience: "৮ বছর",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  },
  {
    id: 3,
    name: "ডা. ফারজানা ইসলাম",
    specialty: "গাইনোকোলজি বিশেষজ্ঞ",
    hospital: "Holy Family Hospital",
    division: "ঢাকা",
    district: "Dhaka",
    upazila: "Ramna",
    phone: "01812345678",
    experience: "৮ বছর",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  },
  {
    id: 4,
    name: "ডা. ফারজানা ইসলাম",
    specialty: "গাইনোকোলজি বিশেষজ্ঞ",
    hospital: "Holy Family Hospital",
    division: "ঢাকা",
    district: "Dhaka",
    upazila: "Ramna",
    phone: "01812345678",
    experience: "৮ বছর",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  },
  {
    id: 5,
    name: "ডা. ফারজানা ইসলাম",
    specialty: "গাইনোকোলজি বিশেষজ্ঞ",
    hospital: "Holy Family Hospital",
    division: "ঢাকা",
    district: "Dhaka",
    upazila: "Ramna",
    phone: "01812345678",
    experience: "৮ বছর",
    image: "https://cdn-icons-png.flaticon.com/512/3774/3774298.png",
  },
];

// 📍 Location Data
const locations = {
  চট্টগ্রাম: {
    কুমিল্লা: ["দেবিদ্বার", "বরুড়া", "ব্রাহ্মণপাড়া", "চান্দিনা", "চৌদ্দগ্রাম", "দাউদকান্দি", "হোমনা", "লাকসাম", "মুরাদনগর", "নাঙ্গলকোট", "কুমিল্লা সদর", "মেঘনা", "মনোহরগঞ্জ", "সদর দক্ষিণ", "তিতাস", "বুড়িচং", "লালমাই"],
    ফেনী: ["ছাগলনাইয়া", "ফেনী সদর", "সোনাগাজী", "ফুলগাজী", "পরশুরাম", "দাগনভূঞা"],
    ব্রাহ্মণবাড়িয়া: ["ব্রাহ্মণবাড়িয়া সদর", "কসবা", "নাসিরনগর", "সরাইল", "আশুগঞ্জ", "আখাউড়া", "নবীনগর", "বাঞ্ছারামপুর", "বিজয়নগর"],
    রাঙ্গামাটি: ["রাঙ্গামাটি সদর", "কাপ্তাই", "কাউখালী", "বাঘাইছড়ি", "বরকল", "লংগদু", "রাজস্থলী", "বিলাইছড়ি", "জুরাছড়ি", "নানিয়ারচর"],
    নোয়াখালী: ["নোয়াখালী", "কোম্পানীগঞ্জ", "বেগমগঞ্জ", "হাতিয়া", "সুবর্ণচর", "কবিরহাট", "সেনবাগ", "চাটখিল", "সোনাইমুড়ী"],
    চাঁদপুর: ["হাইমচর", "কচুয়া", "শাহরাস্তি", "চাঁদপুর সদর", "মতলব", "হাজীগঞ্জ", "ফরিদগঞ্জ"],
    লক্ষ্মীপুর: ["লক্ষ্মীপুর সদর", "কমলনগর", "রায়পুর", "রামগতি", "রামগঞ্জ"],
    চট্টগ্রাম: ["রাঙ্গুনিয়া", "সীতাকুন্ড", "মীরসরাই", "পটিয়া", "সন্দ্বীপ", "বাঁশখালী", "বোয়ালখালী", "আনোয়ারা", "চন্দনাইশ", "সাতকানিয়া", "লোহাগাড়া", "হাটহাজারী", "ফটিকছড়ি", "রাউজান", "কর্ণফুলী"],
    কক্সবাজার: ["কক্সবাজার সদর", "চকরিয়া", "কুতুবদিয়া", "উখিয়া", "মহেশখালী", "পেকুয়া", "রামু", "টেকনাফ"],
    খাগড়াছড়ি: ["খাগড়াছড়ি সদর", "দিঘীনালা", "পানছড়ি", "লক্ষীছড়ি", "মহালছড়ি", "মানিকছড়ি", "রামগড়", "মাটিরাঙ্গা", "গুইমারা"],
    বান্দরবান: ["বান্দরবান সদর", "আলীকদম", "নাইক্ষ্যংছড়ি", "রোয়াংছড়ি", "লামা", "রুমা", "থানচি"],
  },

  রাজশাহী: {
    সিরাজগঞ্জ: ["বেলকুচি", "চৌহালি", "কামারখন্দ", "কাজীপুর", "রায়গঞ্জ", "শাহজাদপুর", "সিরাজগঞ্জ", "তাড়াশ", "উল্লাপাড়া"],
    পাবনা: ["সুজানগর", "ঈশ্বরদী", "ভাঙ্গুড়া", "পাবনা সদর", "বেড়া", "আটঘরিয়া", "চাটমোহর", "সাঁথিয়া", "ফরিদপুর"],
    বগুড়া: ["কাহালু", "বগুড়া সদর", "সারিয়াকান্দি", "শাজাহানপুর", "দুপচাচিঁয়া", "আদমদিঘি", "নন্দিগ্রাম", "সোনাতলা", "ধুনট", "গাবতলী", "শেরপুর", "শিবগঞ্জ"],
    রাজশাহী: ["পবা", "দুর্গাপুর", "মোহনপুর", "চারঘাট", "পুঠিয়া", "বাঘা", "গোদাগাড়ী", "তানোর", "বাগমারা"],
    নাটোর: ["নাটোর সদর", "সিংড়া", "বড়াইগ্রাম", "বাগাতিপাড়া", "লালপুর", "গুরুদাসপুর", "নলডাঙ্গা"],
    জয়পুরহাট: ["আক্কেলপুর", "কালাই", "ক্ষেতলাল", "পাঁচবিবি", "জয়পুরহাট সদর"],
    চাঁপাইনবাবগঞ্জ: ["চাঁপাইনবাবগঞ্জ সদর", "গোমস্তাপুর", "নাচোল", "ভোলাহাট", "শিবগঞ্জ"],
    নওগাঁ: ["মহাদেবপুর", "বদলগাছী", "পত্নিতলা", "ধামইরহাট", "নিয়ামতপুর", "মান্দা", "আত্রাই", "রাণীনগর", "নওগাঁ সদর", "পোরশা", "সাপাহার"],
  },

  খুলনা: {
    যশোর: ["মণিরামপুর", "অভয়নগর", "বাঘারপাড়া", "চৌগাছা", "ঝিকরগাছা", "কেশবপুর", "যশোর সদর", "শার্শা"],
    সাতক্ষীরা: ["আশাশুনি", "দেবহাটা", "কলারোয়া", "সাতক্ষীরা সদর", "শ্যামনগর", "তালা", "কালিগঞ্জ"],
    মেহেরপুর: ["মুজিবনগর", "মেহেরপুর সদর", "গাংনী"],
    নড়াইল: ["নড়াইল সদর", "লোহাগড়া", "কালিয়া"],
    চুয়াডাঙ্গা: ["চুয়াডাঙ্গা সদর", "আলমডাঙ্গা", "দামুড়হুদা", "জীবননগর"],
    কুষ্টিয়া: ["কুষ্টিয়া সদর", "কুমারখালী", "খোকসা", "মিরপুর", "দৌলতপুর", "ভেড়ামারা"],
    মাগুরা: ["শালিখা", "শ্রীপুর", "মাগুরা সদর", "মহম্মদপুর"],
    খুলনা: ["পাইকগাছা", "ফুলতলা", "দিঘলিয়া", "রূপসা", "তেরখাদা", "ডুমুরিয়া", "বটিয়াঘাটা", "দাকোপ", "কয়রা"],
    বাগেরহাট: ["ফকিরহাট", "বাগেরহাট সদর", "মোল্লাহাট", "শরণখোলা", "রামপাল", "মোড়েলগঞ্জ", "কচুয়া", "মোংলা", "চিতলমারী"],
    ঝিনাইদহ: ["ঝিনাইদহ সদর", "শৈলকুপা", "হরিণাকুন্ডু", "কালীগঞ্জ", "কোটচাঁদপুর", "মহেশপুর"],
  },

  বরিশাল: {
    ঝালকাঠি: ["ঝালকাঠি সদর", "কাঠালিয়া", "নলছিটি", "রাজাপুর"],
    পটুয়াখালী: ["বাউফল", "পটুয়াখালী সদর", "দুমকি", "দশমিনা", "কলাপাড়া", "মির্জাগঞ্জ", "গলাচিপা", "রাঙ্গাবালী"],
    পিরোজপুর: ["পিরোজপুর সদর", "নাজিরপুর", "কাউখালী", "ভান্ডারিয়া", "মঠবাড়ীয়া", "নেছারাবাদ", "ইন্দুরকানী"],
    বরিশাল: ["বরিশাল সদর", "বাকেরগঞ্জ", "বাবুগঞ্জ", "উজিরপুর", "বানারীপাড়া", "গৌরনদী", "আগৈলঝাড়া", "মেহেন্দিগঞ্জ", "মুলাদী", "হিজলা"],
    ভোলা: ["ভোলা সদর", "বোরহান উদ্দিন", "চরফ্যাশন", "দৌলতখান", "মনপুরা", "তজুমদ্দিন", "লালমোহন"],
    বরগুনা: ["আমতলী", "বরগুনা সদর", "বেতাগী", "বামনা", "পাথরঘাটা", "তালতলি"],
  },

  সিলেট: {
    সিলেট: ["বালাগঞ্জ", "বিয়ানীবাজার", "বিশ্বনাথ", "কোম্পানীগঞ্জ", "ফেঞ্চুগঞ্জ", "গোলাপগঞ্জ", "গোয়াইনঘাট", "জৈন্তাপুর", "কানাইঘাট", "সিলেট সদর", "জকিগঞ্জ", "দক্ষিণ সুরমা", "ওসমানী"],
    মৌলভীবাজার: ["বড়লেখা", "কমলগঞ্জ", "কুলাউড়া", "মৌলভীবাজার সদর", "রাজনগর", "শ্রীমঙ্গল", "জুড়ী"],
    হবিগঞ্জ: ["নবীগঞ্জ", "বাহুবল", "আজমিরীগঞ্জ", "বানিয়াচং", "লাখাই", "চুনারুঘাট", "হবিগঞ্জ সদর", "মাধবপুর", "শায়েস্তাগঞ্জ"],
    সুনামগঞ্জ: ["সুনামগঞ্জ সদর", "দক্ষিণ সুনামগঞ্জ", "বিশ্বম্ভরপুর", "ছাতক", "জগন্নাথপুর", "দোয়ারাবাজার", "তাহিরপুর", "ধর্মপাশা", "জামালগঞ্জ", "শাল্লা", "দিরাই", "মধ্যনগর"],
  },

  ঢাকা: {
    নরসিংদী: ["বেলাবো", "মনোহরদী", "নরসিংদী", "পলাশ", "রায়পুরা", "শিবপুর"],
    গাজীপুর: ["কালীগঞ্জ", "কালিয়াকৈর", "কাপাসিয়া", "গাজীপুর সদর", "শ্রীপুর"],
    শরীয়তপুর: ["শরিয়তপুর সদর", "নড়িয়া", "জাজিরা", "গোসাইরহাট", "ভেদরগঞ্জ", "ডামুড্যা"],
    নারায়ণগঞ্জ: ["আড়াইহাজার", "বন্দর", "নারায়নগঞ্জ সদর", "রূপগঞ্জ", "সোনারগাঁ"],
    টাঙ্গাইল: ["বাসাইল", "ভুয়াপুর", "দেলদুয়ার", "ঘাটাইল", "গোপালপুর", "মধুপুর", "মির্জাপুর", "নাগরপুর", "সখিপুর", "টাঙ্গাইল সদর", "কালিহাতী", "ধনবাড়ী"],
    কিশোরগঞ্জ: ["ইটনা", "কটিয়াদী", "ভৈরব", "তাড়াইল", "হোসেনপুর", "পাকুন্দিয়া", "কুলিয়ারচর", "কিশোরগঞ্জ সদর", "করিমগঞ্জ", "বাজিতপুর", "অষ্টগ্রাম", "মিঠামইন", "নিকলী"],
    মানিকগঞ্জ: ["হরিরামপুর", "সাটুরিয়া", "মানিকগঞ্জ সদর", "ঘিওর", "শিবালয়", "দৌলতপুর", "সিংগাইর"],
    ঢাকা: ["সাভার", "ধামরাই", "কেরাণীগঞ্জ", "নবাবগঞ্জ", "দোহার"],
    মুন্সিগঞ্জ: ["মুন্সিগঞ্জ সদর", "শ্রীনগর", "সিরাজদিখান", "লৌহজং", "গজারিয়া", "টংগীবাড়ি"],
    রাজবাড়ী: ["রাজবাড়ী সদর", "গোয়ালন্দ", "পাংশা", "বালিয়াকান্দি", "কালুখালী"],
    মাদারীপুর: ["মাদারীপুর সদর", "শিবচর", "কালকিনি", "রাজৈর", "ডাসার"],
    গোপালগঞ্জ: ["গোপালগঞ্জ সদর", "কাশিয়ানী", "টুংগীপাড়া", "কোটালীপাড়া", "মুকসুদপুর"],
    ফরিদপুর: ["ফরিদপুর সদর", "আলফাডাঙ্গা", "বোয়ালমারী", "সদরপুর", "নগরকান্দা", "ভাঙ্গা", "চরভদ্রাসন", "মধুখালী", "সালথা"],
  },

  রংপুর: {
    পঞ্চগড়: ["পঞ্চগড়", "দেবীগঞ্জ", "বোদা", "আটোয়ারী", "তেতুলিয়া"],
    দিনাজপুর: ["নবাবগঞ্জ", "বীরগঞ্জ", "ঘোড়াঘাট", "বিরামপুর", "পার্বতীপুর", "বোচাগঞ্জ", "কাহারোল", "ফুলবাড়ী", "দিনাজপুর সদর", "হাকিমপুর", "খানসামা", "বিরল", "চিরিরবন্দর"],
    লালমনিরহাট: ["লালমনিরহাট সদর", "কালীগঞ্জ", "হাতীবান্ধা", "পাটগ্রাম", "আদিতমারী"],
    নীলফামারী: ["সৈয়দপুর", "ডোমার", "ডিমলা", "জলঢাকা", "কিশোরগঞ্জ", "নীলফামারী সদর"],
    গাইবান্ধা: ["সাদুল্লাপুর", "গাইবান্ধা সদর", "পলাশবাড়ী", "সাঘাটা", "গোবিন্দগঞ্জ", "সুন্দরগঞ্জ", "ফুলছড়ি"],
    ঠাকুরগাঁও: ["ঠাকুরগাঁও সদর", "পীরগঞ্জ", "রাণীশংকৈল", "হরিপুর", "বালিয়াডাঙ্গী"],
    রংপুর: ["রংপুর সদর", "গংগাচড়া", "তারাগঞ্জ", "বদরগঞ্জ", "মিঠাপুকুর", "পীরগঞ্জ", "কাউনিয়া", "পীরগাছা"],
    কুড়িগ্রাম: ["কুড়িগ্রাম সদর", "নাগেশ্বরী", "ভুরুঙ্গামারী", "ফুলবাড়ী", "রাজারহাট", "উলিপুর", "চিলমারী", "রৌমারী", "চর রাজিবপুর"],
  },

  ময়মনসিংহ: {
    শেরপুর: ["শেরপুর সদর", "নালিতাবাড়ী", "শ্রীবরদী", "নকলা", "ঝিনাইগাতী"],
    ময়মনসিংহ: ["ফুলবাড়ীয়া", "ত্রিশাল", "ভালুকা", "মুক্তাগাছা", "ময়মনসিংহ সদর", "ধোবাউড়া", "ফুলপুর", "হালুয়াঘাট", "গৌরীপুর", "গফরগাঁও", "ঈশ্বরগঞ্জ", "নান্দাইল", "তারাকান্দা"],
    জামালপুর: ["জামালপুর সদর", "মেলান্দহ", "ইসলামপুর", "দেওয়ানগঞ্জ", "সরিষাবাড়ী", "মাদারগঞ্জ", "বকশীগঞ্জ"],
    নেত্রকোণা: ["বারহাট্টা", "দুর্গাপুর", "কেন্দুয়া", "আটপাড়া", "মদন", "খালিয়াজুরী", "কলমাকান্দা", "মোহনগঞ্জ", "পূর্বধলা", "নেত্রকোণা সদর"],
  },
};

const DoctorListPage = () => {
  const navigate = useNavigate();
  const panelRef = useRef(null);

  const [division, setDivision] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [search, setSearch] = useState("");

  // District & Upazila options
  const districts = division ? Object.keys(locations[division] || {}) : [];
  const upazilas =
    division && district
      ? locations[division][district] || []
      : [];

  // 🔍 Filter logic
  const filteredDoctors = doctors.filter(
    (d) =>
      (!division || d.division === division) &&
      (!district || d.district === district) &&
      (!upazila || d.upazila === upazila) &&
      (!search ||
        d.name.toLowerCase().includes(search.toLowerCase()) ||
        d.hospital.toLowerCase().includes(search.toLowerCase()) ||
        d.specialty.toLowerCase().includes(search.toLowerCase()))
  );

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
              <select>
              <option value="">ডাক্তার</option>
              <option value="">হাসপাতাল</option>    
            </select>

              <select>
              <option value="">চিকিৎসা ক্ষেত্র</option>
              <option value="">মানসিক সাপোর্ট</option>    
            </select>

             


            {/* Division */}
            <select
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
                setUpazila("");
              }}
              className="border rounded-lg px-3 py-2 bg-white"
            >
              <option value="">বিভাগ</option>
              {Object.keys(locations).map((div) => (
                <option key={div} value={div}>
                  {div}
                </option>
              ))}
            </select>

            {/* District */}
            <select
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setUpazila("");
              }}
              className="border rounded-lg px-3 py-2 bg-white"
              disabled={!division}
            >
              <option value="">জেলা</option>
              {districts.map((dis) => (
                <option key={dis} value={dis}>
                  {dis}
                </option>
              ))}
            </select>

            {/* Upazila */}
            <select
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white"
              disabled={!district}
            >
              <option value="">উপজেলা</option>
              {upazilas.map((up) => (
                <option key={up} value={up}>
                  {up}
                </option>
              ))}
            </select>

               <select >
              <option value="">পুরুষ</option>
              <option value="">মহিলা</option>   
              <option value="">অন্যান্য</option>   
            </select>
              
               <select >
              <option value="">পরামর্শের ধরন</option>
                
            </select>


            <button
              onClick={() => navigate("/search")}
              className="bg-gradient-to-r from-[#cfd9ff] via-[#e0c3fc] to-[#fbc2eb] rounded-lg py-2 font-semibold"
            >
              সার্চ করুন
            </button>

          </div>
        </div>
      </div>




      {/* ===== DOCTOR LIST ===== */}
      <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-5">

        {filteredDoctors.length === 0 && (
          <p className="text-center text-gray-500">
            কোন ডাক্তার পাওয়া যায়নি
          </p>
        )}

        {filteredDoctors.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-4 md:p-5 flex flex-col md:flex-row gap-5"
          >

            {/* IMAGE */}
            <div className="flex justify-center md:w-[140px]">
              <img
                src={doc.image}
                alt={doc.name}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full border"
              />
            </div>

            {/* INFO */}
            <div className="flex-1">

              <h3 className="text-lg md:text-xl font-bold text-[#0170C0]">
                {doc.name}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                MBBS, FCPS (Medicine)
              </p>

              <p className="text-green-600 text-sm font-semibold mt-1">
                {doc.experience} অভিজ্ঞতা
              </p>

              <p className="text-[#8B61C2] font-medium mt-2">
                {doc.specialty}
              </p>

              <div className="text-sm text-gray-600 mt-2 space-y-1">
                <p>• জ্বর, ঠান্ডা, কাশি</p>
                <p>• ডায়াবেটিস</p>
                <p>• উচ্চ রক্তচাপ</p>
              </div>

              <div className="mt-3 text-sm">
                <p className="font-semibold">{doc.hospital}</p>
                <p className="text-gray-500">
                  📍 {doc.division}, {doc.district}, {doc.upazila}
                </p>
              </div>

              <div className="mt-2 text-sm text-blue-600">
                সময়সূচীঃ শনি-রবি-সোম | সন্ধ্যা ৬টা - রাত ১০টা
              </div>

            </div>

            {/* ACTION */}
            <div className="flex md:flex-col gap-3 md:justify-center">

              <button
                onClick={() => navigate("/appointment")}
                className="w-full md:w-auto px-4 py-2 rounded-lg bg-gradient-to-r from-[#cfd9ff] via-[#e0c3fc] to-[#fbc2eb] font-semibold"
              >
                অ্যাপয়েন্টমেন্ট
              </button>

              <button className="w-full md:w-auto px-4 py-2 rounded-lg border border-blue-500 text-blue-500">
                বিস্তারিত
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default DoctorListPage;