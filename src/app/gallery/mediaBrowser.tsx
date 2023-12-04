import React, { useState } from "react"
import { MediaFileSource } from "../models/MediaFileSource";
import { useFileSystem } from "../data/useFilesystem";
import { usePaging } from "./usePaging";
import { GalleryBar } from "../ui/galleryBar";

interface MediaBrowserProps {
    selectedSource: MediaFileSource | undefined;
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({selectedSource}) => {
    const [loading, setLoading] = useState(true);
    const { mediaPaths } = useFileSystem(selectedSource, setLoading);

    const { page, pageNumber, updatePage } = usePaging(mediaPaths, 1, 6);

    const nextPage = () => updatePage(pageNumber + 1);

    const previousPage = () => updatePage(pageNumber - 1);

    return (
        <React.Fragment>
            <GalleryBar loading={loading} nextPage={nextPage} previousPage={previousPage} />
            <div>Selected source: {selectedSource?.filePath}</div>
            {mediaPaths.length > 0 && `${mediaPaths.length} paths found.`}
            <p>Page number: {pageNumber}</p>
            <br />
            {mediaPaths.length > 0 && <img src={mediaPaths[0]} alt={""} />}
        </React.Fragment>
    )
}