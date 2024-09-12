import { useEffect, useState } from 'react';

import AddTask from "../components/AddTask";
import TasksList from "../components/TasksList";
import ListLabel from '../components/ListLabel';
import { supabase } from '../createClient';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

function Home({token}) {
    const navigate = useNavigate()

    const [redirect, setRedirect] = useState(false);

    // tasks array
    const [tasksList, setTasksList] = useState([]); 
    const userFirstName = token.user?.user_metadata?.first_name
    // Make a request 
    useEffect(() => {
        fetchTasks()
    }, [])

    async function fetchTasks() {
        const {data} = await supabase
        .from('tasks')
        .select('*')
        .eq('creator_id', token.user.id)
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

    async function signOut() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Error signing out:", error);
        } else {
            console.log("User signed out successfully");
            // Tokens are removed and user session is cleared
            setRedirect(true)
        }

        sessionStorage.removeItem('token')
    }

    if(redirect) {
        return <Navigate to="/login" />;
    }
      
    

    return (
        <>
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-anek-kannada font-medium text-secondary">Hello, {userFirstName}</h3>
                    <AddTask token={token} fetchTasks={fetchTasks} updateDatabase={updateDatabase}/>
            </div>

            { tasksList.length === 0 ? <ListLabel tasksList={tasksList}/> : ''}
            
            <TasksList tasksList={tasksList} updateDatabase={updateDatabase}/>
            
            <Button color="primary" variant="light" onPress={signOut}>
                Sign out
            </Button>
        </>
    );
};

export default Home;