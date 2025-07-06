import { formatDate } from '../utils/utils';
import { useModal } from "../hooks/useModal";
import { useTruncate } from "../hooks/useTruncate";
import {Button, Accordion, AccordionItem, addToast } from "@heroui/react";
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
    const truncate = useTruncate(30); 

    async function updateTask(action) {

        let toastTitle = truncate(task.name)
        let toastDescription = '';
        let toastColor = '';

        switch(action) {
            case 'done': {
                try {
                    await updateDoc(doc(db, 'tasks', task.id), {
                        done: !task.done,
                    });

                    
                    toastTitle += task.done ? ' marked as done ✅' : ' marked as NOT done';
                    toastDescription = 'Nice! Task completed'
                    toastColor = "success"
                } catch (error) {
                    toastTitle = 'Error updating task:' + error;
                    toastColor = "danger"
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

                    
                    toastTitle += ' archived';
                    toastColor = "success"
                } catch (error) {
                    toastTitle = 'Error archiving task:' + error;
                    toastColor = "danger"
                }
                break;
            };
            case 'delete': {
                try {
                    await deleteDoc(doc(db, 'tasks', task.id))
                    
                    toastTitle += ' deleted:';
                    toastDescription = 'Task deleted permanently'
                    toastColor = "success"
                } catch(error) {
                    toastTitle = 'Error deleting task:' + error;
                    toastColor = "danger"
                }
                break;
            };
            case 'restore': {
                try {
                    await updateDoc(doc(db, 'tasks', task.id), {
                        archived: false
                    });

                    toastTitle += ' restored';
                    // toastDescription = 'Task moved back to in progress';
                    toastColor = "success"
                } catch (error) {
                    console.error('Error restoring task:', error);
                }
                break;
            };
            default: break;
        }

        addToast({
            title: toastTitle,
            description: toastDescription,
            color: toastColor,
            radius: "full",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            classNames: {
                title: 'text-start'
            }
        })

        updateDatabase();
    }

    return(
        <div className="w-full border-t-[0.5px] border-border-color py-4">
            <Accordion className='' variant="splitted">
                <AccordionItem 
                    key={task.id} 
                    aria-label={'task' + task.id}
                    // startContent={<GoTasklist className="text-secondary" />}
                    title={task.name} 
                    subtitle={`Date created: ${formattedDate}`}
                    classNames={{
                        title: 'text-xl font-medium text-text-secondary',
                        subtitle: 'text-label-color font-thin text-sm',
                    }}
                    radius="full"
                    motionProps={{
                        variants: {
                        enter: {
                            y: 0,
                            opacity: 1,
                            height: "auto",
                            overflowY: "unset",
                            transition: {
                            height: {
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                duration: 1,
                            },
                            opacity: {
                                easings: "ease",
                                duration: 1,
                            },
                            },
                        },
                        exit: {
                            y: -10,
                            opacity: 0,
                            height: 0,
                            overflowY: "hidden",
                            transition: {
                            height: {
                                easings: "ease",
                                duration: 0.25,
                            },
                            opacity: {
                                easings: "ease",
                                duration: 0.3,
                            },
                            },
                        },
                        },
                    }}
                >
                    <div className="w-full flex flex-col items-start text-start gap-4">
                        {
                            task.notes ? 
                            <div className="font-light text-text-primary">
                                <p className="text-md"> {task.notes} </p> 
                            </div> : 
                            <div className="font-light text-text-primary">
                                <p className="text-md text-label-color"> No notes </p> 
                            </div>
                        }
                    </div>
                    <div className="w-full flex items-start my-4 flex-wrap justify-end sm:gap-4">
                        {
                            (!task.archived && !task.done) &&
                                <Button color='primary' startContent={<AiOutlineEdit/>} className="w-1/2 sm:w-1/4" variant='light' onPress={() => updateTask('edit')}>
                                    Edit
                                </Button>
                        }
                        
                        {
                            !task.archived &&

                            <Button color={task.done ? 'danger' : 'success'} startContent={task.done ? '' : <IoMdCheckmarkCircleOutline />} className="w-1/2 sm:w-1/4" variant='light' onPress={() => updateTask('done')}>
                                {
                                    task.done 
                                    ? 'Unmark as done'
                                    : 'Mark as done'
                                }
                            </Button>
                        }
                        
                        {
                            task.archived &&

                            <Button color={task.done ? 'danger' : 'success'} startContent={<MdRestore />} className="w-1/2 sm:w-1/4" variant='light' onPress={() => updateTask('restore')}>
                                Restore task
                            </Button>

                        }
                        <Button color="danger" startContent={<GoTrash />} className="w-full mt-4 sm:mt-0 sm:w-1/4" variant="solid"  onPress={() => !task.archived ? updateTask('archive') : updateTask('delete')}>
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