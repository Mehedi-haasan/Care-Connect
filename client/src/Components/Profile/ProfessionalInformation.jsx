import React, { useEffect, useState } from "react";
import RightArrow from "../Icon/RightArrow";
import SelectionComponent from "../Input/SelectionComponent";
import InputComponent from "../Input/InputComponent";
import Edit from "../Icon/Edit";
import Add from "../Icon/Add";
import BASE_URL from "../URL/baseurl";

const ProfessionalInformation = ({ onClick, user, exactUser, handleChange,hospital }) => {
    const designations = [
        {
            id: 1,
            name: "Associate Professor",
        },
        {
            id: 2,
            name: "Professor",
        },
        {
            id: 3,
            name: "Consultant",
        },
        {
            id: 4,
            name: "Medical Officer",
        },
    ];

    const [addDegree, setAddDegree] = useState(false)
    const [degree, setDegree] = useState({})
    const [specialty, setSpecialty] = useState(false)
    const [values, setValue] = useState({ type: 'Primary Specialty' })


    const CreateDegree = async () => {
        degree['user_id'] = user?.id
        const token = localStorage.getItem('token')
        const response = await fetch(`${BASE_URL}/api/create/degree`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(degree)
        });
        const data = await response.json()

    }

    const CreateSpecialty = async () => {
        values['user_id'] = exactUser?.id
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/post/specialtie`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values)
        });
        const data = await response.json()
    }





    return (
        <div className="w-full rounded-xl border border-gray-400 bg-white px-5 py-5 shadow-sm sm:px-8 sm:py-6">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-[14px] font-semibold text-blue-700">
                    Professional & Educational Information
                </h2>

                <p className="mt-1 text-[14px] text-gray-500">
                    Your qualifications, experience, and professional credentials
                </p>
            </div>

            <div className="space-y-4">

                {/* BMDC + Medical College */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                        <InputComponent label={'BMDC Registration Number'} value={exactUser?.reg_number} onChange={(v) => handleChange('reg_number', v)} />
                        <p className="mt-1.5 pl-2 text-[9px] text-gray-400">
                            Required for practice in Bangladesh
                        </p>
                    </div>

                    <div className="pt-1.5">
                        <SelectionComponent label={'Medical College / University'} options={hospital} default_value={exactUser?.graduation_from} onSelect={(v) => handleChange('graduation_from', v?.name)} />
                    </div>
                </div>

                {/* Degrees */}
                <div>
                    <div className='flex justify-between items-start text-[14px]'>
                        <label className="mb-2 block font-semibold text-gray-800">
                            Degrees & Qualifications{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Add onClick={() => setAddDegree(!addDegree)} />
                    </div>
                    <div className=''>
                        {addDegree && <div className='grid col-span-2'>
                            <div className='flex justify-between items-center'>
                                <InputComponent label={'Degree Name'} onChange={(v) => { setDegree({ ...degree, name: v }) }} className={'rounded'} />
                                <InputComponent label={'Major'} onChange={(v) => { setDegree({ ...degree, major: v }) }} />
                                <InputComponent label={'Institution Name'} onChange={(v) => { setDegree({ ...degree, institute: v }) }} />
                                <InputComponent label={'Passing Year'} onChange={(v) => { setDegree({ ...degree, year: v }) }} />
                                <button onClick={CreateDegree} className='border rounded py-1.5 px-2.5 mt-6'>Save</button>
                            </div>
                        </div>}

                        {user?.degrees?.map((degree) => {
                            return <div className='flex justify-between items-start'>
                                <p className="text-[13px] text-gray-400">{degree?.name} in {degree?.major}, {degree?.institute}, {degree?.year}</p>
                                <Edit />
                            </div>
                        })}


                    </div>

                </div>

                {/* Graduation + Experience */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <InputComponent label={'Graduation Year'} value={exactUser?.reg_number} onChange={(v) => handleChange('reg_number', v)} />
                    <InputComponent label={'Total Experience (years)'} value={exactUser?.experience} onChange={(v) => handleChange('experience', v)} />
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-4">
                    <div className='flex justify-between items-start text-[14px]'>
                        <label className="mb-2 block font-semibold text-gray-800">Specialtys</label>
                        <Add onClick={() => setSpecialty(!specialty)} />
                    </div>
                    {specialty && <div className='flex justify-between items-center gap-5'>
                        <div className="pt-1.5 w-[350px] z-40">
                            <SelectionComponent options={[{ id: 1, name: 'Primary Specialty' }, { id: 2, name: 'Sub-Specialty' }]} default_value={values?.type}
                                onSelect={(v) => { setValue({ ...values, type: v?.name }) }} label={'Specialty Type'} />
                        </div>
                        <InputComponent label={'Name'} onChange={(v) => setValue({ ...values, name: v })} />

                        <button onClick={CreateSpecialty} className='border rounded py-1.5 px-2.5 mt-6'>Save</button>
                    </div>}


                    {user?.specialties?.map((add) => {
                        return <div className='flex justify-between items-start text-[13px] text-gray-400'>
                            <h1>{add?.type} : {add?.name}</h1>
                            <Edit />
                        </div>
                    })}

                    {/* Designation + Workplace */}
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <SelectionComponent label={'Current Designation'} options={designations} default_value={user?.designation} onSelect={(v) => {
                                handleChange('designation', v?.name);
                                user['designation'] = v?.name
                            }} />
                            <p className="mt-1.5 pl-2 text-[9px] text-gray-400">
                                Required for practice in Bangladesh
                            </p>
                        </div>

                        {/* Workplace */}
                        <div>
                            <SelectionComponent label={'Current Workplace'} options={hospital} default_value={user?.hospital?.name} onSelect={(v) => {
                                handleChange('hospital_id', v?.id);
                                user['hospital']['name'] = v?.name
                            }} />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="mt-4">
                        <label className="mb-2 block text-[14px] font-semibold text-gray-800">
                            Professional Summary / Bio
                        </label>

                        <textarea
                            rows={3}
                            value={exactUser?.bio}
                            onChange={(e)=>handleChange('bio', e.target.value)}
                            placeholder="Brief introduction of your expertise, achievements, and approach to patient care..."
                            className="w-full resize-none rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-[14px] text-gray-700 outline-none placeholder:text-gray-400 focus:border-blue-400 focus:bg-white"
                        />

                        <p className="mt-1.5 pl-2 text-[9px] text-gray-400">
                            *This will be displayed on your public profile
                        </p>
                    </div>
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
    );
};

export default ProfessionalInformation;