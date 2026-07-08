
import { useNavigate } from 'react-router-dom';
import BASE_URL from '../URL/baseurl';
const categoryNames = {
    maternal_health: "মাতৃ স্বাস্থ্য",
    child_care: "শিশু যত্ন",
    family_planning: "পরিবার পরিকল্পনা",
    adolescent_health: "কৈশোর স্বাস্থ্য",
    mental_health: "মানসিক স্বাস্থ্য",
    elderly_health: "প্রবীণ স্বাস্থ্য",
    general_health: "সাধারণ স্বাস্থ্য",
    women_health: "নারী স্বাস্থ্য",
    nutrition: "খাদ্য ও পুষ্টি",
    fitness: "ফিটনেস",
  };
const Cart = ({item}) => {
    const navigate  = useNavigate();
    return <div className='w-full cursor-pointer transform transition-all duration-300 hover:-translate-y-2' onClick={() => { navigate(`/content/details/${item?.id}`) }}>
       <img
  src={`${BASE_URL}${item?.image_url}`}
  alt=""
  className="h-56 w-full rounded-2xl"
/> <button className='mt-2 text-[13px] py-1 font-semibold bg-[#F6E7FA] rounded-full px-3'>{categoryNames[item?.category_type] || item?.category_type}</button>
        <h1 className='font-semibold py-1 text-[#000000] p-3'>{item?.title}</h1>
        <p className='py-2 text-xs p-3'>{item?.name}</p>
    </div>
}
export default Cart