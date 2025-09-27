

const Recenthealth = ({ title }) => {
    let data = [
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
            "category": "ড. আবুল খায়ের, উদ্ভিদ বিজ্ঞানী",
            "title": "বায়ুদূষণ ও ফুসফুসের রোগ: গ্লোবাল স্টাডি” ",
            "description": "আমার মনে হয়, তুমি চাইলে আমি স্বাস্থ্য চিন্তা সেকশনের জন্য এক বছরের কন্টেন্ট ক্যালেন্ডার তৈরি করে দিতে পারি যেখানে মাসভিত্তিক দেশি ও বিদেশি",
            "author": "বিস্তারিত পড়ুন"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1529665253569-6d01c0eaf7b6?q=80&w=400&auto=format&fit=crop",
            "category": "খাদ্য ও পুষ্টি",
            "title": "ডায়াবেটিসে ব্রেকফাস্ট কেমন হবে?",
            "description": "লো-জিআই খাবার, ফাইবার এবং প্রোটিনের সঠিক সমন্বয়।",
            "author": "বিস্তারিত পড়ুন"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1541534401786-2077eed87a74?q=80&w=400&auto=format&fit=crop",
            "category": "History",
            "title": "শুরুতেই ২০-মিনিট ফুল-বডি রুটিন লো-জিআই খাবার, ফাইবার এবং প্রোটিনের সঠিক সমন্বয়।",
            "description": "কোনো সরঞ্জাম ছাড়াই বাড়িতে করা যায় এমন ব্যায়াম। লো-জিআই খাবার, ফাইবার এবং প্রোটিনের সঠিক সমন্বয়।",
            "author": "বিস্তারিত পড়ুন"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
            "category": "মানসিক স্বাস্থ্য",
            "title": "মাইন্ডফুলনেসে শুরু: ৫ মিনিট অনুশীলন",
            "description": "নবীনদের জন্য শ্বাস-প্রশ্বাস ও মনোযোগের কৌশল।",
            "author": "বিস্তারিত পড়ুন"
        }
    ]
    return <div className='w-full py-10 px-56'>
        <div className='border-b flex justify-between items-center pb-3'>
            <h1 className='font-bold text-xl text-[#6A1B9A]'>{title}</h1>
            <h1 className='text-[#1976D2] font-semibold text-[12px]'>সমস্ত বিষয় পড়ুন</h1>
        </div>
        <div className='w-full gap-8 pt-6 px-56'>
            {data.map((item) => {
                return <div className='grid grid-cols-3 mx-auto gap-8 mt-8 cursor-pointer transform transition-all duration-300 hover:-translate-y-2' onClick={() => { goto(`/content/details/${item?.id}`) }}>
                    <div className="grid col-span-2">
                        <div>
                            <div>
                                <button className='px-4 bg-[#E8D4F4] text-[13px] rounded-full py-1'>{item?.category}</button>
                            </div>
                            <h1 className='font-semibold py-2 text-[15px] pl-1 my-2 text-wrap leading-6 pr-8'>{item?.title}</h1>
                            <h1 className='font-semibold pb-1 text-xs pl-1 pr-8 text-wrap leading-6'>{item?.description}</h1>
                        </div>
                    </div>
                    <div className="">
                        <img src={item?.imageUrl} alt='' className='h-[200px] w-full rounded-2xl' />
                    </div>

                </div>
            })}
        </div>
    </div>
}

export default Recenthealth