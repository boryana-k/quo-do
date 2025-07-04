import React, { useState } from "react";
import { formatDate } from '../utils/utils';
import {Button, Accordion, AccordionItem, Modal, ModalContent, ModalBody, ModalFooter, ModalHeader} from "@nextui-org/react";
import { GoTrash, GoTasklist } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdRestore } from "react-icons/md";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { create } from "framer-motion/client";


function TaskCard({task, updateDatabase}) {
    
    // console.log(task)

    // Convert Firestore Timestamp to JavaScript Date
    const createdAt = task.createdAt.toDate();
    // Format the date (e.g., "dd-mm-yyyy")
    const formattedDate = formatDate(createdAt);

    // task details
    const [taskName, setTaskName ] = useState(task.name);
    const [taskNotes, setTaskNotes] = useState(task.notes);

    const [isEditable, setisEditable] = useState(false)
    const [isMarketAsDone, setisMarketAsDone] = useState(false)

    const [visible, setVisible] = useState(false);

    async function markTask(task) {
        try {
            await updateDoc(doc(db, 'tasks', task.id), {
                done: !task.done
            });

            updateDatabase();
            setisMarketAsDone(!isMarketAsDone);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    async function archiveTask(task) {
        try {
            await updateDoc(doc(db, 'tasks', task.id), {
                archived: !task.archived
            });

            updateDatabase();
        } catch (error) {
            console.error('Error archiving task:', error);
        }
    }
     // delete the task from the database
     async function deleteTask(data) {

        // const { error } = await supabase
        // .from('tasks')
        // .delete()
        // .eq('id', data.id)

        // updateDatabase(error)

        try {
            
            await deleteDoc(doc(db, 'tasks', task.id))
            updateDatabase()
        } catch(error) {
            console.log('Error deleting task:', error)
        }
    }

    async function restoreTask(task) {
        try {
            await updateDoc(doc(db, 'tasks', task.id), {
                archived: false
            });

            updateDatabase();
        } catch (error) {
            console.error('Error restoring task:', error);
        }
    }

    async function editTask() {
        setisEditable(isEditable => !isEditable)
    }


    async function updateTask(name, notes) {
        try {
            await updateDoc(doc(db, 'tasks', task.id), {
                name: taskName,
                notes: taskNotes,
                createdAt: new Date() 
            });

            // Reset the input fields
            setTaskName('');
            setTaskNotes('');

            closeModal();
            updateDatabase();
            
            console.log('Task updated');
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    // function to open the modal
    function openModal() {
        setVisible(true);
    };

    // close modal
    function closeModal() {
        setVisible(false);
    };
    return(
        <div className="w-full border-t-[0.5px] border-border-color py-4">
            <Accordion className='dark' variant="splitted">
                <AccordionItem 
                    key={task.id} 
                    aria-label={'task' + task.id} 
                    startContent={<GoTasklist className="text-secondary" />}
                    title={task.name} className="bg-bg-color" 
                >
                    <div className="w-full flex flex-col items-start text-start gap-4">
                        {
                            task.note && 
                            <div className="font-light font-anek-kannada">
                                <p className="text-xl">Task notes: </p>
                                <p className="text-md"> {task.note} </p> 
                            </div>
                        }

                        <div className="text-label-color font-anek-kannada font-thin">
                            <p className="text-medium">Date created: </p>
                            <p className="text-small">{formattedDate}</p>
                        </div>
                    </div>
                    <div className="w-full flex items-start my-4 flex-wrap">
                        {
                            !task.archived && 
                                <Button color='secondary' startContent={<AiOutlineEdit/>} className="w-1/2 sm:w-1/3" variant='light' onPress={openModal}>
                                    Edit
                                </Button>
                        }
                        
                        {
                            !task.archived &&

                            <Button color={task.done ? 'danger' : 'primary'} startContent={task.done ? '' : <IoMdCheckmarkCircleOutline />} className="w-1/2 sm:w-1/3" variant='light' onPress={() => markTask(task)}>
                                {
                                    task.done 
                                    ? 'Unmark as done'
                                    : 'Mark as done'
                                }
                            </Button>
                        }
                        
                        {
                            task.archived &&

                            <Button color={task.done ? 'danger' : 'primary'} startContent={<MdRestore />} className="w-1/2 sm:w-1/3" variant='light' onPress={() => restoreTask(task)}>
                                Restore task
                            </Button>

                        }
                        <Button color="danger" variant="light" startContent={<GoTrash />} className="w-full sm:w-1/3" onPress={() => !task.archived ? archiveTask(task) : deleteTask(task)}>
                            {
                                !task.archived 
                                ? 'Archive task'
                                : 'Delete forever'
                            }
                        </Button>
                    </div>
                </AccordionItem>
            </Accordion>

            <Modal closeButton 
                    isOpen={visible} 
                    onClose={closeModal} 
                    className='dark'
                    placement='top'
            >
                <ModalContent>
                    
                    <ModalHeader className="flex flex-col gap-1">Edit the task...</ModalHeader>
                    <ModalBody>
                        <input 
                            type="text"
                            value={taskName}
                            placeholder=''
                            className="py-2 px-4 rounded-xl"
                            onChange={(e) => setTaskName(e.target.value)}/>
                        <input 
                            type="text"
                            value={taskNotes}
                            placeholder=''
                            className="py-2 px-4 rounded-xl"
                            onChange={(e) => setTaskNotes(e.target.value)}/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={closeModal}>
                        Close
                        </Button>
                        <Button color="primary" variant="light" onPress={updateTask}>
                        Add task
                        </Button>
                    </ModalFooter>
                
                </ModalContent>
            </Modal>
        </div>
    );
};

export default TaskCard;