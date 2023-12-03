"use client"
import React, { useMemo } from "react"
import { useFirebase } from "../data/useFirebase";

interface MediaGalleryProps {

}

export const MediaGallery: React.FC<MediaGalleryProps> = ({}) => {
    const { sourcePaths } = useFirebase();

    const pathsDisplay = sourcePaths != null
        && (<div><ul>{Object.keys(sourcePaths).map(prop => <li key={prop}>{prop}: {sourcePaths[prop]}</li>)}</ul></div>)

    return (
        <React.Fragment>
            <h2>Media Gallery</h2>
            {pathsDisplay}
        </React.Fragment>
    )
}