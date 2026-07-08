import React, { useEffect, useState } from 'react';
import Edit from '../../icons/Edit'
import Remove from '../../icons/Remove';

const User = () => {
    const [data, setData] = useState([])


    const FetchUser = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/get/users`, {
            method: 'GET',
            headers: {
                "authorization": token,
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await response.json();
        setData(data?.items)
    }

    useEffect(() => {
        FetchUser()
    }, [])

    console.log(data);
    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr className='shadow'>
                        <th scope="col" className="pl-4">
                            <div className="flex items-center">
                                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                <label for="checkbox-all-search" className="sr-only">checkbox</label>
                            </div>
                        </th>
                        <th scope="col" className="pl-1 py-3">
                            user name
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Email
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Phone
                        </th>
                        <th scope="col" className="px-4 py-3 text-right pr-5">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map(({ id, first_name, last_name, email, username, password, image_url }) => {
                            return <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="w-4 p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                    </div>
                                </td>
                                <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {first_name} {last_name}
                                </th>
                                <td className="px-4 py-3">
                                    {email}
                                </td>
                                <td className="px-4 py-4">
                                    {username}
                                </td>
                                <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">
                                    <Edit size='25px' />
                                    <Remove size='25px' />
                                </td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default User;