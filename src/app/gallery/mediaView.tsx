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

    const [showMenu, setShowMenu] = useState(true);

    const deselectMedia = () => setSelectedMedia(undefined);

    return <>
        {mediaSource && <div>
            <FocusBar back={deselectMedia} showMenu={showMenu} setShowMenu={setShowMenu} />
            <div className={styles.mediaView}>
                <div className={styles.center}>
                    <img src={mediaSource.filePath} onClick={() => setShowMenu(true)} />
                </div>
            </div>
        </div>}
    </>
}