import TaskCard from "./TaskCard";

function TasksList({tasksList, refreshTasksList}) {
    return (
        <div className="flex flex-col items-start gap-6 my-12">

                { tasksList && tasksList.map(task => (
                    <TaskCard key={task.id} task={task} refreshTasks={refreshTasksList}></TaskCard>
                ))}
        </div>
    );
};

export default TasksList;