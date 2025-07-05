import { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import { addDoc, collection, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import TaskModal from './TaskModal';

function AddTask({updateDatabase, token}) {

    //control the modal visibility
    const [visible, setVisible] = useState(false);

    // function to open the modal
    function openModal() {
        setVisible(true);
    };

    // close modal
    function closeModal() {
        setVisible(false);
    };

    return (
        <>
            <Button 
                onClick={openModal}
                color="primary" 
                radius='full'
                variant="light"
                isIconOnly
                className='text-2xl'
            >
                <IoIosAdd />
            </Button>

            <TaskModal task={''} closeModal={closeModal} visible={visible} updateDatabase={updateDatabase}/>
        </>
    );
};  

export default AddTask;