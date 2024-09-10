// import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useState } from "react";
import { supabase } from "../createClient";
import {Button, Accordion, AccordionItem} from "@nextui-org/react";
import { GoTrash, GoTasklist } from "react-icons/go";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { MdRestore } from "react-icons/md";


function TaskCard({task, updateDatabase}) {
    
    const [editable, setEditable] = useState(false)

    // update the task's done status
    async function markTask(data) {
        const { error } = await supabase
        .from('tasks')
        .update({
            done: !data.done
        })
        .eq('id', data.id)

        updateDatabase(error)
    }

    // archive the task 
    async function archiveTask(data) {
        const { error } = await supabase
        .from('tasks')
        // .delete()
        .update({
            archived: true,
        })
        .eq('id', data.id)

        updateDatabase(error)
    }

     // delete the task from the database
     async function deleteTask(data) {
        const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', data.id)

        updateDatabase(error)
    }

    // restore task
    async function restoreTask(data) {
        const { error } = await supabase
        .from('tasks')
        // .delete()
        .update({
            archived: false,
        })
        .eq('id', data.id)

        updateDatabase(error)
    }

    // format the date
    function formatDate(task_date) {
        const date = new Date(task_date.toString())
      
        const year = date.getFullYear();
        const monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June', 'July',
            'August', 'September', 'October', 'November', 'December'
          ];

        const month = monthNames[date.getMonth()];
        const day = String(date.getDate()).padStart(2, '0');
      
        return `${day} ${month} ${year}`;
    }


    async function editTask({task}) {
        setEditable(editable => !editable)
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
                            task.note && 
                            <div className="font-light font-anek-kannada">
                                <p className="text-xl">Task notes: </p>
                                <p className="text-md"> {task.note} </p> 
                            </div>
                        }

                        <div className="text-label-color font-anek-kannada font-thin">
                            <p className="text-medium">Date created: </p>
                            <p className="text-small">{formatDate(task.date)}</p>
                        </div>
                    </div>
                    <div className="w-full flex items-start my-4 flex-wrap">
                        {
                            !task.archived && 
                                <Button color='secondary' startContent={<AiOutlineEdit/>} className="w-1/2 sm:w-1/3" variant='light'>
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
        </div>
    );
};

export default TaskCard;