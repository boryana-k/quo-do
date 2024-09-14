import { useEffect, useState } from 'react';

import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import ListLabel from '../components/ListLabel';
import { supabase } from '../createClient';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

function Home() {
    // tasks array
    const [tasksList, setTasksList] = useState([]); 

    // Make a request 
    useEffect(() => {
        fetchTasks()
    }, [])

    async function fetchTasks() {
        const {data} = await supabase
        .from('tasks')
        .select('*')
        setTasksList(data)
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
                <h3 className="text-xl font-anek-kannada font-medium text-secondary">Hello</h3>
                    <AddTask fetchTasks={fetchTasks} updateDatabase={updateDatabase}/>
            </div>

            { tasksList.length === 0 ? <ListLabel tasksList={tasksList}/> : ''}
            
            <TasksList tasksList={tasksList} updateDatabase={updateDatabase}/>
        </>
    );
};

export default Home;