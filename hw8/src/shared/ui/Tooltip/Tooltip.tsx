import {ReactNode, useContext, useRef, useState} from "react";
import {createPortal} from "react-dom";
import {ThemeContext} from "app/themeContext";
import {TooltipPosition} from "shared/ui/Tooltip/TooltipPosition";
import styles from './Tooltip.module.css'

function getTop(child: HTMLElement | null, position: TooltipPosition): number {
    if (!child) {
        return 0;
    }
    const rect = child.getBoundingClientRect();
    switch (position) {
        case 'top':
            return rect.top - 20;
        case 'bottom':
            return rect.bottom;
        case 'left':
        case 'right':
            return rect.top;
    }
}

function getLeft(element: HTMLElement | null, position: TooltipPosition): number {
    if (!element) {
        return 0;
    }
    const rect = element.getBoundingClientRect();
    switch (position) {
        case 'top':
        case 'bottom':
            return rect.left;
        case 'left':
            return rect.left - 100; // It has to be a better approach then constant 100.
        case 'right':
            return rect.right;
    }
}

export type Props = { children: ReactNode, position: TooltipPosition };

export function WithTooltip({children, position}: Props) {
    const theme = useContext(ThemeContext);
    const [visible, setVisible] = useState(false);
    const childRef = useRef<HTMLElement | null>(null);

    const portalRoot = document.getElementById('tooltip-root');
    if (!portalRoot) {
        return;
    }
    return <>
        <span ref={childRef}
              onMouseEnter={(e) => {
                  setVisible(true);
                  e.stopPropagation();
              }}
              onMouseLeave={(e) => {
                  setVisible(false);
                  e.stopPropagation();
              }}>
            {children}
        </span>
        {createPortal(
            visible &&
            <div style={{
                position: 'absolute',
                top: getTop(childRef.current, position),
                left: getLeft(childRef.current, position)
            }}
                 className={styles.tooltip}
            >
                This is tooltip in theme: {theme}
            </div>, portalRoot)}
    </>
}