import {useContext} from "react";
import {ThemeContext, Themes} from "app/themeContext";
import {SampleElement} from "features/SampleElement/index";
import {showConfirmDialog} from "shared/ui/ConfirmDialog/showConfirmDialog";
import {WithTooltip} from "shared/ui/Tooltip/Tooltip";

type Props = {
    setTheme: (theme: Themes) => void;
}

export function PortalShowcase(props: Props) {
    const theme = useContext(ThemeContext);
    const handleDelete = async () => {
        const confirmed = await showConfirmDialog({
            title: 'Удалить элемент?',
            description: 'Это действие необратимо.',
            theme: theme!
        });
        if (confirmed) {
            console.log("Удалить");
        } else {
            console.log("Оставить");
        }
    };

    const handleChangeTheme = () => {
        if (theme === 'light') {
            props.setTheme('dark');
        } else {
            props.setTheme('light');
        }
    };

    return (
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
            <div style={{padding: '10px'}}>
                <span>Current theme: {theme} </span>
                <button onClick={handleChangeTheme}>Change theme</button>
            </div>
            <div></div>
            <div style={{display: 'flex', justifyContent: 'space-evenly', alignItems: 'center'}}
                 onClick={() => console.log("This is onClick")}
            >
                <WithTooltip position={'top'}>
                    <SampleElement text={'Top'}/>
                </WithTooltip>
                <WithTooltip position={'bottom'}>
                    <SampleElement text={'Bottom'}/>
                </WithTooltip>
                <WithTooltip position={'left'}>
                    <SampleElement text={'Left'}/>
                </WithTooltip>
                <WithTooltip position={'right'}>
                    <SampleElement text={'Right'}/>
                </WithTooltip>
            </div>
            <div>
                <button onClick={handleDelete}>Удалить</button>
            </div>
        </div>
    );
}