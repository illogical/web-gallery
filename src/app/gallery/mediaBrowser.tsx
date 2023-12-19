import React, { useEffect, useMemo, useState } from "react"
import { MediaFileSource } from "../models/MediaFileSource";
import { usePaging } from "./usePaging";
import { GalleryBar } from "../ui/galleryBar";
import { SourceSelector } from "../ui/sourceSelector";
import Constants from "../models/Constants";
import { FileBookmark } from "../models/FileBookmark";
import { ObjectDictionary } from "../models/ObjectDictionary";
import styles from './mediaBrowser.module.css';
import path from "path";
import { MediaView } from "./mediaView";
import { PageBookmark } from "../models/PageBookmark";
import { getFilename } from "../helpers/utilities";

interface MediaBrowserProps {
    sources: MediaFileSource[];
    fileBookmarks: ObjectDictionary<FileBookmark> | undefined;
    pageBookmarks: ObjectDictionary<PageBookmark> | undefined;
    createPageBookmark: (filePath: string, pageNumber: number, pageSize: number) => void;
    toggleFileBookmark: (filePath: string) => void;
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({ sources, fileBookmarks, pageBookmarks, createPageBookmark, toggleFileBookmark }) => {
    const pageSize = 6;
    const [loading, setLoading] = useState(true);
    const [selectedSource, setSelectedSource] = useState<MediaFileSource | undefined>();
    const [mediaPaths, setMediaPaths] = useState<string[]>([]);
    const [showSourceSelector, setShowSourceSelector] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState<MediaFileSource | undefined>();
    const { page, pageNumber, updatePage } = usePaging<string>(1, pageSize);

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
            const fileBookmarkSources = Object.keys(fileBookmarks).map(k => fileBookmarks[k].filePath);
            setMediaPaths(fileBookmarkSources.reverse()); //descending order to show newest first
            setLoading(false);
            return;
        }

        fetchFilePaths(selectedSource.filePath, selectedSource.mediaType);
        
    }, [selectedSource, fileBookmarks]);

    useEffect(() => {
        // when the source changes then update the page
        if(!pageBookmarks || !selectedSource) { return; }

        const folderName = getFilename(selectedSource.filePath);
        const lastPageNumber = pageBookmarks[folderName]?.pageNumber;

        if(!lastPageNumber)
        {
            // TODO: handle adding the page bookmark if one is not found
            createPageBookmark(selectedSource.filePath, pageNumber, pageSize);
            updatePage(mediaPaths, pageNumber);
            return;
        }

        updatePage(mediaPaths, lastPageNumber);
    }, [mediaPaths]);   // mediaPaths will update when selectedSource changes

    const nextPage = () => {
        const newPageNumber = updatePage(mediaPaths, pageNumber + 1);

        if(!selectedSource) { return; }
        createPageBookmark(selectedSource.filePath, newPageNumber, pageSize);
    }
    const previousPage = () => {
        const newPageNumber = updatePage(mediaPaths, pageNumber - 1);

        if(!selectedSource) { return; }
        createPageBookmark(selectedSource.filePath, newPageNumber, pageSize);
    }

    const fetchFilePaths = (path: string, type: "photos" | "videos" | "all") => {
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

    const displayMedia = useMemo(() => page.map((filePath, index) =>
            <img key={index} src={filePath} alt={""} onClick={() => setSelectedMedia({filePath, mediaType: selectedSource?.mediaType ?? "photos" })} />
    ), [page])

    return (
        <React.Fragment>
            <GalleryBar loading={loading} nextPage={nextPage} previousPage={previousPage} pageNumber={pageNumber} showSourceSelector={showSourceSelector} toggleSourceSelector={setShowSourceSelector} />
            <SourceSelector show={showSourceSelector} sources={sources} selectedSource={selectedSource} setSelectedSource={setSelectedSource} />
            <MediaView mediaSource={selectedMedia} fileBookmarks={fileBookmarks} setSelectedMedia={setSelectedMedia} toggleFileBookmark={toggleFileBookmark} />
            <div className={styles.mediaBrowser}>
                {displayMedia}
            </div>
        </React.Fragment>
    )
}
