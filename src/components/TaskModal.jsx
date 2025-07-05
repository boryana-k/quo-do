import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { addDoc, collection } from 'firebase/firestore';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../firebase';

function TaskModal({task, closeModal, visible, updateDatabase}) {
    let buttonText = task ? 'update' : 'add'

    // task details
    const [taskName, setTaskName] = useState(task ? task.name : '');
    const [taskNotes, setTaskNotes] = useState(task ? task.notes : '');

     useEffect(() => {
        if (task) {
            setTaskName(task.name || '');
            setTaskNotes(task.note || ''); // Changed from 'notes' to 'note'
        } else {
            setTaskName('');
            setTaskNotes('');
        }
    }, [task]);

    async function handleTask(name, notes) {
        if(task) {
            try {
                await updateDoc(doc(db, 'tasks', task.id), {
                    name: taskName,
                    notes: taskNotes,
                    createdAt: new Date() 
                });
    
                
                console.log('Task updated');
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
                
                console.log('Task added with ID:');
            } catch (error) {
                console.error('Error adding task:', error);
            }
        }

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
                className="dark"
                placement="center"
            >
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">
                        {buttonText} task...
                    </ModalHeader>
                    <ModalBody>
                        <input
                            type="text"
                            value={taskName}
                            placeholder="task name"
                            className="py-2 px-4 rounded-xl"
                            onChange={(e) => setTaskName(e.target.value)}
                        />
                        <input
                            type="text"
                            value={taskNotes}
                            placeholder="task notes"
                            className="py-2 px-4 rounded-xl"
                            onChange={(e) => setTaskNotes(e.target.value)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button  color="danger" variant="light" onPress={closeModal}>
                            Close
                        </Button>
                        <Button color="primary" variant="light" onPress={handleTask}>
                            {buttonText} task
                        </Button>
                    </ModalFooter>
                </ModalContent>

            </Modal>
        </>
    );
};

export default TaskModal;