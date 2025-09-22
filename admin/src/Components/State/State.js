import React, { useState } from 'react'
import InputComponent from '../Input/InputComponent'
import Button from '../Input/Button'
import Modal from '../Input/Modal'


const State = () => {
    const [values, setValues] = useState({})
    const [openModal, setOpenModal] = useState(false)
    const [isDisable, setIsDisable] = useState(false)
    const CreateState = async () => {
        const token = localStorage.getItem('token')
        const response = await fetch(`http://localhost:8050/api/create/state`, {
            method: 'POST',
            headers: {
                'authorization': token,
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(values),
        });
        const data = await response.json();
        alert(data.message);
        setOpenModal(false)
    }
    return (
        <div className='relative'>
            <div className='absolute top-0 right-0'>
                <button onClick={() => setOpenModal(!openModal)} className={`flex justify-end items-center gap-1 font-semibold border rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 my-2 focus:ring-blue-300  text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>Create
                    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="M11 9V5H9v4H5v2h4v4h2v-4h4V9zm-1 11a10 10 0 1 1 0-20a10 10 0 0 1 0 20" /></svg>
                </button>
            </div>

            <Modal show={openModal} handleClose={() => setOpenModal(false)} size={'500px'}>
                <InputComponent onChange={(e) => { setValues({ ...values, name: e }) }} placeholder={'Name'} label={'State Name'} />
                <InputComponent type={'number'} onChange={(e) => { setValues({ ...values, charge: e }) }} placeholder={'Charge'} label={'Charge'} />
                <Button onClick={CreateState} isDisable={isDisable} name={'Create'} />
            </Modal>
        </div>
    )
}

export default State
