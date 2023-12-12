import { useMemo, useState } from 'react';
import { MediaFileSource } from '../models/MediaFileSource';
import { FocusBar } from '../ui/focusBar';
import styles from './mediaView.module.css';
import { ObjectDictionary } from '../models/ObjectDictionary';
import { FileBookmark } from '../models/FileBookmark';
import { findKeyByFilePath } from '../helpers/utilities';

interface MediaViewProps {
    mediaSource: MediaFileSource | undefined;
    fileBookmarks: ObjectDictionary<FileBookmark> | undefined;
    setSelectedMedia: (media: MediaFileSource | undefined) => void;
    toggleFileBookmark: (filePath: string) => void;
}

export const MediaView: React.FC<MediaViewProps> = ({ mediaSource, fileBookmarks, setSelectedMedia, toggleFileBookmark }) => {
    // TODO: implement video.js for video file types or display the photo (for "all" to work)

    // TODO: need to preload the image to get the height & width to be able to scale it

    const zoomAmount = 0.5;
    const [scale, setScale] = useState(1);
    const [hideMenu, setHideMenu] = useState(false);
    const [fitToWindow, setFitToWindow] = useState(false);

    const deselectMedia = () => setSelectedMedia(undefined);
    const handleToggleFileBookmark = () => toggleFileBookmark(mediaSource?.filePath ?? "");
    const zoomIn = () => setScale(s => s + zoomAmount);
    const zoomOut = () => setScale(s => s - zoomAmount);

    const fitClass = fitToWindow ? styles.fit : "";

    const bookmarked = useMemo(() => {
        if (!fileBookmarks || !mediaSource) {
            return false;
        }

        const key = findKeyByFilePath(fileBookmarks, mediaSource.filePath);
        return key !== undefined;
    }, [fileBookmarks, mediaSource]);

    return <>
        {mediaSource && <div>
            <FocusBar hideMenu={hideMenu} fitToWindow={fitToWindow} bookmarked={bookmarked} setHideMenu={setHideMenu} setFitToWindow={setFitToWindow} back={deselectMedia} toggleFileBookmark={handleToggleFileBookmark} zoomIn={zoomIn} zoomOut={zoomOut} />
            <div className={styles.mediaView}>
                <div className={`${styles.center} ${fitClass}`}>
                    <img src={mediaSource.filePath} onClick={() => setHideMenu(false)} />
                </div>
            </div>
        </div>}
    </>
}