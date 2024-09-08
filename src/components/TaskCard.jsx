function TaskCard({task}) {
    return(
        <div key={task.id} 
            className="bg-card-bg py-2 px-4 rounded-lg cursor-pointer hover:bg-card-bg-hover">
                {task.name && 
                    <p>{task.name}</p>
                }
        </div>
    );
};

export default TaskCard;