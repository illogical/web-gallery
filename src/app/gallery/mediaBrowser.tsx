import React, { useEffect, useState } from "react"
import { MediaFileSource } from "../models/MediaFileSource";
import { useFileSystem } from "../data/useFilesystem";
import { usePaging } from "./usePaging";
import { GalleryBar } from "../ui/galleryBar";
import { SourceSelector } from "../ui/sourceSelector";

interface MediaBrowserProps {
    sources: MediaFileSource[];
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({sources}) => {
    const [loading, setLoading] = useState(true);
    const [selectedSource, setSelectedSource] = useState<MediaFileSource | undefined>();
    const [showSourceSelector, setShowSourceSelector] = useState(false);
    const { mediaPaths } = useFileSystem(selectedSource, setLoading);


    useEffect(() => {
        if(sources == undefined) { return; }

        if(!selectedSource)
        {
            //const props: string[] = Object.keys(sources);
            const selectedSource = sources[sources.length - 1];
            setSelectedSource(selectedSource);
        }

        // TODO: check cookie for last selected folder otherwise select the first one for now
        // TODO: select bookmarks by default

    }, [sources]);

    const { page, pageNumber, updatePage } = usePaging(mediaPaths, 1, 6);

    const nextPage = () => updatePage(pageNumber + 1);

    const previousPage = () => updatePage(pageNumber - 1);

    return (
        <React.Fragment>
            <GalleryBar loading={loading} nextPage={nextPage} previousPage={previousPage} pageNumber={pageNumber} showSourceSelector={showSourceSelector} toggleSourceSelector={setShowSourceSelector} />
            <SourceSelector show={showSourceSelector} sources={sources} selectedSource={selectedSource} setSelectedSource={setSelectedSource} />
            <div>Selected source: {selectedSource?.filePath}</div>
            {mediaPaths.length > 0 && `${mediaPaths.length} paths found.`}
            <p>Page number: {pageNumber}</p>
            <br />
            {mediaPaths.length > 0 && <img src={mediaPaths[0]} alt={""} />}
        </React.Fragment>
    )
}