// GUI for selecting a folder
import React from "react"
import styles from "./sourceSelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark, faImages } from "@fortawesome/free-regular-svg-icons";
import { MediaFileSource } from "../models/MediaFileSource";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons/faPhotoFilm";
import { faFilm } from "@fortawesome/free-solid-svg-icons";
import Constants from "../models/Constants";

interface SourceSelectorProps {
    show: boolean;
    sources: MediaFileSource[];
    selectedSource: MediaFileSource | undefined;
    setSelectedSource: (mediaSource: MediaFileSource) => void;
}

export const SourceSelector: React.FC<SourceSelectorProps> = ({show, selectedSource, sources, setSelectedSource}) => {
    const icons = {
        "photos": {
            icon: <FontAwesomeIcon icon={faImages} size="3x" />
        },
        "videos": {
            icon: <FontAwesomeIcon icon={faFilm} size="3x" />
        },
        "all": {
            icon: <FontAwesomeIcon icon={faPhotoFilm} size="3x" />
        },
    };

    return (
        <div className={`${styles.sourceSelector} ${show && styles.show} ${selectedSource?.filePath == Constants.BOOKMARKS && styles.selected}`}>
            <div className={`${styles.item}`} onClick={() => setSelectedSource({ filePath: Constants.BOOKMARKS, mediaType: "all" })}>
                <div>
                    <FontAwesomeIcon icon={faBookmark} size="3x" />
                </div>
            </div>
            {sources.map((s) => 
                <div key={s.filePath} className={`${styles.item} ${s.filePath == selectedSource?.filePath && styles.selected}`} onClick={() => setSelectedSource(s)}>
                <div>
                    {icons[s.mediaType].icon}
                </div>
                <div className={styles.label}>
                    {getFolderName(s.filePath)}
                </div>
            </div>
            )}
        </div>
    )
}

const getFolderName = (path: string) => {
    const parts = path.split('/');
    return parts[parts.length - 1];
}