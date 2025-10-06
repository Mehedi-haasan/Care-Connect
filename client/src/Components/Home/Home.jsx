import { useNavigate,NavLink } from 'react-router-dom';
import AllDoctors from './AllDoctors';

import Banner from './Banner';
import Hero from './Hero';

import Recenthealth from './RecentHealth';
import Advertisement from '../Common/Advertisement';
import video from '../../assets/video/video.mp4'
import Cart from '../Common/Cart';

const Home = () => {
  const goto = useNavigate()
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
    <div className=''>

      <div className='bg-[#D9D9D9]'>
        <div className='pr-56 grid grid-cols-5'>
          <div className='bg-[#AFD7E2]'>

          </div>

          <div className='font-extrabold col-span-4 py-14'>
            <h1 className='text-right py-1 text-xl md:text-2xl lg:text-4xl xl:text-5xl text-[#8B61C2]'>বাংলা ভাষায়</h1>
            <h1 className='text-right text-xl md:text-2xl lg:text-4xl xl:text-5xl text-[#0170C0]'>সহজবোধ্য  স্বাস্থ্যকথা</h1>
            <h1 className='text-right pt-8 text-xl md:text-2xl lg:text-4xl text-[#102F76]'>ডিজিটাল স্বাস্থ্যসেবা</h1>
          </div>
        </div>
      </div>


      <div className='flex justify-between items-center bg-[#F9FFF2] py-8 px-56'>
        {['মাতৃ স্বাস্থ্য', 'শিশু যত্ন', 'পরিবার পরিকল্পনা', 'কৈশোর স্বাস্থ্য', 'মানসিক স্বাস্থ্য', 'প্রবীণ স্বাস্থ্য', 'সাধারন স্বাস্থ্য', 'নারী স্বাস্থ্য', 'খাদ্য ও পুষ্টি', 'ফিটনেস']?.map((item, index) => {
          return <NavLink to={`/category`} key={index}>{item}</NavLink>
        })}
      </div>

      <Hero title="স্বাস্থ্য কথা" />


      <div className='flex justify-start items-start px-56 gap-8'>
        <div className='w-full pt-10'>
          <div className='border-b flex justify-between items-center pb-3'>
            <h1 className='font-bold text-xl text-[#6A1B9A]'>স্বাস্থ্য সুরক্ষা</h1>
            <h1 className='text-[#1976D2] font-semibold text-[15px]'>সমস্ত বিষয় পড়ুন</h1>
          </div>
          <div className='grid grid-cols-4 w-full gap-8 pt-6'>
            {data.map((item, i) => {
              return <Cart key={i} item={item} />
            })}
          </div>
        </div>

      </div>
      <div className='w-full pt-10 px-56'>
        <div className='border-b flex justify-between items-center pb-3'>
          <h1 className='font-extrabold text-xl'>রোগের ধরনসমূহ</h1>
          <h1 className='text-[#1976D2] font-semibold text-[12px]'>সমস্ত বিষয় পড়ুন</h1>
        </div>
        <div className='grid grid-cols-5 w-full gap-5 py-4 bg-[#F2EEF8]'>
          {['অ্যালার্জি', 'গ্যাস্ট্রিক', 'অ্যাজমা', 'মাইগ্রেন', 'হাইপারটেনশন', 'ডিপ্রেশন', 'ত্বকের ফাঙ্গাস', 'ডায়াবেটিস', 'জন্ডিস', 'সর্দি-কাশি'].map((item) => {
            return <div className='px-2'>
              <button className='mt-2 rounded-lg px-3 py-1 font-semibold'>{item}</button>
            </div>
          })}

        </div>
      </div>


      <Recenthealth title="সাম্প্রতিক স্বাস্থ্য" />
      <Advertisement className={`bg-black text-[#ACA766] w-[500px]`} />
      <AllDoctors />

      <div className='w-full pt-10 pb-5 px-56 bg-[#F4F9FD]'>
        <div className='border-b flex justify-between items-center pb-2'>
          <h1 className='font-bold text-xl'>স্বাস্থ্য ভিডিও</h1>
          <h1 className='text-[#1976D2] font-semibold text-[12px]'>সমস্ত ভিডিও দেখুন</h1>
        </div>
        <div className='w-full grid grid-cols-5 gap-5 pt-6'>
          <div className='grid col-span-3'>
            {/* <video src={video} controls={true} autoPlay={true} loop={true} className='max-h-[500px] w-full rounded' /> */}
            <video
              src={video}
              className="max-h-[500px] w-full rounded"
              controls   // shows play/pause, volume, etc.
              autoPlay   // starts playing automatically
              loop       // keeps repeating
              muted      // mutes by default (needed if autoplay is enabled)
              playsInline // prevents fullscreen auto on mobile
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <div className='grid col-span-2 pt-2'>
            {data.map((item) => {
              return <div className='flex justify-between items-start' onClick={() => { goto(`/content/details/${item?.id}`) }}>
                <div className="pl-5">
                  <h1 className='px-1 py-1 text-sm font-bold'>{item?.title}</h1>
                </div>
                <div className="w-[100px]">
                  <img src={item?.imageUrl} alt='' className='h-[80px] w-full object-cover rounded-lg' />
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

      <div className='w-full pt-10 pb-5 px-56 bg-[#FDF4FA]'>
        <div className='border-b flex justify-between items-center pb-2'>
          <h1 className='font-bold text-xl'>স্বাস্থ্য সেবা লিংক </h1>
          <h1 className='text-[#1976D2] font-semibold text-[14px]'>সমস্ত বিষয় পড়ুন</h1>
        </div>
        <div className='grid grid-cols-5 w-full gap-5 pt-6'>
          {['অ্যালার্জি', 'গ্যাস্ট্রিক', 'অ্যাজমা', 'মাইগ্রেন', 'হাইপারটেনশন', 'ডিপ্রেশন', 'ত্বকের ফাঙ্গাস', 'ডায়াবেটিস', 'জন্ডিস', 'সর্দি-কাশি'].map((item) => {
            return <div>
              <button className='mt-2 py-1 font-semibold float-left'>{item}</button>
            </div>
          })}

        </div>
      </div>



    </div>
  )
}

export default Home
