import {useContext} from "react";
import {createPortal} from "react-dom";
import {ThemeContext} from "app/themeContext";

export type Props = {
    open: boolean,
    title: string,
    description: string,
    handleConfirmation: (confirmed: boolean) => void
};

export function ConfirmDialog(props: Props) {
    const theme = useContext(ThemeContext);
    if (!props.open) {
        return null;
    }
    const container = document.getElementById("confirm-root");
    if (!container) {
        return null;
    }
    return (
        createPortal(<div
                style={{position: 'absolute', top: "50vh", left: "50vw"}}>
                <header>{props.title}</header>
                <div>theme: {theme}</div>
                <div>{props.description}</div>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                }}>
                    <div>
                        <button onClick={() => props.handleConfirmation(true)}>Подтвердить</button>
                    </div>
                    <div>
                        <button onClick={() => props.handleConfirmation(false)}>Отмена</button>
                    </div>
                </div>
            </div>,
            container)
    );
}