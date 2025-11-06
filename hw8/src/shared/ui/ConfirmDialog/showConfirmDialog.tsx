import {createRoot} from "react-dom/client";
import {Themes} from "app/themeContext";
import {ConfirmDialog} from "shared/ui/ConfirmDialog/ConfirmDialog";

const domNode = document.getElementById("confirm-root")!;

export interface Props {
    title: string,
    description: string,
    theme: Themes
}

export function showConfirmDialog(props: Props): Promise<boolean> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise((resolve, _) => {
        const root = createRoot(domNode);
        root.render(<ConfirmDialog {...props}
                                   handleConfirmation={(confirmed) => {
                                       resolve(confirmed);
                                       root.unmount();
                                   }}
        />);
    });
}