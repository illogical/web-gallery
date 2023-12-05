"use client"
import React from "react"
import { useFirebase } from "../data/useFirebase";
import { MediaBrowser } from "./mediaBrowser";
import { ObjectDictionary } from "../models/ObjectDictionary";

interface MediaGalleryProps {

}

export const MediaGallery: React.FC<MediaGalleryProps> = ({}) => {
    const { sourcePaths } = useFirebase();
    

    const pathsDisplay = sourcePaths != null
        && (<div><ul>{Object.keys(sourcePaths).map(prop => <li key={prop}>{prop}: {sourcePaths[prop].filePath}</li>)}</ul></div>)

    return (
        <React.Fragment>
            {pathsDisplay}
            <MediaBrowser sources={mapDictionaryToArray(sourcePaths)} />
        </React.Fragment>
    )
}

const mapDictionaryToArray = <_,T>(sources: ObjectDictionary<T> | undefined): T[] => sources ? Object.keys(sources).map(prop => sources[prop]) : [];