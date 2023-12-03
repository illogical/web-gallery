"use client"
import React, { useEffect, useState } from "react"
import { useFirebase } from "../data/useFirebase";
import { MediaBrowser } from "./mediaBrowser";

interface MediaGalleryProps {

}

export const MediaGallery: React.FC<MediaGalleryProps> = ({}) => {
    const { sourcePaths } = useFirebase();
    const [selectedSource, setSelectedSource] = useState<string | undefined>();

    useEffect(() => {
        if(sourcePaths == undefined)
        {
            return;
        }

        if(!selectedSource)
        {
            const props = Object.keys(sourcePaths);
            const selectedSource = sourcePaths[props[props.length - 1]];
            setSelectedSource(selectedSource);
        }

        // TODO: check cookie for last selected folder otherwise select the first one for now
        // TODO: select bookmarks by default

        console.log("Source paths were updated.");
    }, [sourcePaths]);

    const pathsDisplay = sourcePaths != null
        && (<div><ul>{Object.keys(sourcePaths).map(prop => <li key={prop}>{prop}: {sourcePaths[prop]}</li>)}</ul></div>)

    return (
        <React.Fragment>
            <h2>Media Gallery</h2>
            {pathsDisplay}
            <MediaBrowser selectedSource={selectedSource} />
        </React.Fragment>
    )
}