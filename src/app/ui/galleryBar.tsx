// TODO: GUI for paging through images or video files
import React, { useState } from "react"
import styles from "./galleryBar.module.css";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from "@fortawesome/free-solid-svg-icons/faChevronDown";

interface GalleryBarProps {

}

enum WindowPosition {
    Top,
    Bottom
}

export const GalleryBar: React.FC<GalleryBarProps> = ({}) => {
    const [showMenu, setShowMenu] = useState(true);
    const windowPosition: WindowPosition = WindowPosition.Top;

    // TODO: hide menu via slide

    return (
        <div className={`${styles.galleryBar} ${windowPosition == WindowPosition.Top ? styles.top : styles.bottom} ${showMenu && styles.show}`}>
            <div className={styles.item} onClick={() => setShowMenu(!showMenu)}>
                <div>
                    <FontAwesomeIcon icon={windowPosition == WindowPosition.Top ? faChevronUp : faChevronDown} size="2x" />
                </div>
            </div>
            <div className={styles.item}>
                <div>
                    M
                </div>
            </div>
        </div>
    )
}