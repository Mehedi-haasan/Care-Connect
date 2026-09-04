import React, { useState } from "react";

const ConsultationPayment = () => {
    const [formData, setFormData] = useState({
        newVisitFee: "1000",
        followUpFee: "500",
        reportShowingFee: "300",

        paymentMethods: [],

        bankName: "",
        accountName: "",
        accountNumber: "",
        routingNumber: "",
        contactNumber: "",
    });

    const paymentMethods = [
        "Cash",
        "bKash",
        "Nagad",
        "Rocket",
        "Credit/Debit Card",
        "Bank Transfer",
    ];

    const handleChange = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePaymentMethod = (method) => {
        setFormData((prev) => {
            const exists = prev.paymentMethods.includes(method);

            return {
                ...prev,
                paymentMethods: exists
                    ? prev.paymentMethods.filter((item) => item !== method)
                    : [...prev.paymentMethods, method],
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(formData);
    };

    return (
        <div className="w-full">
            <form
                onSubmit={handleSubmit}
                className="w-full rounded-xl border border-[#d8b45b] bg-white px-6 py-5 shadow-sm"
            >
                {/* Header */}
                <div className="mb-5">
                    <h2 className="text-[13px] font-semibold text-[#1f4e79]">
                        Consultation Fees & Payment
                    </h2>

                    <p className="mt-1 text-[11px] text-gray-600">
                        Set your consultation fees and payment preferences
                    </p>
                </div>

                {/* Fees */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {/* New Visit */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-semibold text-gray-800">
                            New Visit Fee (Tk)
                        </label>

                        <input
                            type="number"
                            value={formData.newVisitFee}
                            onChange={(e) =>
                                handleChange("newVisitFee", e.target.value)
                            }
                            className="h-[28px] w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-[10px] text-gray-700 outline-none transition focus:border-[#1f9dcc] focus:bg-white"
                        />
                    </div>

                    {/* Follow-up */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-semibold text-gray-800">
                            Follow-up Fee (Tk)
                        </label>

                        <input
                            type="number"
                            value={formData.followUpFee}
                            onChange={(e) =>
                                handleChange("followUpFee", e.target.value)
                            }
                            className="h-[28px] w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-[10px] text-gray-700 outline-none transition focus:border-[#1f9dcc] focus:bg-white"
                        />
                    </div>

                    {/* Report Showing */}
                    <div>
                        <label className="mb-1.5 block text-[10px] font-semibold text-gray-800">
                            Report Showing Fee (Tk)
                        </label>

                        <input
                            type="number"
                            value={formData.reportShowingFee}
                            onChange={(e) =>
                                handleChange(
                                    "reportShowingFee",
                                    e.target.value
                                )
                            }
                            className="h-[28px] w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-[10px] text-gray-700 outline-none transition focus:border-[#1f9dcc] focus:bg-white"
                        />
                    </div>
                </div>

                {/* Divider */}
                <div className="my-5 border-t border-[#8ba0b8]" />

                {/* Payment Methods */}
                <div>
                    <h3 className="mb-3 text-[10px] font-semibold text-gray-800">
                        Accepted Payment Method(s)
                    </h3>

                    <div className="grid grid-cols-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3">
                        {paymentMethods.map((method) => (
                            <label
                                key={method}
                                className="flex cursor-pointer items-center gap-2 text-[10px] text-gray-700"
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.paymentMethods.includes(
                                        method
                                    )}
                                    onChange={() =>
                                        handlePaymentMethod(method)
                                    }
                                    className="h-[13px] w-[13px] cursor-pointer rounded border-gray-300 accent-[#1f9dcc]"
                                />

                                <span>{method}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Bank Details */}
                <div className="mt-5">
                    <h3 className="mb-3 text-[10px] font-semibold text-gray-800">
                        Accepted Payment Method(s)
                    </h3>

                    <div className="rounded-md border border-gray-100 bg-gray-50 px-5 py-3">
                        <div className="grid grid-cols-1 gap-y-1">
                            <BankField
                                label="Bank Name:"
                                value={formData.bankName}
                                onChange={(value) =>
                                    handleChange("bankName", value)
                                }
                            />

                            <BankField
                                label="Account Name:"
                                value={formData.accountName}
                                onChange={(value) =>
                                    handleChange("accountName", value)
                                }
                            />

                            <BankField
                                label="Account Number:"
                                value={formData.accountNumber}
                                onChange={(value) =>
                                    handleChange("accountNumber", value)
                                }
                            />

                            <BankField
                                label="Routing Number:"
                                value={formData.routingNumber}
                                onChange={(value) =>
                                    handleChange("routingNumber", value)
                                }
                            />

                            <BankField
                                label="Contact Number:"
                                value={formData.contactNumber}
                                onChange={(value) =>
                                    handleChange("contactNumber", value)
                                }
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                    <p className="text-[8px] text-gray-500">
                        For payment settlement purposes (Confidential)
                    </p>

                    <button
                        type="submit"
                        className="flex h-[27px] items-center justify-center gap-2 self-end rounded-full border border-[#35bde5] bg-white px-4 text-[10px] font-medium text-[#222] transition hover:bg-[#f0fbff]"
                    >
                        Save & Continue
                        <span className="text-[11px]">➜</span>
                    </button>
                </div>
            </form>
        </div>
    );
};

const BankField = ({ label, value, onChange }) => {
    return (
        <div className="flex items-center">
            <label className="w-[105px] shrink-0 text-[9px] text-gray-500">
                {label}
            </label>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-[19px] w-full border-none bg-transparent px-0 text-[9px] text-gray-700 outline-none"
            />
        </div>
    );
};

export default ConsultationPayment;