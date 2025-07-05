import { sortTasksByDate } from "../utils/utils";
import TaskCard from "./TaskCard";
import {Tabs, Tab} from "@nextui-org/tabs";


function TasksList({tasksList, updateDatabase}) {

    // Sort tasks by creation date (newest first)
    const sortedTasks = sortTasksByDate(tasksList, 'desc');

    const all = sortedTasks.filter(task => !task.archived)
    const doneTasks = all.filter(task => task.done);
    const notDone = all.filter(task => !task.done)
    const archived = tasksList.filter(task => task.archived)

    return (
        <div className="flex flex-col items-start gap-4 my-4">

            
            <Tabs aria-label="Options" className="dark w-full font-medium tracking-wide" color="primary">
                <Tab 
                    key="all-tasks" 
                    title={
                        <>
                            All
                            ({all.length})
                        </>
                    }
                    className="w-full"
                >
                    { all && all.map(task => (
                        <TaskCard key={task.id} task={task} updateDatabase={updateDatabase}></TaskCard>
                    ))}
                </Tab>

                <Tab 
                    key="done" 
                    title={
                        <>
                            Done
                            ({doneTasks.length})
                        </>
                    }
                    className="w-full"
                    >
                    { doneTasks && doneTasks.map(task => (
                        <TaskCard key={task.id} task={task} updateDatabase={updateDatabase}></TaskCard>
                    ))}
                </Tab>

                <Tab key="not-done" 
                    title={
                        <>
                            Not done
                            ({notDone.length})
                        </>
                    }
                    className="w-full"
                    >
                    { notDone && notDone.map(task => (
                        <TaskCard key={task.id} task={task} updateDatabase={updateDatabase}></TaskCard>
                    ))}
                </Tab>

                <Tab key="archived" 
                    title={
                        <>
                            Archived
                            ({archived.length})
                        </>
                    }
                    className="w-full"
                    >
                    { archived && archived.map(task => (
                        <TaskCard key={task.id} task={task} updateDatabase={updateDatabase}></TaskCard>
                    ))}
                </Tab>
                
            </Tabs>
        </div>
    );
};

export default TasksList;