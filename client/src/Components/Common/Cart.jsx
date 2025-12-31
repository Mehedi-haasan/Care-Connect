
import { useNavigate } from 'react-router-dom';
const Cart = ({item}) => {
    const navigate  = useNavigate();
    return <div className='w-full cursor-pointer transform transition-all duration-300 hover:-translate-y-2' onClick={() => { navigate(`/content/details/${item?.id}`) }}>
        <img src={item?.imageUrl} alt='' className='h-56 w-full rounded-2xl' />
        <button className='mt-2 text-[13px] py-1 font-semibold bg-[#F6E7FA] rounded-full px-3'>{item?.category}</button>
        <h1 className='font-semibold py-1 text-[#000000]'>{item?.title}</h1>
        <p className='py-2 text-xs'>{item?.author}</p>
    </div>
}
export default Cart