import React, { useState } from "react";
import { BadgeCheck, BriefcaseMedical, Clock3, ChevronDown, MapPin, } from "lucide-react";

const DoctorCard = ({ doctor }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <div className="w-full max-w-[740px] rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            {/* Doctor Information */}
            <div className="flex gap-5">
                {/* Doctor Image */}
                <div className="shrink-0">
                    <img src={doctor?.image_url} alt={doctor?.image_url}
                        className="h-[92px] w-[92px] rounded-2xl object-cover bg-gray-100"
                    />
                </div>

                {/* Doctor Details */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-800">
                            {doctor?.name}
                        </h2>

                        <BadgeCheck
                            size={17}
                            className="fill-sky-400 text-white"
                        />
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                        {doctor?.degree_name}
                    </p>


                    {doctor?.specialties?.map((sp) => {
                        return <p className="mt-2 text-sm font-medium text-blue-500">{sp?.name}</p>
                    })}


                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <BriefcaseMedical size={15} />
                        <span>{doctor?.experience}</span>
                    </div>
                </div>

                {/* Rating */}
                <div className="flex shrink-0 items-start gap-[2px] pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            className={`text-xl leading-none ${star <= 4
                                ? "text-yellow-400"
                                : "text-gray-300"
                                }`}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            {/* Hospital / Chamber */}
            {doctor?.hospitals?.map((hos) => {
                return <div className="mt-5 rounded-xl border border-blue-200 bg-white px-5 py-4">

                    <div className="flex gap-3">
                        <div className="mt-0.5 text-blue-400">
                            <MapPin size={18} />
                        </div>

                        <div>
                            <h3 className="text-sm font-semibold text-gray-700">
                                {hos?.hospital?.name}
                            </h3>

                            <p className="mt-1 text-xs text-gray-500">
                                {hos?.hospital?.address}
                            </p>
                        </div>
                    </div>

                    <div className="mt-5 flex items-center gap-3 text-sm text-blue-400">
                        <Clock3 size={17} />

                        <span>
                            সময়সূচী:{" "}<span className="">{hos?.schedules?.map((day) => {
                                return <span className="pr-2">{day.name}</span>
                            })}</span>
                            <span className="mr-2">|</span>
                            <span className="font-medium">{hos?.time}</span>
                        </span>
                    </div>
                </div>
            })}


            {/* Treatment Fields */}
            <div className="mt-7">
                <div className="flex items-start gap-3">
                    <p className="mt-1 shrink-0 text-sm font-medium text-gray-500">
                        চিকিৎসার ক্ষেত্র:
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {doctor?.specialties?.map((item, index) => (
                            <span
                                key={index}
                                className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5 text-xs text-gray-500"
                            >
                                {item?.name}
                            </span>
                        ))}

                        {doctor?.specialties?.length > 6 && (
                            <button
                                onClick={() => setShowMore(!showMore)}
                                className="flex items-center justify-center rounded-full p-1 text-gray-400 hover:bg-gray-100"
                            >
                                <ChevronDown
                                    size={20}
                                    className={`transition-transform ${showMore ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Buttons */}
            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <button
                    type="button"
                    className="h-14 rounded-xl border border-blue-300 bg-white text-sm font-medium text-blue-500 transition hover:bg-blue-50"
                >
                    অ্যাপয়েন্টমেন্ট নিন
                </button>

                <button
                    type="button"
                    className="h-14 rounded-xl border border-blue-300 bg-white text-sm font-medium text-blue-500 transition hover:bg-blue-50"
                >
                    বিস্তারিত দেখুন
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;