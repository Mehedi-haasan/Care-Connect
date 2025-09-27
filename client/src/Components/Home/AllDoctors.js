const AllDoctors = ({ title }) => {
    let data = [
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=300&auto=format&fit=crop",
            "title": "চর্মরোগ বিশেষজ্ঞ",
            "author": "ডা. তমালিকা দেব",
            "location":"নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=300&auto=format&fit=crop",
            "title": "জনস্বাস্থ্য বিশেষজ্ঞ",
            "author": "ডা. আরাফাত রহমান",
            "location":"নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?q=80&w=300&auto=format&fit=crop",
            "title": "কার্ডিওলজি",
            "author": "ডা. সায়েদ শফিক",
            "location":"নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
            "title": "পুষ্টিবিদ",
            "author": "শর্মিষ্ঠা ঘোষ",
            "location":"নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ"
        }
        ,
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop",
            "title": "সাইকিয়াট্রিস্ট",
            "author": "ডা. মেহেদী হাসান",
            "location":"নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1526256262350-7da7584cf5eb?q=80&w=400&auto=format&fit=crop",
            "title": "পুষ্টিবিদ",
            "author": "শর্মিষ্ঠা ঘোষ",
            "location":"নিউরোলজিস্ট, ঢাকা মেডিকেল কলেজ"
        }
    ]
    return <div className='w-full py-10 px-56'>
        <div className='border-b flex justify-between items-center pb-3'>
            <h1 className='font-bold text-xl text-[#6A1B9A]'>দক্ষ ও অভিজ্ঞ স্বাস্থ্যজীবীগণ</h1>
            <h1 className='text-[#1976D2] font-semibold text-[12px]'>সমস্ত বিষয় পড়ুন</h1>
        </div>
        <div className='grid grid-cols-3 w-full gap-8 pt-6'>
            {data.map((item) => {
                return <div className='grid grid-cols-3 cursor-pointer transform transition-all duration-300 hover:-translate-y-2' onClick={() => { goto(`/content/details/${item?.id}`) }}>
                    <div className="">
                        <img src={item?.imageUrl} alt='' className='h-[130px] w-full object-cover rounded-lg' />
                    </div>
                    <div className="border-y border-r rounded-r h-full w-full grid col-span-2">
                        <div className="pl-4">
                            <button className='px-1 py-1 text-sm'>{item?.title}</button>
                            <p className='px-1 text-md font-bold text-xl'>{item?.author}</p>
                            <p className='px-1 text-md pt-4 text-sm'>{item?.location}</p>
                        </div>
                    </div>
                </div>
            })}
        </div>
    </div>
}

export default AllDoctors