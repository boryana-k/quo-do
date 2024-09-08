import { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, ButtonGroup} from "@nextui-org/react";
import addTaskIcon from '../icons/add-button.svg'

function AddTask({ tasksList, setTasksList}) {
    
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

    // input value
    const [inputValue, setInputValue ] = useState('');
    
    // counter for tasks index
    const [counter, setCounter] = useState(0);

    function updateCounter() {
        setCounter(counter+1)
    }

    // adding task to the array
    const addTask = () => {
        // console.log(inputValue)
        updateCounter();
        setTasksList([...tasksList, {
            'id': counter,
            'content': inputValue,
        }])
        setInputValue('')
        closeModal()
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
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}/>
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