import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './focusBar.module.css';
import React from "react"
import { faArrowLeft, faChevronUp, faMaximize, faMinimize } from '@fortawesome/free-solid-svg-icons';

interface FocusBarProps {
    hideMenu: boolean;
    fitToWindow: boolean;

    back: () => void;
    setHideMenu: (show: boolean) => void;
    setFitToWindow: (fit: boolean) => void;
}

// GUI for the selected image or video
export const FocusBar: React.FC<FocusBarProps> = ({ hideMenu, setHideMenu, fitToWindow, setFitToWindow, back }) => {


    return <div className={`${styles.focusBar} ${!hideMenu && styles.show}`}>
        <div className={styles.item} onClick={back}>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
        <div className={styles.item} onClick={() => setHideMenu(!hideMenu)}>
            <div>
                <FontAwesomeIcon icon={faChevronUp} size="2x" />
            </div>
        </div>

        <div className={styles.item} onClick={() => setFitToWindow(!fitToWindow)}>
            <div>
                <FontAwesomeIcon icon={fitToWindow ? faMaximize : faMinimize} size="2x" />
            </div>
        </div>
    </div>
}