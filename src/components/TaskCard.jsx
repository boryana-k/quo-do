import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { supabase } from "../createClient";

function TaskCard({task, refreshTasks}) {
    const [visible, setVisible] = useState(false);
    
    function openModal() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
    }

    // function to update the tasks done status
    async function markTask(data) {

        const { error } = await supabase
        .from('tasks')
        .update({
            done: !data.done
        })
        .eq('id', data.id)

        if (error) {
            console.error('Error toggling state:', error);
        } else {
        // Fetch the updated data after toggling
            refreshTasks();
        }
    }

    


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
                    <p className={
                        task.done 
                        ? 'line-through'
                        : ''
                    }>{task.name}</p>
                </ModalHeader>
                <ModalBody>
                    {task.note}
                </ModalBody>
                <ModalFooter>
                    <Button color={task.done ? 'danger' : 'primary'} variant={task.done ? 'light' : ''} onPress={() => markTask(task)}>
                        {
                            task.done 
                            ? 'Unmark as done'
                            : 'Mark as done'
                        }
                    </Button>

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