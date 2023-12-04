"use client"
import React, { useEffect, useState } from "react"
import { useFirebase } from "../data/useFirebase";
import { MediaBrowser } from "./mediaBrowser";
import { GalleryBar } from "../ui/galleryBar";
import { MediaFileSource } from "../models/MediaFileSource";

interface MediaGalleryProps {

}

export const MediaGallery: React.FC<MediaGalleryProps> = ({}) => {
    const { sourcePaths } = useFirebase();
    const [selectedSource, setSelectedSource] = useState<MediaFileSource | undefined>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(sourcePaths == undefined) { return; }

        if(!selectedSource)
        {
            const props = Object.keys(sourcePaths);
            const selectedSource = sourcePaths[props[props.length - 1]];
            setSelectedSource(selectedSource);
        }

        // TODO: check cookie for last selected folder otherwise select the first one for now
        // TODO: select bookmarks by default
        
    }, [sourcePaths]);

    const pathsDisplay = sourcePaths != null
        && (<div><ul>{Object.keys(sourcePaths).map(prop => <li key={prop}>{prop}: {sourcePaths[prop].filePath}</li>)}</ul></div>)

    return (
        <React.Fragment>
            <GalleryBar loading={loading} />
            {pathsDisplay}
            { selectedSource && <MediaBrowser selectedSource={selectedSource} setLoading={setLoading} /> }
        </React.Fragment>
    )
}