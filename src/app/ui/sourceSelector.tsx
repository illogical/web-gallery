// GUI for selecting a folder
import React from "react"
import styles from "./sourceSelector.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { MediaFileSource } from "../models/MediaFileSource";
import { faPhotoFilm } from "@fortawesome/free-solid-svg-icons/faPhotoFilm";

interface SourceSelectorProps {
    show: boolean;
    sources: MediaFileSource[];
    selectedSource: MediaFileSource | undefined;
    setSelectedSource: (mediaSource: MediaFileSource) => void;
}

export const SourceSelector: React.FC<SourceSelectorProps> = ({show, selectedSource, sources, setSelectedSource}) => {
     const getIcon = (sourceType: string) => sourceType == "photos" ? <FontAwesomeIcon icon={faImages} size="3x" /> : <FontAwesomeIcon icon={faPhotoFilm} size="3x" />

    return (
        <div className={`${styles.sourceSelector} ${show && styles.show}`}>
            {sources.map((s) => 
                <div className={`${styles.item} ${s.filePath == selectedSource?.filePath && styles.selected}`} onClick={() => setSelectedSource(s)}>
                <div>
                    {getIcon(s.mediaType)}
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