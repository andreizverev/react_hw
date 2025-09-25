import type {Filter} from "../model/types.ts";

type Props = {
    filter: Filter;
    onSetFilter: (filter: Filter) => void;
}

export default function FilterButton(props: Props) {
    return <label>
        Фильтр:
        <select id="taskFilter"
                value={props.filter}
                onChange={e => {
                    switch (e.target.value) {
                        case "all":
                            props.onSetFilter("all");
                            break;
                        case "completed":
                            props.onSetFilter("completed");
                            break;
                        case "incomplete":
                            props.onSetFilter("incomplete");
                            break;
                        default:
                            throw Error(`Unsupported option: ${e.target.value}`)
                    }
                    props.onSetFilter(e.target.value);
                }}>
            <option value="all">Все</option>
            <option value="completed">Завершенные</option>
            <option value="incomplete">Незавершенные</option>
        </select>
    </label>;
}