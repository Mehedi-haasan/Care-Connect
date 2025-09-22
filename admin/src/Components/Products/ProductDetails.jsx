import React, { useEffect, useState } from 'react'
import { Icon } from "@iconify/react";
import { NavLink, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import AddToCart from './AddToCart';
import ProductDescription from './ProductDescription';
import Edit from '../../icons/Edit'
import Remove from '../../icons/Remove'
import Modal from '../Input/Modal';
import Loading from '../../icons/Loading';



const PracriceDetailsCard = () => {
  const params = useParams();
  const [data, setData] = useState([])
  const [attributes, setAttribute] = useState([])
  const [loading, setLoading] = useState(false)
  const [ondelet, setOnDelete] = useState(false)
  const [selectedVariant, setSelectedVariant] = useState()
  const [selectedAttribute, setSelectedAttribute] = useState()
  const [show, setShow] = useState(false)


  const fetchData = async () => {
    const response = await fetch(`http://localhost:8050/api/get/product/variant/${params.id}`)
    const data = await response.json();
    setData(data.items)
    setAttribute(data.attribute)
    setSelectedVariant(data.items[0])
    setSelectedAttribute(data.items[0].attributes)
    setLoading(true)
  }

  useEffect(() => {
    fetchData();
  }, [params.id])


  const matchItems = (data, newData) => {
    return data.filter(item => {
      return newData.every(datum => {
        return item.attributes.some(attribute => {
          return attribute.name === datum.name && attribute.value === datum.value;
        });
      });
    });
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setSelectedAttribute(prevData => {
      const newData = prevData.map((item) => {
        if (item.name === name) {
          return { ...item, value: value };
        }

        return item;
      });
      const matchedItems = matchItems(data, newData);
      setSelectedVariant(matchedItems[0])
      return newData;
    });
  }

  const handleDelete = () => {

  }




  return (
    <div className='bg-white'>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr className='shadow'>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <label for="checkbox-all-search" className="sr-only">checkbox</label>
              </div>
            </th>
            <th scope="col" className="pl-1 py-3">
              Product name
            </th>
            <th scope="col" className="px-4 py-3">
              Attribute
            </th>
            <th scope="col" className="px-4 py-3">
              Category
            </th>
            <th scope="col" className="px-4 py-3">
              Price
            </th>
            <th scope="col" className="px-4 py-3">
              Standerd Price
            </th>
            <th scope="col" className="px-4 py-3">
              Text
            </th>
            <th scope="col" className="px-4 py-3 text-right pr-5">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {
            data.map(({ id, name, price, standard_price, attributes }) => {
              return <tr key={id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                    <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                  </div>
                </td>
                <th scope="row" className="pl-1 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {name}
                </th>
                <td className="px-4 py-3">
                  {
                    attributes.map((attr) => {
                      return <div className='flex items-center gap-1'>
                        <h1 className='font-semibold'>{attr.name} :</h1>
                        <h1 className='text-xs'>{attr.value}</h1>
                      </div>
                    })
                  }
                </td>
                <td className="px-4 py-4">
                  Laptop
                </td>
                <td className="px-4 py-4">
                  {price}
                </td>
                <td className="px-4 py-4">
                  {standard_price}
                </td>
                <td className="px-4 py-4">
                  {standard_price}
                </td>
                <td className="pl-4 py-4 pr-5 flex justify-end gap-2 items-center">
                  <Modal show={show} size={"300px"} handleClose={() => { setShow(false) }}>
                    <h1 className='text-center font-semibold text-xl pt-6 pb-3'>Are you sure to delete this?</h1>
                    <div className='flex justify-around'>
                      <button onClick={() => setShow(false)} className='border py-2 px-7 rounded border-red-500'>No</button>
                      <button onClick={handleDelete} className={`border border-red-500 rounded py-2 ${loading ? "px-7" : "px-5"}`}>
                        {
                          ondelet ? <Loading /> : "Delete"
                        }
                      </button>
                    </div>
                  </Modal>

                  <NavLink to={`/product/edit/${id}`}> <Edit size='25px' /></NavLink>
                  <button onClick={() => { setShow(true) }}><Remove size='25px' /></button>
                </td>
              </tr>
            })
          }
        </tbody>
      </table>
    </div>

  )
}

export default PracriceDetailsCard
