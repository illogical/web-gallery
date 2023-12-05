import React, { useEffect, useState } from "react"
import { MediaFileSource } from "../models/MediaFileSource";
import { usePaging } from "./usePaging";
import { GalleryBar } from "../ui/galleryBar";
import { SourceSelector } from "../ui/sourceSelector";
import Constants from "../models/Constants";
import { FileBookmark } from "../models/FileBookmark";
import { ObjectDictionary } from "../models/ObjectDictionary";
import path from "path";

interface MediaBrowserProps {
    sources: MediaFileSource[];
    fileBookmarks: ObjectDictionary<FileBookmark> | undefined;
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({sources, fileBookmarks}) => {
    const [loading, setLoading] = useState(true);
    const [selectedSource, setSelectedSource] = useState<MediaFileSource | undefined>();
    const [mediaPaths, setMediaPaths] = useState<string[]>([]);
    const [showSourceSelector, setShowSourceSelector] = useState(false);

    useEffect(() => {
        if(sources == undefined) { return; }

        if(!selectedSource)
        {
            //const props: string[] = Object.keys(sources);
            const selectedSource: MediaFileSource = { filePath: Constants.BOOKMARKS, mediaType: "all" };
            setSelectedSource(selectedSource);
        }

        // TODO: check cookie for last selected folder otherwise select the first one for now

    }, [sources]);

    useEffect(() => {
        if(!selectedSource || !fileBookmarks) { return; }

        if(selectedSource.filePath == Constants.BOOKMARKS)
        {
            // TODO: instead use a list from Firebase
            const fileBookmarkSources = Object.keys(fileBookmarks).map(k => path.join(fileBookmarks[k].folderPath, fileBookmarks[k].fileName));
            setMediaPaths(fileBookmarkSources)
            setLoading(false);
            return;
        }

        getFilePaths(selectedSource.filePath, selectedSource.mediaType);
        
    }, [selectedSource, fileBookmarks]);

    const { page, pageNumber, updatePage } = usePaging(mediaPaths, 1, 6);

    const nextPage = () => updatePage(pageNumber + 1);

    const previousPage = () => updatePage(pageNumber - 1);

    const getFilePaths = (path: string, type: "photos" | "videos" | "all") => {
        setLoading(true);

        const endpoint = `/api/media?path=${path}&type=${type}`;
        fetch(endpoint)
            .then((response: any) => response.json())
            .then((data: string[]) => setMediaPaths(data))
            .catch((error: any) => {
                console.error(`Error fetching from ${endpoint}`, error);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    return (
        <React.Fragment>
            <GalleryBar loading={loading} nextPage={nextPage} previousPage={previousPage} pageNumber={pageNumber} showSourceSelector={showSourceSelector} toggleSourceSelector={setShowSourceSelector} />
            <SourceSelector show={showSourceSelector} sources={sources} selectedSource={selectedSource} setSelectedSource={setSelectedSource} />
            {mediaPaths.length > 0 && <img src={mediaPaths[0]} alt={""} />}
        </React.Fragment>
    )
}