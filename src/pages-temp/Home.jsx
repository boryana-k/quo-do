import { useEffect, useState } from 'react';

import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import ListLabel from '../components/ListLabel';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

function Home() {
    // tasks array
    const [tasksList, setTasksList] = useState([]); 

    useEffect(() => {
        fetchTasks()
    }, [])

    async function fetchTasks() {
        try {
            // Get all documents from 'tasks' collection
            const tasksCollection = collection(db, 'tasks');
            const querySnapshot = await getDocs(tasksCollection);
            
            // Convert to array of objects with id included
            const data = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            
            setTasksList(data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    }

    // check for errors before fetching the data after update
    function updateDatabase(error) {
        if (error) {
            console.error('Error updating the database', error);
        } else {
            // Fetch the updated tasks after updating
            fetchTasks();
        }
    }
    
    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-4xl font-venti font-black tracking-wide text-beige-900 uppercase">Hello, </h3>
                    <AddTask fetchTasks={fetchTasks} updateDatabase={updateDatabase}/>
            </div>

            { tasksList.length === 0 ? <ListLabel tasksList={tasksList}/> : ''} 
            
            <TasksList tasksList={tasksList} updateDatabase={updateDatabase}/> 
        </>
    );
};

export default Home;