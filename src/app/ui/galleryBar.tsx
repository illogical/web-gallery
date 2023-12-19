// TODO: GUI for paging through images or video files
import React, { useEffect, useState } from "react"
import styles from "./galleryBar.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp, faChevronDown, faChevronLeft, faSitemap, faPalette, faAnglesRight, faAnglesLeft, faCircleChevronLeft, faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft, faCircleRight } from "@fortawesome/free-regular-svg-icons";
import { Oswald } from 'next/font/google'
import { ClickBlockOverlay } from "./clickBlockOverlay";

const oswald = Oswald({ subsets: ['latin'] });

interface GalleryBarProps {
    loading: boolean;
    pageNumber: number;
    showSourceSelector: boolean;
    nextPage: () => void;
    previousPage: () => void;
    toggleSourceSelector: (show: boolean) => void;
}

enum MenuPosition {
    Top,
    Bottom
}

export const GalleryBar: React.FC<GalleryBarProps> = ({ loading, pageNumber, showSourceSelector, nextPage, previousPage, toggleSourceSelector }) => {
    const [showMenu, setShowMenu] = useState(true);
    const menuPosition: MenuPosition = MenuPosition.Top;

    const sourceSelectorIcon = showSourceSelector ? <FontAwesomeIcon icon={faChevronLeft} size="2x" /> : <FontAwesomeIcon icon={faSitemap} size="2x" />;


    return (
        <div>
            {!showMenu && <ClickBlockOverlay onClick={() => setShowMenu(true)} />}
            <div className={`${styles.galleryBar} ${menuPosition == MenuPosition.Top ? styles.top : styles.bottom} ${showMenu && styles.show}`}>
                <div className={styles.left}>
                    <div className={styles.item} onClick={() => toggleSourceSelector(!showSourceSelector)}>
                        <div>
                            {loading
                                ? <FontAwesomeIcon icon={faPalette} size="3x" className={styles.spin} />
                                : <>{sourceSelectorIcon}</>
                            }
                        </div>
                    </div>
                    <div className={styles.item} onClick={() => !showSourceSelector && setShowMenu(false)}>
                        <div>
                            <FontAwesomeIcon icon={menuPosition == MenuPosition.Top ? faChevronUp : faChevronDown} size="2x" />
                        </div>
                    </div>
                </div>

                <div className={styles.middle}>
                    <div className={styles.item} onClick={previousPage}>
                        <div>
                            <FontAwesomeIcon icon={faCircleChevronLeft} size="3x" />
                        </div>
                    </div>
                    <div className={styles.item} onClick={nextPage}>
                        <div>
                            <FontAwesomeIcon icon={faCircleChevronRight} size="3x" />
                        </div>
                    </div>
                </div>

                <div className={styles.right}>
                    <div className={styles.item}>
                        <div className={`${oswald.className} ${styles.pageDisplay}`}>
                            {pageNumber}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}