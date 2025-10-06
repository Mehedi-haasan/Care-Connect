import { useState } from 'react';
import RightBoldArrow from '../Common/RightBoldArrow';
import Advertisement from '../Common/Advertisement';
import Cart from '../Common/Cart';

const Category = () => {
    const [open, setOpen] = useState(false)
    let data = [
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
            "category": "মানসিক স্বাস্থ্য",
            "title": "কৌশোর বয়সে মানসিক বিকাশ প্রক্রিয়া ও যত্ন",
            "author": "ড. সামান্তা রহমান, বিশেষজ্ঞ, মানসিক স্বাস্থ্য"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
            "category": "Technology",
            "title": "Mastering JavaScript",
            "author": "Emily Johnson"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
            "category": "History",
            "title": "World War II Chronicles",
            "author": "Michael Brown"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=800&auto=format&fit=crop",
            "category": "Science",
            "title": "The Universe Explained",
            "author": "Sophia Williams"
        },
        {
            "id": 1,
            "imageUrl": "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop",
            "category": "Self-Help",
            "title": "The Power of Focus",
            "author": "David Lee"
        }
    ]
    return (
        <div className='bg-white min-h-screen'>
            <div className='px-56 py-4'>
                <div className='flex justify-start items-center gap-2 text-lg' onClick={() => { setOpen(!open) }}>
                    স্বাস্থ্য কথা
                    <RightBoldArrow />
                </div>
                <div className={`pl-2 overflow-hidden transition-all dark:text[#040404] duration-300 ease-in-out ${open ? "max-h-[500px]" : "max-h-0"} grid grid-cols-6 pb-10`}>
                    {['অ্যালার্জি', 'গ্যাস্ট্রিক', 'অ্যাজমা', 'মাইগ্রেন', 'হাইপারটেনশন', 'ডিপ্রেশন', 'ত্বকের ফাঙ্গাস', 'ডায়াবেটিস', 'জন্ডিস', 'সর্দি-কাশি']?.map((item) => {
                        return <div>
                            <button className='mt-2 py-1 float-left'>{item}</button>
                        </div>
                    })}
                </div>

            </div>
            <div className='px-56 py-4'>
                <Advertisement className={`bg-[#AFD7E2] text-[#8B61C2] w-[700px]`}/>
                <div className='w-full pt-10'>
                    <div className='grid grid-cols-4 w-full gap-8 pt-6'>
                        {data.map((item, i) => {
                            return <Cart key={i} item={item} />
                        })}
                    </div>
                </div>

                <Advertisement className={`bg-[#AFD7E2] text-[#8B61C2] w-[700px]`}/>
                <div className='w-full pt-10'>
                    <div className='grid grid-cols-4 w-full gap-8 pt-6'>
                        {data.map((item, i) => {
                            return <Cart key={i} item={item} />
                        })}
                    </div>
                </div>
                <Advertisement className={`bg-[#AFD7E2] text-[#8B61C2] w-[700px]`} />
                <div className='w-full pt-10'>
                    <div className='grid grid-cols-4 w-full gap-8 pt-6'>
                        {data.map((item, i) => {
                            return <Cart key={i} item={item} />
                        })}
                    </div>
                </div>



                <div className='w-full pt-10'>
                    <div className='border-b flex justify-between items-center pb-2'>
                        <h1 className='font-bold text-xl text-[#8b61c2]'>স্বাস্থ্য সেবা লিংক </h1>

                    </div>
                    <div className='grid grid-cols-5 w-full gap-5 pt-6'>
                        {['অ্যালার্জি', 'গ্যাস্ট্রিক', 'অ্যাজমা', 'মাইগ্রেন', 'হাইপারটেনশন', 'ডিপ্রেশন', 'ত্বকের ফাঙ্গাস', 'ডায়াবেটিস', 'জন্ডিস', 'সর্দি-কাশি'].map((item) => {
                            return <div>
                                <button className='mt-2 py-1 font-semibold float-left text-[#286291]'>{item}</button>
                            </div>
                        })}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category

