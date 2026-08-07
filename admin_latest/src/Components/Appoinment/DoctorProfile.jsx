


export default function DoctorProfile({ doctor }) {
  return (
    <div className="mx-auto bg-white p-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Doctor Image */}
        <div className="w-40 h-40 flex-shrink-0">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-full h-full rounded-full border-4 border-amber-700 object-cover"
          />
        </div>

        {/* Doctor Information */}
        <div className="flex-1">
          <div className="flex items-center gap-3">
            {/* Verified Circle */}
            <div className="w-7 h-7 rounded-full border-2 border-blue-500 flex items-center justify-center">
              <span className="text-blue-500 text-sm">✓</span>
            </div>

            <h1 className="text-3xl font-semibold text-gray-700">
              {doctor.name}
            </h1>
          </div>

          <p className="text-red-500 text-xl mt-2">
            {doctor.specialist}
          </p>

          <p className="font-semibold text-lg mt-2">
            {doctor.degree}
          </p>

          <p className="text-xl mt-3">
            {doctor.experience}
          </p>
        </div>
      </div>
      {/* Skills */}
      <div className="mt-8 flex justify-start gap-5 items-center">

        <div>
          <div className="relative bg-gray-200 px-8 py-4 flex items-center font-semibold text-lg">
            বিশেষ দক্ষতা
            <div className="absolute right-[-28px] top-0 w-0 h-0
      border-t-[30px] border-b-[30px]
      border-l-[28px] border-t-transparent
      border-b-transparent border-l-gray-200"
            ></div>
          </div>
        </div>


        <div className="flex flex-wrap gap-x-5 gap-y-2 p-5 text-sm flex-1 border ml-5 bg-[#F9F7FB]">
          {doctor?.specialties?.map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>
      </div>

      {/* Chamber */}
      <div className="mt-6 flex justify-between bg-gradient-to-r from-[#DCF6F9] to-[#DCF6F9] p-2.5">
        <div className="pl-5">
          <h3 className="font-bold text-lg">
            {doctor?.hospital?.name}
          </h3>
          <p className="text-right text-sm">{doctor?.hospital?.address}</p>
        </div>

        {/* Schedule */}
        <div>
          <div className="flex flex-wrap gap-3">
            {doctor?.schedule?.map((day) => (
              <div key={day.day} className={`w-10 h-10 rounded-full border flex items-center justify-center text-xs
          ${day.active ? "bg-sky-400 text-white border-sky-400" : "bg-white border-black"}`}>
                {day.day}
              </div>
            ))}
          </div>

          <p className="mt-1.5 text-sm">
            {doctor?.time}
          </p>
        </div>

        {/* Appointment Button */}
        <div>
          <button className="bg-blue-700 hover:bg-blue-800 text-white text-xl px-10 py-3 font-semibold mt-1.5">
            অ্যাপয়েন্টমেন্ট নিন
          </button>
        </div>
      </div>
    </div>
  );
}