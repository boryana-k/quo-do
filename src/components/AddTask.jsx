import { useState } from 'react';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import { supabase } from '../createClient';
import { IoIosAdd } from "react-icons/io";

function AddTask({ fetchTasks, updateDatabase}) {

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
        updateDatabase();
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

        <Modal closeButton 
                isOpen={visible} 
                onClose={closeModal} 
                className='dark'
                placement='top'
        >
            <ModalContent>
                
                <ModalHeader className="flex flex-col gap-1">Add new task...</ModalHeader>
                <ModalBody>
                    <input 
                        type="text"
                        value={taskName}
                        placeholder="task name"
                        className="py-2 px-4 rounded-xl"
                        onChange={(e) => setTaskName(e.target.value)}/>
                    <input 
                        type="text"
                        value={taskNotes}
                        placeholder="task note"
                        className="py-2 px-4 rounded-xl"
                        onChange={(e) => setTaskNotes(e.target.value)}/>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={closeModal}>
                    Close
                    </Button>
                    <Button color="primary" variant="light" onPress={addTask}>
                    Add task
                    </Button>
                </ModalFooter>
            
            </ModalContent>
        </Modal>

        {/* <Popover 
        className='dark'
        placement="bottom">
            <PopoverTrigger>
                <Button
                color="primary" 
                radius='full'
                variant="light"
                isIconOnly
                className='text-2xl'>
                    
                    <img src={addTaskIcon} alt='add task'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <div className="py-2.5 flex flex-col gap-2">
                    <input 
                        type="text"
                        value={taskName}
                        placeholder="task name"
                        className="py-2 px-4 rounded-xl flex"
                        onChange={(e) => setTaskName(e.target.value)}/>
                    <input 
                        type="text"
                        value={taskNotes}
                        placeholder="task note"
                        className="py-2 px-4 rounded-xl"
                        onChange={(e) => setTaskNotes(e.target.value)}/>

                    <Button color="primary" variant="light" className='w-full' onPress={addTask}>
                        Add task
                    </Button>
                </div>
            </PopoverContent>
        </Popover> */}
        </>
    );
};  

export default AddTask;