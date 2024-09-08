import { Card, CardBody } from "@nextui-org/react";
import TaskCard from "./TaskCard";

function TasksList({tasksList}) {
    // console.log(tasksList[0])
    return (
        <div className="flex flex-col items-start gap-6 my-12">
            <h3 className="text-2xl">Tasks list</h3>

                { tasksList && tasksList.map(task => (
                    <TaskCard key={task.id} task={task}></TaskCard>
                ))}
        </div>
    );
};

export default TasksList;