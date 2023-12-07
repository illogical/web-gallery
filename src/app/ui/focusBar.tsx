import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './focusBar.module.css';
import React, { useState } from "react"
import { faArrowLeft, faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface FocusBarProps {
    showMenu: boolean;

    back: () => void;
    setShowMenu: (show: boolean) => void;
}

// GUI for the selected image or video
export const FocusBar: React.FC<FocusBarProps> = ({ showMenu, setShowMenu, back }) => {


    return <div className={`${styles.focusBar} ${showMenu && styles.show}`}>
        <div className={styles.item} onClick={back}>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
        </div>
        <div className={styles.item} onClick={() => setShowMenu(!showMenu)}>
            <div>
                <FontAwesomeIcon icon={faChevronUp} size="2x" />
            </div>
        </div>
    </div>
}