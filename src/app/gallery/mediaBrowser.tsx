import React, { useEffect, useState } from "react"
import { MediaFileSource } from "../models/MediaFileSource";
import { useFileSystem } from "../data/useFilesystem";

interface MediaBrowserProps {
    selectedSource: MediaFileSource;
    setLoading: (loading: boolean) => void;
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({selectedSource, setLoading}) => {
    //const [mediaPaths, setMediaPaths] = useState<string[]>([]);
    const { mediaPaths } = useFileSystem(selectedSource, setLoading);

    return (
        <React.Fragment>
            <div>Selected source: {selectedSource?.filePath}</div>
            {mediaPaths.length > 0 && `${mediaPaths.length} paths found.`}
            <br />
            {mediaPaths.length > 0 && <img src={mediaPaths[0]} alt={""} />}
        </React.Fragment>
    )
}