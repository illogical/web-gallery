"use client"
import React from "react"
import { useFirebase } from "../data/useFirebase";
import { MediaBrowser } from "./mediaBrowser";
import { ObjectDictionary } from "../models/ObjectDictionary";

interface MediaGalleryProps {

}

export const MediaGallery: React.FC<MediaGalleryProps> = ({}) => {
    const { sourcePaths, fileBookmarks, pageBookmarks } = useFirebase();
    
    return <>
        <MediaBrowser sources={mapDictionaryToArray(sourcePaths)} fileBookmarks={fileBookmarks} pageBookmarks={pageBookmarks} />
    </>
    
}

const mapDictionaryToArray = <_,T>(sources: ObjectDictionary<T> | undefined): T[] => sources ? Object.keys(sources).map(prop => sources[prop]) : [];
