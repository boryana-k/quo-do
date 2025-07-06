import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, addToast, Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

function TaskModal({task, closeModal, visible, updateDatabase}) {
    let buttonText = task ? 'update' : 'add'

    // task details
    const [taskName, setTaskName] = useState(task ? task.name : '');
    const [taskNotes, setTaskNotes] = useState(task ? task.notes : '');
    const [nameError, setNameError] = useState(''); // Add error state

     useEffect(() => {
        if (task) {
            setTaskName(task.name || '');
            setTaskNotes(task.notes || ''); // Changed from 'notes' to 'note'
        } else {
            setTaskName('');
            setTaskNotes('');
        }
    }, [task]);

    async function handleTask(name, notes) {
        // Clear previous error
        setNameError('');

        // Validate name
        if (!taskName.trim()) {
            setNameError('Task name is required');
            return;
        }

        let toastTitle = '';

        if(task) {
            try {
                await updateDoc(doc(db, 'tasks', task.id), {
                    name: taskName,
                    notes: taskNotes,
                    createdAt: new Date() 
                });
                
                toastTitle = 'You successfully updated the task';
            } catch (error) {
                console.error('Error updating task:', error);
            }
        } else {
            try {
                // Add new entry to 'tasks' collection
                const docRef = await addDoc(collection(db, 'tasks'), {
                    name: taskName,
                    notes: taskNotes,
                    createdAt: new Date(),
                    done: false,
                    archived: false
                });
                
                toastTitle = 'You successfully added the task';
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }

        addToast({
            title: toastTitle,
            color: "success",
            radius: "full",
            timeout: 3000,
            shouldShowTimeoutProgress: true,
            classNames: {
                title: 'text-start'
            }
        })

        // Reset the input fields
        setTaskName('');
        setTaskNotes('');

        closeModal(); // modal close
        updateDatabase(); // Refresh the task list
    }
    
    return (
        <>
            <Modal 
                closeButton
                isOpen={visible}
                onClose={closeModal}
                color="primary"
                placement="center"
                backdrop="blur"
                classNames={{
                    base: 'bg-[#edebe1e6]',
                    backdrop: 'backdrop-opacity-100',
                }}
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {buttonText} task...
                    </ModalHeader>
                    <ModalBody>
                        {/* <input
                            type="text"
                            value={taskName}
                            placeholder="task name"
                            className="py-2 px-4 rounded-xl"
                            onChange={(e) => setTaskName(e.target.value)}
                        /> */}

                         <Input
                            type="text"
                            value={taskName}
                            // placeholder="task name"
                            label="Task Name"
                            color="secondary"
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "text-black/50", 
                                    "dark:text-white/90"
                                ]
                            }}
                            isRequired
                            isInvalid={nameError !== ''}
                            errorMessage={nameError}
                            onChange={(e) => {
                                setTaskName(e.target.value);
                                if (nameError) setNameError('');
                            }}
                        />
                        
                        {/* <input
                            type="text"
                            value={taskNotes}
                            placeholder="task notes"
                            className="py-2 px-4 rounded-xl"
                            onChange={(e) => setTaskNotes(e.target.value)}
                        /> */}

                        <Input
                            type="text"
                            value={taskNotes}
                            // placeholder="task notes"
                            label="Task Notes"
                            color="secondary" 
                            classNames={{
                                label: "text-black/50 dark:text-white/90",
                                input: [
                                    "text-black/50", 
                                    "dark:text-white/90"
                                ]
                            }}
                            onChange={(e) => setTaskNotes(e.target.value)}
                        />
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="danger" variant="light" onPress={closeModal}>
                            Close
                        </Button>
                        {/* <Button color="success" variant="flat" onPress={handleTask}>
                            {buttonText} task
                        </Button> */}
                        <Button 
                            color="success" 
                            variant="flat" 
                            onPress={handleTask}
                            // isDisabled={!taskName.trim()} // Disable if name is empty
                        >
                            {buttonText} task
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    );
};

export default TaskModal;