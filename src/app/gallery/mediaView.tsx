import { useState } from 'react';
import { MediaFileSource } from '../models/MediaFileSource';
import { FocusBar } from '../ui/focusBar';
import styles from './mediaView.module.css';

interface MediaViewProps {
    mediaSource: MediaFileSource | undefined;
    setSelectedMedia: (media: MediaFileSource | undefined) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ mediaSource, setSelectedMedia }) => {
    // TODO: implement video.js for video file types or display the photo (for "all" to work)

    const [hideMenu, setHideMenu] = useState(false);
    const [fitToWindow, setFitToWindow] = useState(false);

    const deselectMedia = () => setSelectedMedia(undefined);

    const fitClass = fitToWindow ? styles.fit : "";

    return <>
        {mediaSource && <div>
            <FocusBar hideMenu={hideMenu} fitToWindow={fitToWindow} setHideMenu={setHideMenu} setFitToWindow={setFitToWindow} back={deselectMedia} />
            <div className={styles.mediaView}>
                <div className={`${styles.center} ${fitClass}`}>
                    <img src={mediaSource.filePath} onClick={() => setHideMenu(false)} />
                </div>
            </div>
        </div>}
    </>
}