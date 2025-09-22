import { useState } from "react";
import { NavLink } from "react-router-dom";
import Remove from "../../icons/Remove";
import Dot from "../../icons/Dot";
import Edit from "../../icons/Edit";
import Loading from "../../icons/Loading";
import Modal from "../Input/Modal";

const PracticeCard = ({ id, category_id, description, image_url, name, price, standerd_price }) => {

  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false)
  const [delet, setDelet] = useState(false)
  const [loading, setLoading] = useState(false);
  const [hotsale, setHotSale] = useState(false)

  const handleDelete = async () => {
    setLoading(true);
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8050/api/delete/hotsale/${id}`, {
      method: 'DELETE',
      headers: {
        'authorization': token,
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    const data = await response.json();
    setLoading(false)
  };



  const handleAddHotSale = async () => {
    setLoading(true);
    const token = localStorage.getItem('token')
    const response = await fetch(`http://localhost:8050/api/create/hotsale`, {
      method: 'POST',
      headers: {
        'authorization': token,
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ template_id: id }),
    });
    const data = await response.json();
    setLoading(false);
    setHotSale(false)
  };


  return (
    <div className='w-full p-1  rounded-md  mx-auto bg-white'>
      <div>{standerd_price && <button className='px-2 rounded-full mb-1 bg-red-500 text-white'>{standerd_price}%</button>}</div>
      <div className='overflow-hidden '>
        <img src={image_url} alt='image4' className='w-full h-36 md:h-48 lg:h-56 rounded-md hover:scale-125 transition-all duration-1000 cursor-pointer' />
      </div>
      <h1 className='font-semibold py-1 lg:pt-3 text-sm lg:text-md'>{name}</h1>

      <h2 className='text-sm lg:text-md py-1 hover:text-red-500 font-semibold flex'>Price:<span className="text-red-500 text-sm lg:text-md pl-1">{price} $</span></h2>


      <div className='flex justify-between pt-1 relative '>
        <h1 className='font-semibold'>{name}</h1>
        <button onClick={() => setShow(!show)} className='hover:text-red-300'><Dot /></button>


        <div className={`absolute ${show ? "block" : "hidden"} bottom-8 right-3 bg-white p-2 rounded shadow-lg gap-2`}>
          <NavLink to={`/details/${id}`} onClick={() => { setShow(!show) }} className='p-1 hover:text-red-300 my-1 w-full border rounded flex justify-center items-center text-xs gap-1'>
            <Edit />Edit
          </NavLink>
          <button onClick={() => { setDelet(!modal); setShow(!show) }} className='p-1 border my-1 rounded hover:text-red-300 w-full flex justify-center items-center text-xs gap-1'>
            <Remove />Delete
          </button>
          <button onClick={() => { setHotSale(!hotsale); setShow(!show) }} className='p-1 border my-1 rounded hover:text-red-300 w-full flex justify-center items-center text-xs gap-1'>
            <Remove />Add to Hotsale
          </button>
        </div>
      </div>


      {/* Delete modal */}
      <Modal show={delet} size={"300px"} handleClose={() => { setDelet(false) }}>
        <h1 className='text-center font-semibold text-xl pt-6 pb-3'>Are you sure to delete this?</h1>
        <div className='flex justify-around'>
          <button onClick={() => setDelet(false)} className='border py-2 px-7 rounded border-red-500'>No</button>
          <button onClick={handleDelete} className={`border border-red-500 rounded py-2 ${loading ? "px-7" : "px-5"}`}>
            {
              loading ? <Loading /> : "Delete"
            }
          </button>
        </div>
      </Modal>


      {/* Delete modal */}
      <Modal show={hotsale} size={"300px"} handleClose={() => { setHotSale(false) }}>
        <h1 className='text-center font-semibold text-xl pt-6 pb-3'>Are you sure to Add this?</h1>
        <div className='flex justify-around'>
          <button onClick={() => setHotSale(false)} className='border py-2 px-7 rounded border-red-500'>No</button>
          <button onClick={handleAddHotSale} className={`border border-red-500 rounded py-2 ${loading ? "px-7" : "px-5"}`}>
            {
              loading ? <Loading /> : "Yes"
            }
          </button>
        </div>
      </Modal>


    </div>
  );
};

export default PracticeCard;
