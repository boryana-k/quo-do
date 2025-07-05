import { Button } from "@nextui-org/react";
import { IoIosAdd } from "react-icons/io";
import TaskModal from './TaskModal';
import {useModal} from '../utils/utils';

function AddTask({updateDatabase, token}) {
    const { visible, openModal, closeModal } = useModal();

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

            <TaskModal task={''} closeModal={closeModal} visible={visible} updateDatabase={updateDatabase}/>
        </>
    );
};  

export default AddTask;