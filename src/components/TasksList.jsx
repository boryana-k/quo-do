import { useState } from "react";
import TaskCard from "./TaskCard";
import {Tabs, Tab} from "@nextui-org/tabs";


function TasksList({tasksList, fetchTasks, updateDatabase}) {

    const doneTasks = tasksList.filter(task => task.done);
    const notDone = tasksList.filter(task => !task.done)

    console.log(notDone)

    return (
        <div className="flex flex-col items-start gap-4 my-4">

            
            <Tabs aria-label="Options" className="dark w-full" color="primary">
                <Tab 
                    key="all-tasks" 
                    title={
                        <>
                            All tasks
                            ({tasksList.length})
                        </>
                    } 
                    className="w-full"
                >
                    { tasksList && tasksList.map(task => (
                        <TaskCard key={task.id} task={task} fetchTasks={fetchTasks} updateDatabase={updateDatabase}></TaskCard>
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
                        <TaskCard key={task.id} task={task} fetchTasks={fetchTasks} updateDatabase={updateDatabase}></TaskCard>
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
                        <TaskCard key={task.id} task={task} fetchTasks={fetchTasks} updateDatabase={updateDatabase}></TaskCard>
                    ))}
                </Tab>
                
            </Tabs>
        </div>
    );
};

export default TasksList;