import { MediaFileSource } from '../models/MediaFileSource';
import styles from './mediaView.module.css';

interface MediaViewProps {
    mediaSource: MediaFileSource | undefined;
}

export const MediaView: React.FC<MediaViewProps> = ({ mediaSource }) => {
    // TODO: implement video.js for video file types or display the photo (for "all" to work)
    return <>
        {mediaSource && <div className={styles.mediaView}>
            <div className={styles.center}>
                <img src={mediaSource.filePath} />
            </div>
        </div>}
    </>
}