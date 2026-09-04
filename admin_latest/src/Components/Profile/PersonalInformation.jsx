import React from "react";
import RightArrow from "../../icons/RightArrow";
import { ChevronDown, CalendarDays } from "lucide-react";


const PersonalInformation = ({ onClick, user, handleChange }) => {
    return (
        <div className="min-h-screen bg-white">
            <div className="mx-auto ">



                {/* Main Form Card */}
                <div className="rounded-xl  bg-white shadow p-5">

                    {/* Header */}
                    <div className="mb-6">
                        <h2 className="text-sm font-semibold text-blue-700">
                            Personal Information
                        </h2>

                        <p className="mt-1 text-[14px] text-gray-500">
                            Your basic personal details and contact information
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-5">

                        {/* Row 1 */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Full Name */}
                            <div>
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    Full Name <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => handleChange('name', e.target.value)}
                                    placeholder={user?.name}
                                    value={user?.name}
                                    className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-gray-700 outline-none transition placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    Gender <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <select
                                        value={user?.gender || ""}
                                        onChange={(e) => handleChange("gender", e.target.value)}
                                        className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-[14px] text-gray-500 outline-none focus:border-blue-400 focus:bg-white"
                                    >
                                        <option value="" disabled>
                                            Select gender
                                        </option>

                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>

                                    <ChevronDown
                                        size={15}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Row 2 */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-12">

                            {/* Date of Birth */}
                            <div className="md:col-span-4">
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    Date of Birth <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <CalendarDays
                                        size={14}
                                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                    />

                                    <input
                                        type="date"
                                        onChange={(e) => handleChange('date_of_birth', e.target.value)}
                                        placeholder={user?.date_of_birth}
                                        value={user?.date_of_birth}
                                        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 pl-9 pr-3 text-[14px] text-gray-600 outline-none focus:border-blue-400 focus:bg-white"
                                    />
                                </div>
                            </div>

                            {/* Blood Group */}
                            <div className="md:col-span-4">
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    Blood Group
                                </label>

                                <div className="relative">
                                    <select
                                        value={user?.blood_group || ""}
                                        onChange={(e) => handleChange("blood_group", e.target.value)}
                                        className="h-9 w-full appearance-none rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-[14px] text-gray-500 outline-none focus:border-blue-400 focus:bg-white"
                                        defaultValue=""
                                    >
                                        <option value="" disabled>
                                            Select blood group
                                        </option>
                                        <option value="a+">A+</option>
                                        <option value="a-">A-</option>
                                        <option value="b+">B+</option>
                                        <option value="b-">B-</option>
                                        <option value="ab+">AB+</option>
                                        <option value="ab-">AB-</option>
                                        <option value="o+">O+</option>
                                        <option value="o-">O-</option>
                                    </select>

                                    <ChevronDown
                                        size={15}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* NID */}
                            <div className="md:col-span-4">
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    NID Number
                                </label>

                                <input
                                    type="text"
                                    onChange={(e) => handleChange('nid_num', e.target.value)}
                                    placeholder={user?.nid_num}
                                    value={user?.nid_num}
                                    className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                                />
                            </div>
                        </div>

                        {/* Row 3 */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Personal Mobile */}
                            <div>
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    Personal Mobile <span className="text-red-500">*</span>
                                </label>

                                <input
                                    type="tel"
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                    placeholder={user?.phone}
                                    value={user?.phone}
                                    className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                                />

                                <p className="mt-2 text-[10px] text-gray-400">
                                    Private - not shown to patients
                                </p>
                            </div>

                            {/* Public Mobile */}
                            <div>
                                <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                    Public Mobile <span className="text-red-500">*</span>
                                </label>

                                <div className="relative">
                                    <input
                                        type="tel"
                                        onChange={(e) => handleChange('phone', e.target.value)}
                                        placeholder={user?.phone}
                                        value={user?.phone}
                                        className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 pr-9 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                                    />

                                    <ChevronDown
                                        size={15}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                                    />
                                </div>

                                <p className="mt-2 text-[10px] text-gray-400">
                                    Visible to patients (if agreed)
                                </p>
                            </div>
                        </div>

                        {/* Present Address */}
                        <div>
                            <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                Present Address <span className="text-red-500">*</span>
                            </label>

                            <input
                                type="text"
                                onChange={(e) => handleChange('present_address', e.target.value)}
                                placeholder={user?.present_address}
                                value={user?.present_address}
                                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                            />
                        </div>

                        {/* Permanent Address */}
                        <div>
                            <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                                Permanent Address
                            </label>

                            <input
                                type="text"
                                onChange={(e) => handleChange('parmanent_address', e.target.value)}
                                placeholder={user?.parmanent_address}
                                value={user?.parmanent_address}
                                className="h-9 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                            />
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end pt-1">
                            <button onClick={onClick} className="group flex h-8 items-center gap-2 rounded-full border border-cyan-400 bg-white px-4 text-[13px] font-semibold text-gray-700 transition hover:bg-cyan-50">
                                Save & Continue
                                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-700 text-white transition group-hover:bg-cyan-500">
                                    <RightArrow />
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalInformation;