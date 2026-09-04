import { useNavigate } from 'react-router-dom';

const Cart = ({ item }) => {
  const navigate = useNavigate();
  const truncateHTML = (html, maxLength = 60) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    const text = div.textContent || div.innerText || "";
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return <div className='w-full cursor-pointer transform transition-all duration-300 hover:-translate-y-1' onClick={() => { navigate(`/content/details/${item?.id}`) }}>
    <img src={item?.image_url} alt={item?.image_url} className="h-56 w-full rounded-2xl"
    /> <button className='mt-2 text-[13px] py-1 font-semibold bg-[#F6E7FA] rounded-full px-3'>{item?.category?.name}</button>
    <h1 className='font-bold py-1 text-[#000000] p-3'>{truncateHTML(item?.title, 90)}</h1>
    <p className='py-2 text-xs font-semibold p-3'>{item?.creator?.name}, {item?.creator?.designation}</p>
  </div>
}
export default Cart