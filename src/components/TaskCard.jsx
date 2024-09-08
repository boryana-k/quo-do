function TaskCard({task}) {
    return(
        <div key={task.id} 
            className="bg-card-bg py-2 px-4 rounded-lg">
            {task.content}
        </div>
    );
};

export default TaskCard;