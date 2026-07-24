import React, { useEffect, useState } from 'react';
import BaseUrl from '../../Constant';
import NotiFi from '../Input/Notification';
import DCart from './Dcard';




const Dashboard = ({ info = {} }) => {

    const [message, setMessage] = useState({ id: Date.now(), mgs: '' });
    const [summary, setSummary] = useState({})


    useEffect(() => {
        document.title = "Dashboard - Care-Connect";
    }, []);


    return (
        <div className='bg-[#F7F7FF] dark:bg-[#040404] pt-6 pl-3 pr-2 min-h-screen pb-12 relative'>
            <NotiFi message={message} />

            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
                <DCart data={{name:"patient", title: "Total Patients", amount: "2500+" }} className='border-blue-500 bg-cyan-400' black={false} white={false}/>
                <DCart data={{name:"appoinment", title: "Total Apoinment", amount: "250+" }} className="border-red-500 bg-gradient-to-r from-green-300 to-red-300" black={true} white={false}/>
                <DCart data={{name:"organ", title: "Total Surgery", amount: "119+" }} className="bg-pink-200 border-pink-500" black={true} white={false}/>
                <DCart data={{name:"revinue", title: "Total Revineue", amount: "$2500.89" }} className="bg-gradient-to-r from-purple-600 to-pink-200 border-yellow-300" black={false} white={true}/>
            </div>




            <div className='grid grid-cols-1 lg:grid-cols-2 mt-5 gap-5 lg:gap-7 pb-5 dark:bg-[#040404] dark:text-white rounded-md'>
                <div className='grid col-span-1 lg:col-span-2'>

                    <div className='rounded-xl overflow-hidden bg-[#FFFFFF] dark:bg-[#040404] p-3 shadow-lg dark:text-white'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-[20px]'>Patients Management</h1>
                        </div>
                        {/* <InvoiceTemp info={info} invoices={invoices} RecentInvoice={RecentInvoice} /> */}

                    </div>
                </div>


            </div>


        </div>
    );
};

export default Dashboard;