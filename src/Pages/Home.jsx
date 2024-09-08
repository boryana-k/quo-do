import { useEffect, useState } from 'react';

import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";

function Home() {
    // tasks array
    const [tasksList, setTasksList] = useState([]);


    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-2xl">Today</h3>
                    <AddTask tasksList={tasksList} setTasksList={setTasksList}/>
            </div>

            <TasksList tasksList={tasksList} />
            
        </>
    );
};

export default Home;