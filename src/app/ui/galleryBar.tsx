// TODO: GUI for paging through images or video files
import React, { useState } from "react"
import styles from "./galleryBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faSitemap, faPalette } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-regular-svg-icons";

interface GalleryBarProps {
    loading: boolean;
}

enum MenuPosition {
    Top,
    Bottom
}

export const GalleryBar: React.FC<GalleryBarProps> = ({ loading }) => {
    const [showMenu, setShowMenu] = useState(true);
    const menuPosition: MenuPosition = MenuPosition.Top;

    return (
        <div className={`${styles.galleryBar} ${menuPosition == MenuPosition.Top ? styles.top : styles.bottom} ${showMenu && styles.show}`}>
            <div className={styles.item}>
                <div>
                    {loading 
                        ? <FontAwesomeIcon icon={faPalette} size="3x" className={styles.spin} />
                        : <FontAwesomeIcon icon={faSitemap} size="2x" />
                    }
                </div>
            </div>
            <div className={styles.item} onClick={() => setShowMenu(!showMenu)}>
                <div>
                    <FontAwesomeIcon icon={menuPosition == MenuPosition.Top ? faChevronUp : faChevronDown} size="2x" />
                </div>
            </div>

            <div className={styles.item}>
                <div>
                    <FontAwesomeIcon icon={faCircleLeft} size="3x" />
                </div>
            </div>
            <div className={styles.item}>
                <div>
                    <FontAwesomeIcon icon={faCircleRight} size="3x" />
                </div>
            </div>
        </div>
    )
}