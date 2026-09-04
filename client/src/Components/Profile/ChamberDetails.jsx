import React, { useState, useEffect } from "react";
import SelectionComponent from "../Input/SelectionComponent";
import InputComponent from "../Input/InputComponent";
import RightArrow from "../Icon/RightArrow";

const ChamberDetails = ({ onClick, user, exactUser, handleChange, hospital }) => {

    const weekDays = [
        { id: 6, name: "Saturday" },
        { id: 0, name: "Sunday" },
        { id: 1, name: "Monday" },
        { id: 2, name: "Tuesday" },
        { id: 3, name: "Wednesday" },
        { id: 4, name: "Thursday" },
        { id: 5, name: "Friday" },
    ];
    const [chambers, setChambers] = useState([
        {
            id: 1,
            name: "",
            type: "",
            address: "",
            latitude: "13.7825",
            longitude: "90.4066",
            physical: false,
            video: false,
            phone: false,
            new_visit_fee: 0,
            follow_up_fee: 0,
            report_see_fee: 0,
            schedules: []
        },
    ]);

    useEffect(() => {
        setChambers(user?.hospitals)
    }, [user])


    const updateChamber = (id, field, value) => {
        setChambers((prev) =>
            prev.map((chamber) =>
                chamber.id === id
                    ? {
                        ...chamber,
                        [field]: value,
                    }
                    : chamber
            )
        );
    };

    const updateConsultation = (id, type, value) => {
        setChambers((prev) =>
            prev.map((chamber) =>
                chamber.id === id
                    ? {
                        ...chamber,
                        consultation: {
                            ...chamber.consultation,
                            [type]: value,
                        },
                    }
                    : chamber
            )
        );
    };

    const addChamber = () => {
        setChambers((prev) => [
            ...prev,
            {
                id: Date.now(),
                name: "",
                type: "",
                address: "",
                latitude: "13.7825",
                longitude: "90.4066",
                physical: false,
                video: false,
                phone: false,
                new_visit_fee: 0,
                follow_up_fee: 0,
                report_see_fee: 0,
                schedules: []
            }
        ]);
    };

    const removeChamber = (id) => {
        if (chambers.length === 1) return;

        setChambers((prev) => prev.filter((chamber) => chamber.id !== id));
    };

    const handleSubmit = async () => {
        console.log(chambers)
        const token = localStorage.getItem('token')
        const response = await fetch(`${BaseUrl}/api/create/chamber`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({ chambers: chambers })
        });
        const data = await response.json()
    };

    const handleChamberChange = (chamberId, field, value) => {
        setChambers((prev) =>
            prev.map((chamber) =>
                chamber.id === chamberId
                    ? {
                        ...chamber,
                        [field]: value,
                    }
                    : chamber
            )
        );
    };
    const handleScheduleChange = (chamberId, day) => {
        setChambers((prev) =>
            prev.map((chamber) => {
                if (chamber.id !== chamberId) {
                    return chamber;
                }

                const existingDay = chamber.schedules.find(
                    (item) => item.day_id === day.id
                );

                // If day already exists, remove it
                if (existingDay) {
                    return {
                        ...chamber,
                        schedules: chamber.schedules.filter(
                            (item) => item.day_id !== day.id
                        ),
                    };
                }

                // Otherwise add it
                return {
                    ...chamber,
                    schedules: [
                        ...chamber.schedules,
                        {
                            chamber_id: chamber.id,
                            day_id: day.id,
                            name: day.name,
                            active: true,
                        },
                    ],
                };
            })
        );
    };

    return (
        <div className="w-full rounded-xl border border-[#D6A94C] bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-7">
                <h2 className="text-[12px] font-semibold text-[#15558C]">
                    Chamber & Consultation Details
                </h2>

                <p className="mt-1 text-[10px] text-gray-500">
                    Add your practice locations and consultation preferences
                </p>
            </div>

            {/* Chambers */}
            <div className="space-y-8">
                {chambers.map((chamber, index) => (
                    <div key={chamber.id}>
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="text-[12px] font-semibold text-[#A65A28]">
                                Chamber {index + 1}
                            </h3>

                            <button>Remove</button>
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                            <SelectionComponent label={'Hospital/ Clinic Name'} options={hospital} default_value={chamber?.name} onSelect={(v) => {
                                handleChamberChange(chamber.id, "name", v?.name)
                                handleChamberChange(chamber.id, "hospital_id", v?.id)
                                handleChamberChange(chamber.id, "doctor_id", exactUser?.id)
                            }} />
                            <SelectionComponent label={'Select Type'} options={[
                                { id: "hospital", name: "Hospital" },
                                { id: "clinic", name: "Clinic" },
                                { id: "diagnostic", name: "Diagnostic Center" },
                                { id: "private", name: "Private Chamber" },
                            ]} default_value={chamber?.type} onSelect={(v) => handleChamberChange(chamber.id, "type", v?.name)} />
                        </div>


                        <div className="mt-4">
                            <InputComponent label={'Chamber Address'} value={chamber?.address} onChange={(v) => handleChamberChange(chamber.id, "address", v)} />
                        </div>


                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <InputComponent label={'Latitude (Optional)'} value={chamber?.latitude} onChange={(v) => handleChamberChange(chamber.id, "latitude", v)} />
                            <InputComponent label={'Longitude (Optional)'} value={chamber?.longitude} onChange={(v) => handleChamberChange(chamber.id, "longitude", v)} />
                        </div>

                        <div>
                            <div className="my-5">
                                <h2 className="text-[13px] font-semibold text-[#1f4e79]">
                                    Consultation Fees & Payment
                                </h2>
                            </div>

                            {/* Fees */}
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 text-[13px]">
                                <InputComponent label={'New Visit Fee (Tk)'} value={chamber?.new_visit_fee} onChange={(v) => handleChamberChange(chamber.id, "new_visit_fee", v)} />
                                <InputComponent label={'Follow-up Fee (Tk)'} value={chamber?.follow_up_fee} onChange={(v) => handleChamberChange(chamber.id, "follow_up_fee", v)} />
                                <InputComponent label={'Report Showing Fee (Tk)'} value={chamber?.report_see_fee} onChange={(v) => handleChamberChange(chamber.id, "report_see_fee", v)} />
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <label className="mb-3 block text-[10px] font-semibold text-gray-800">
                                    Consultation Type
                                </label>

                                <div className="flex flex-wrap items-center gap-7">
                                    {[{ id: "physical", name: "Physical" },
                                    { id: "video", name: "Video Call" },
                                    { id: "phone", name: "Phone Call" }].map((type) => (
                                        <label
                                            key={type.id}
                                            className="flex cursor-pointer items-center gap-2"
                                        >
                                            <input
                                                type="checkbox"
                                                checked={chamber[type.id]}
                                                onChange={(e) => handleChamberChange(chamber.id, type.id, e.target.checked)}
                                                className="h-[14px] w-[14px] cursor-pointer rounded border-gray-300 accent-[#15558C]"
                                            />

                                            <span className="text-[10px] text-gray-800">
                                                {type.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                            <InputComponent label={'Time'} value={chamber?.time} onChange={(v) => handleChamberChange(chamber.id, "time", v)} />
                        </div>

                        <div>
                            <div className="mt-6">
                                <label className="mb-3 block text-[13px] font-semibold text-gray-800">
                                    Weekly Visiting Schedule
                                </label>

                                <div className="flex flex-wrap justify-start items-center gap-5">
                                    {weekDays.map((day) => {
                                        const isSelected = chamber.schedules.some((schedule) => schedule.name === day.name);

                                        return (
                                            <label
                                                key={day.id}
                                                className="flex cursor-pointer items-center gap-2 rounded-md border border-gray-100 bg-gray-50 p-2"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() =>
                                                        handleScheduleChange(chamber.id, day)
                                                    }
                                                    className="h-[14px] w-[14px] cursor-pointer rounded border-gray-300 accent-[#15558C]"
                                                />

                                                <span className="text-[10px] font-medium text-gray-800">
                                                    {day.name}
                                                </span>
                                            </label>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>


                        {/* Divider between chambers */}
                        {index !== chambers.length - 1 && (
                            <div className="mt-7 border-b border-gray-200" />
                        )}
                    </div>
                ))}
            </div>

            {/* Add Chamber */}
            <button
                type="button"
                onClick={addChamber}
                className="mt-7 flex h-7 w-full items-center justify-center 
          gap-2 rounded-md border border-gray-200 bg-white 
          text-[10px] font-medium text-gray-700
          transition hover:border-[#15558C] hover:bg-gray-50"
            >
                {/* <Plus size={13} /> */}
                Add another chamber
            </button>

            {/* Save */}
            <div className="mt-7 flex justify-end">
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex h-7 items-center gap-1 rounded-full 
            border border-[#20BFE5] bg-white px-4 
            text-[10px] font-medium text-gray-700
            transition hover:bg-[#20BFE5] hover:text-white"
                >
                    Save & Continue
                    <RightArrow />
                </button>
            </div>
        </div>
    );
};

export default ChamberDetails;