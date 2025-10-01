import { useNavigate } from 'react-router-dom';
import AllDoctors from './AllDoctors';
import Banner from './Banner';
import Hero from './Hero';


const Home = () => {
  const goto = useNavigate()
  let data = [
    {
      "id": 1,
      "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
      "category": "Fiction",
      "title": "The Silent Forest",
      "author": "John Smith"
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
      <div>
        <Banner />
      </div>

      <div className='flex justify-between items-center bg-[#F9FFF2] py-8 px-56'>
        {['মাতৃ স্বাস্থ্য', 'শিশু যত্ন', 'পরিবার পরিকল্পনা', 'কৈশোর স্বাস্থ্য', 'মানসিক স্বাস্থ্য', 'প্রবীণ স্বাস্থ্য', 'সাধারন স্বাস্থ্য', 'নারী স্বাস্থ্য', 'খাদ্য ও পুষ্টি', 'ফিটনেস']?.map((item, index) => {
          return <button key={index}>{item}</button>
        })}
      </div>

      <Hero title="স্বাস্থ্য কথা" />


      <div className='flex justify-start items-start px-56 gap-8'>
        {/* <div className='w-[250px] border rounded min-h-screen bg-[#FAFAFA] p-4'>
          <h3 className='font-semibold'>জনপ্রিয় বিষয়সমূহ</h3>
          <div className='pl-4 pt-2'>
            <ul className='list-disc cursor-pointer'>
              <li>প্রসূতি সেবা</li>
              <li>ডায়াবেটিস নিয়ন্ত্রণ</li>
              <li>মানসিক স্বাস্থ্য</li>
              <li>শিশুর পুষ্টি</li>
            </ul>
          </div>
        </div> */}

        <div className='w-full pt-10'>
          <div className='border-b flex justify-between items-center pb-3'>
            <h1 className='font-bold text-xl text-[#6A1B9A]'>স্বাস্থ্য সুরক্ষা</h1>
            <h1 className='text-[#1976D2] font-semibold text-[15px]'>সমস্ত বিষয় পড়ুন</h1>
          </div>
          <div className='grid grid-cols-4 w-full gap-8 pt-6'>
            {data.map((item) => {
              return <div className='w-full cursor-pointer transform transition-all duration-300 hover:-translate-y-2' onClick={() => { goto(`/content/details/${item?.id}`) }}>
                <img src={item?.imageUrl} alt='' className='h-44 w-full rounded-lg' />
                <button className='mt-2 bg-[#E8D4F4] rounded-full px-3 py-1 font-semibold'>{item?.category}</button>
                <h1 className='font-semibold py-2'>{item?.title}</h1>
                <p className='py-2'>{item?.author}</p>
              </div>
            })}
          </div>
        </div>

      </div>
      <div className='w-full pt-10 px-56'>
        <div className='border-b flex justify-between items-center pb-3'>
          <h1 className='font-bold text-xl'>রোগের ধরনসমূহ</h1>
          <h1 className='text-[#1976D2] font-semibold text-[15px]'>সমস্ত বিষয় পড়ুন</h1>
        </div>
        <div className='grid grid-cols-5 w-full gap-5 pt-6'>
          {['অ্যালার্জি', 'গ্যাস্ট্রিক', 'অ্যাজমা', 'মাইগ্রেন', 'হাইপারটেনশন', 'ডিপ্রেশন', 'ত্বকের ফাঙ্গাস', 'ডায়াবেটিস', 'জন্ডিস', 'সর্দি-কাশি'].map((item) => {
            return <button className='mt-2 bg-[#EF59B6] rounded-lg px-3 py-1 font-semibold w-full'>{item}</button>
          })}

        </div>
      </div>

      <Hero title="সাম্প্রতিক স্বাস্থ্য" />
      <AllDoctors />

      <div className='w-full pt-10 pb-5 px-56'>
        <div className='border-b flex justify-between items-center pb-2'>
          <h1 className='font-bold text-xl'>স্বাস্থ্য ভিডিও</h1>
          <h1 className='text-[#1976D2] font-semibold text-[15px]'>সব দেখুন</h1>
        </div>
        <div className='w-full grid grid-cols-5 gap-5 pt-6'>
          <div className='grid col-span-3'>
            <img className='max-h-[400px] w-full rounded' src='https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1000&auto=format&fit=crop' alt='image' />
          </div>
          <div className='grid col-span-2 pt-2'>
            {data.map((item) => {
              return <div className='flex justify-between items-start' onClick={() => { goto(`/content/details/${item?.id}`) }}>
                <div className="pl-5">
                  <button className='px-1 py-1 text-sm'>{item?.title}</button>
                  <p className='px-1 text-md font-semibold'>{item?.author}</p>
                </div>
                <div className="w-[100px]">
                  <img src={item?.imageUrl} alt='' className='h-[80px] w-full object-cover rounded-lg' />
                </div>
              </div>
            })}
          </div>
        </div>
      </div>

      <div className='w-full pt-10 pb-5 px-56 bg-[#F9D9FF]'>
        <div className='border-b flex justify-between items-center'>
          <h1 className='font-bold text-xl'>স্বাস্থ্য সেবা লিংক </h1>
          <h1 className='text-[#1976D2] font-semibold text-[15px]'>সমস্ত বিষয় পড়ুন</h1>
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
