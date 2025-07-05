import { formatDate, useModal } from '../utils/utils';
import {Button, Accordion, AccordionItem } from "@nextui-org/react";
import { GoTrash, GoTasklist } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdRestore } from "react-icons/md";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import TaskModal from "./TaskModal";

function TaskCard({task, updateDatabase}) {
    // Convert Firestore Timestamp to JavaScript Date
    const createdAt = task.createdAt.toDate();
    // Format the date (e.g., "dd-mm-yyyy")
    const formattedDate = formatDate(createdAt);

    const { visible, openModal, closeModal } = useModal();

    async function updateTask(action) {
    
        switch(action) {
            case 'done': {
                try {
                    await updateDoc(doc(db, 'tasks', task.id), {
                        done: !task.done,
                    });
                } catch (error) {
                    console.error('Error updating task:', error);
                }
                break;
            };
            case 'edit': {
                openModal();
                break;
            };
            case 'archive': {
                try {
                    await updateDoc(doc(db, 'tasks', task.id), {
                        archived: !task.archived
                    });
                } catch (error) {
                    console.error('Error archiving task:', error);
                }
                break;
            };
            case 'delete': {
                try {
                    await deleteDoc(doc(db, 'tasks', task.id))
                } catch(error) {
                    console.log('Error deleting task:', error)
                }
                break;
            };
            case 'restore': {
                try {
                    await updateDoc(doc(db, 'tasks', task.id), {
                        archived: false
                    });
                } catch (error) {
                    console.error('Error restoring task:', error);
                }
                break;
            };
            default: break;
        }

        updateDatabase();
    }
    
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
                            task.notes && 
                            <div className="font-light font-anek-kannada">
                                <p className="text-xl">Task notes: </p>
                                <p className="text-md"> {task.notes} </p> 
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
                                <Button color='secondary' startContent={<AiOutlineEdit/>} className="w-1/2 sm:w-1/3" variant='light' onPress={() => updateTask('edit')}>
                                    Edit
                                </Button>
                        }
                        
                        {
                            !task.archived &&

                            <Button color={task.done ? 'danger' : 'primary'} startContent={task.done ? '' : <IoMdCheckmarkCircleOutline />} className="w-1/2 sm:w-1/3" variant='light' onPress={() => updateTask('done')}>
                                {
                                    task.done 
                                    ? 'Unmark as done'
                                    : 'Mark as done'
                                }
                            </Button>
                        }
                        
                        {
                            task.archived &&

                            <Button color={task.done ? 'danger' : 'primary'} startContent={<MdRestore />} className="w-1/2 sm:w-1/3" variant='light' onPress={() => updateTask('restore')}>
                                Restore task
                            </Button>

                        }
                        <Button color="danger" variant="light" startContent={<GoTrash />} className="w-full sm:w-1/3" onPress={() => !task.archived ? updateTask('archive') : updateTask('delete')}>
                            {
                                !task.archived 
                                ? 'Archive task'
                                : 'Delete forever'
                            }
                        </Button>
                    </div>
                </AccordionItem>
            </Accordion>

            <TaskModal task={task} closeModal={closeModal} visible={visible} updateDatabase={updateDatabase}/>
        </div>
    );
};

export default TaskCard;