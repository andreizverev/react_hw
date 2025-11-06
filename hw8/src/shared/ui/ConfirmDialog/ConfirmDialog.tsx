import {useState} from "react";
import {createPortal} from "react-dom";
import {Props as ShowDialogProps} from "./showConfirmDialog";

export interface Props extends ShowDialogProps {
    handleConfirmation: (confirmed: boolean) => void
}

export function ConfirmDialog(props: Props) {
    const [open, setOpen] = useState(true);
    if (!open) {
        return null;
    }
    const container = document.getElementById("confirm-root")!;

    return (
        createPortal(<div
            style={{position: 'absolute', top: "50vh", left: "50vw"}}>
            <header>{props.title}</header>
            <div>theme: {props.theme}</div>
            <div>{props.description}</div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-evenly',
            }}>
                <div>
                    <button onClick={() => {
                        props.handleConfirmation(true);
                        setOpen(false);
                    }
                    }>Подтвердить
                    </button>
                </div>
                <div>
                    <button onClick={() => {
                        props.handleConfirmation(false);
                        setOpen(false);
                    }}>Отмена
                    </button>
                </div>
            </div>
        </div>, container)
    );
}