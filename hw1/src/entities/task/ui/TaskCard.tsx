import type {Task} from "entities/task/model/types.ts";
import style from "entities/task/ui/TaskCard.module.css"
import React from "react";

type Props = {
    task: Task;
    onTaskClick: (id: string) => void;
}

export default function TaskCard(props: Props) {
    return (
        <div>
            <label className={style.task}>{props.task.title}
                <input type="checkbox" id={"taskCheckBox" + props.task.id} checked={props.task.completed}
                       onChange={() => props.onTaskClick(props.task.id)}/>
            </label>
        </div>
    );
}