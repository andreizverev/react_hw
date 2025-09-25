import React, {memo} from "react";
import type {Task} from "entities/task/model/types.ts";
import style from "entities/task/ui/TaskCard.module.css"

type Props = {
    task: Task;
    onTaskClick: (id: string) => void;
}

function TaskCardComponent(props: Props) {
    return (
        <label className={style.task}>{props.task.title}
            <input type="checkbox" id={"taskCheckBox" + props.task.id} checked={props.task.completed}
                   onChange={() => props.onTaskClick(props.task.id)}/>
        </label>
    );
}

export const TaskCard = memo(TaskCardComponent);
export default TaskCard;