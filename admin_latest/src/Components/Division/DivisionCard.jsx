import React, { useState } from "react";

const DivisionCard = ({ item, i, }) => {


    function formatDate(isoString) {
        const date = new Date(isoString);

        const day = date.getDate();
        const montd = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        return `${day} ${montd} ${year}`;
    }



    return (
        <tr className={`${i % 2 === 1 ? 'bg-[#FAF9EE] dark:bg-[#040404] dark:text-white' : 'bg-white dark:bg-[#1C2426] dark:text-white'} border-b`}>
            <td className="py-1.5 px-4 w-4 border-l">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <td className="px-2 py-1.5 border-x font-thin">{item?.name}</td>
            <td className="border-r font-thin">
                <div className="">
                    {item?.districts?.map((attr, i) => {
                        return <div className={`flex gap-1 ${i > 0 ? 'border-t' : ''}`}>
                            <div className="border-r w-[124px]">
                                <h1 className="p-2">{attr?.name}</h1>
                            </div>
                            <div className="flex justify-start items-start flex-wrap gap-2 px-1 py-1.5 mt-[3px]">
                                {attr?.upazilas?.map((att_val) => {
                                    return <h1 className="px-1 text-[13px] border-blue-600">{att_val?.name}</h1>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </td>
            <td className="px-2 py-1.5 border-r font-thin">
                <div className="flex justify-start items-center">{formatDate(item?.createdAt)}</div>
            </td>
        </tr>
    )
}

export default DivisionCard