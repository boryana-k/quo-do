import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";

function TaskCard({task}) {
    const [visible, setVisible] = useState(false);

    function openModal() {
        setVisible(true)
    }

    function closeModal() {
        setVisible(false)
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
        >
            <ModalContent>
                <ModalHeader>
                    {task.name}
                </ModalHeader>
                <ModalBody>
                    {task.note}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={closeModal}>
                    Close
                    </Button>
                </ModalFooter>
            </ModalContent>

        </Modal>

        </>
    );
};

export default TaskCard;