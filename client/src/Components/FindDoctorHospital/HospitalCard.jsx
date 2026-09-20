import React from "react";
import { BadgeCheck, MapPin, Star, Stethoscope, } from "lucide-react";

const HospitalCard = ({ key, hospital }) => {


    return (
        <div key={key} className="w-full rounded-2xl bg-white px-8 py-7 shadow-sm border border-gray-100">
            <div className="flex items-center gap-7">

                {/* Hospital Logo */}
                <div className="flex h-[105px] w-[105px] shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white">
                    <img
                        src={hospital?.image_url}
                        alt={hospital?.image_url}
                        className="h-full w-full object-contain"
                    />
                </div>

                {/* Main Information */}
                <div className="min-w-0 flex-1">

                    {/* Top Row */}
                    <div className="flex items-center gap-5">
                        <span className="text-sm font-medium text-teal-500">
                            {hospital?.type}
                        </span>

                        <span className="text-sm text-gray-400">
                            ২৪/৭ স্বাস্থ্য সেবা
                        </span>
                    </div>

                    {/* Hospital Name */}
                    <div className="mt-2 flex items-center gap-2">
                        <h2 className="text-lg font-bold text-[#41639a]">
                            {hospital?.name}
                        </h2>
                        <BadgeCheck size={17} className="fill-sky-400 text-white"
                        />
                    </div>

                    {/* Description */}
                    <p className="mt-1 text-sm text-gray-500">
                        {hospital?.description}
                    </p>

                    {/* Doctors */}
                    <div className="mt-4 flex items-center gap-7 text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                            <Stethoscope size={16} className="text-sky-400" />

                            <span>
                                ডাক্তার{" "}
                                <span className="font-medium text-gray-600">
                                    {hospital?.doctors?.length} জন
                                </span>
                            </span>
                        </div>

                        <div>
                            বিশেষজ্ঞ{" "}
                            <span className="font-medium text-gray-600">
                                {hospital?.doctors?.length} জন
                            </span>
                        </div>
                    </div>

                    {/* Address */}
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={15} className="text-sky-400" />
                        <span>{hospital?.upazila?.name}, {hospital?.district?.name}, {hospital?.division?.name}</span>
                    </div>
                </div>

                {/* Right Section */}
                <div className="flex w-[145px] shrink-0 flex-col items-center">

                    {/* Rating */}
                    <div className="flex items-center gap-[2px]">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                size={17}
                                className={
                                    star <= 4
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-yellow-400"
                                }
                            />
                        ))}
                    </div>

                    <button className="mt-3 text-xs text-blue-400 hover:underline">
                        {'রোগীদের মতামত'}
                    </button>

                    {/* Appointment */}
                    <button className="mt-4 h-9 w-full rounded-full border border-sky-300 bg-white text-xs font-medium text-blue-500 transition hover:bg-sky-50">
                        ফি শুরু: ৮০০-১৫০০ ৳
                    </button>

                    {/* Details */}
                    <button className="mt-2 h-9 w-full rounded-full border border-sky-300 bg-white text-xs font-medium text-blue-500 transition hover:bg-sky-50">
                        বিস্তারিত দেখুন
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HospitalCard;