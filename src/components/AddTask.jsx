import { useEffect, useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, ButtonGroup} from "@nextui-org/react";
import addTaskIcon from '../icons/add-button.svg'
import { supabase } from '../createClient';
import { useNavigate } from "react-router-dom";

function AddTask({ tasksList, setTasksList}) {
    const navigate = useNavigate();

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

    // task details
    const [taskName, setTaskName ] = useState('');
    const [taskNotes, setTaskNotes] = useState('');

    // adding task
    async function addTask() {
        const { data } = await supabase
        .from('tasks')
        .insert({
            name: taskName,
            note: taskNotes,
            date: new Date()
        })

        
        //resetting the input fields
        setTaskName('')
        setTaskNotes('')

        closeModal()
        navigate(0)
    };

    return (
        <>
        <Button 
            onClick={openModal}
            color="primary" 
            radius='full'
            variant="flat"
            isIconOnly
            className='text-2xl'
        >
            <img src={addTaskIcon} alt='add task'/>
        </Button>

        <Modal closeButton 
                isOpen={visible} 
                onClose={closeModal} 
                className='dark'>
            <ModalContent>
                
                <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
                <ModalBody>
                    <input 
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}/>
                    <input 
                        type="text"
                        value={taskNotes}
                        onChange={(e) => setTaskNotes(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={closeModal}>
                    Close
                    </Button>
                    <Button color="primary" onPress={addTask}>
                    Action
                    </Button>
                </ModalFooter>
            
            </ModalContent>
        </Modal>
        </>
    );
};  

export default AddTask;