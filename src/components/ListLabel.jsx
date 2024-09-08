function ListLabel({tasksList}) {
    return(
        <label className="flex">
            {
                tasksList.length > 0
                ? ''
                : 'No tasks for today'
            }
        </label>
    );
};

export default ListLabel;