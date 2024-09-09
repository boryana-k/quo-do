import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";
import { useNavigate } from "react-router-dom";
import { mark, nav } from "framer-motion/client";

function TaskCard({task}) {
    const [updatedTask, setUpdatedTask] = useState(task)
    const [visible, setVisible] = useState(false);
    const [isMarked, setIsMarked] = useState(task.done);

    const navigate = useNavigate();

    // console.log(updatedTask)
    
    function openModal() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
    }

    
    
    function handleClick() {
        setIsMarked((isMarked) => !isMarked)
    }

    useEffect(() => {
        if(isMarked !== null) {
            markAsDone();
            // updateTask();
        }

    }, [markAsDone])
    
    async function markAsDone() {
        // console.log(isMarked)
        const { error } = await supabase
        .from('tasks')
        .update({
            done: isMarked
        })
        .eq('id', task.id)
        .select()
        // console.log(`task marked after click: ${isMarked}`)

        const { data } = await supabase
        .from('tasks')
        .select()
        .eq('id', task.id)

        setUpdatedTask(data)

        // console.log(data)
    }

    // async function updateTask() {
    //     const { data } = await supabase
    //     .from('tasks')
    //     .select()
    //     .eq('id', task.id)

    //     setUpdatedTask(data)

    //     // console.log(data)
    // }



    return(
        <>
        <Button key={task.id} 
            className="bg-card-bg py-2 px-4 rounded-lg cursor-pointer hover:bg-card-bg-hover"
            onClick={openModal}>

                {task.name && 
                    <p>{task.name}</p>
                }
        </Button>

        <Modal
            isOpen={visible}
            onClose={closeModal}
            className='dark'
            placement='top'
        >
            <ModalContent>
                <ModalHeader>
                    {task.name}
                </ModalHeader>
                <ModalBody>
                    {task.note}
                </ModalBody>
                <ModalFooter>
                        
                    { 
                        updatedTask.done 
                        ? <Button color="danger" variant="light">
                            Unmark as done
                        </Button>
                        : <Button color="primary" onPress={() => handleClick(task.id)}>
                        Mark as done
                        </Button>
                    }

                        <Button color="danger" variant="light" >
                            Delete task
                        </Button>
                    
                </ModalFooter>
            </ModalContent>

        </Modal>

        </>
    );
};

export default TaskCard;