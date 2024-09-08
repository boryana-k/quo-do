import { useEffect, useState } from 'react';

import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import ListLabel from '../components/ListLabel';
import { supabase } from '../createClient';

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

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl">Today's tasks</h3>
                    <AddTask tasksList={tasksList} setTasksList={setTasksList}/>
            </div>

            <ListLabel tasksList={tasksList}/>
            <TasksList tasksList={tasksList} />
            
            
        </>
    );
};

export default Home;