import Banner from './Banner';
import TrendingProduct from '../TrendingProduct/TrandingProduct';
import AllItems from './AllItems';
import Carousel from '../HotSale/HotSale';
import ProductCategory from '../ProductCategory/ProductCategory';
import { NavLink, useNavigate } from 'react-router-dom';
import image from '../../assets/image/Logo.png'


const Home = () => {
  const goto = useNavigate()
  let data =[
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    "category": "Fiction",
    "title": "The Silent Forest",
    "author": "John Smith"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=800&auto=format&fit=crop",
    "category": "Technology",
    "title": "Mastering JavaScript",
    "author": "Emily Johnson"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=800&auto=format&fit=crop",
    "category": "History",
    "title": "World War II Chronicles",
    "author": "Michael Brown"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1516822003754-cca485356ecb?q=80&w=800&auto=format&fit=crop",
    "category": "Science",
    "title": "The Universe Explained",
    "author": "Sophia Williams"
  },
  {
    "id":1,
    "imageUrl": "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?q=80&w=800&auto=format&fit=crop",
    "category": "Self-Help",
    "title": "The Power of Focus",
    "author": "David Lee"
  }
]


  return (
    <div className='px-32 py-8'>
      <div className='flex justify-start items-start'>
        <div className='w-[250px] border rounded min-h-screen bg-[#FAFAFA] p-4'>
          <h3 className='font-semibold'>জনপ্রিয় বিষয়সমূহ</h3>
          <div className='pl-4 pt-2'>
            <ul className='list-disc cursor-pointer'>
              <li>প্রসূতি সেবা</li>
              <li>ডায়াবেটিস নিয়ন্ত্রণ</li>
              <li>মানসিক স্বাস্থ্য</li>
              <li>শিশুর পুষ্টি</li>
            </ul>
          </div>
        </div>

        {/* Second Section */}
        <div className='w-full p-10'>
          <div className='border-b flex justify-between items-center pb-3'>
            <h1 className='font-bold text-xl'>স্বাস্থ্য সুরক্ষা</h1>
            <h1 className=''>সমস্ত বিষয় পড়ুন</h1>
          </div>
          <div className='grid grid-cols-4 w-full gap-8 pt-6'>
            {data.map((item)=>{
              return <div className='w-full' onClick={()=>{goto(`/content/details/${item?.id}`)}}>
                <img src={item?.imageUrl} alt='' className='h-44 w-full'/>
                <h1 className='py-2'>{item?.category}</h1>
                <h1 className='font-semibold py-2'>{item?.title}</h1>
                <p className='py-2'>{item?.author}</p>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
