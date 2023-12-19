import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './focusBar.module.css';
import React from "react"
import { faAngleLeft, faAngleRight, faArrowLeft, faChevronUp, faMagnifyingGlassMinus, faMagnifyingGlassPlus, faMaximize, faMinimize, faStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import { ClickBlockOverlay } from './clickBlockOverlay';

interface FocusBarProps {
    hideMenu: boolean;
    fitToWindow: boolean;
    bookmarked: boolean;

    back: () => void;
    zoomIn: () => void;
    zoomOut: () => void;
    setHideMenu: (show: boolean) => void;
    setFitToWindow: (fit: boolean) => void;
    toggleFileBookmark: () => void;
}

// GUI for the selected image or video
export const FocusBar: React.FC<FocusBarProps> = ({ hideMenu, bookmarked, fitToWindow, setHideMenu, setFitToWindow, back, toggleFileBookmark, zoomIn, zoomOut }) => {

    return <>
        {hideMenu && <ClickBlockOverlay onClick={() => setHideMenu(false)} />}
        <div className={`${styles.focusBar} ${!hideMenu && styles.show}`}>
            <div className={styles.left}>
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

                <div className={styles.item} onClick={toggleFileBookmark}>
                    <div>
                        <FontAwesomeIcon icon={bookmarked ? faStar : faStarEmpty} size="2x" />
                    </div>
                </div>
                <div className={styles.item} onClick={zoomOut}>
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlassMinus} size="2x" />
                    </div>
                </div>
                <div className={styles.item} onClick={zoomIn}>
                    <div>
                        <FontAwesomeIcon icon={faMagnifyingGlassPlus} size="2x" />
                    </div>
                </div>
            </div>

            <div className={styles.middle}>
                <div className={styles.item}>
                    <div>
                        <FontAwesomeIcon icon={faAngleLeft} size="3x" />
                    </div>
                </div>
                <div className={styles.item}>
                    <div>
                        <FontAwesomeIcon icon={faAngleRight} size="3x" />
                    </div>
                </div>
            </div>

            <div className={styles.right}>
                <div className={styles.item}>
                   
                </div>
            </div>
        </div>
    </>

}