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
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({ sources, fileBookmarks, pageBookmarks }) => {
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
            const fileBookmarkSources = Object.keys(fileBookmarks).map(k => path.join(fileBookmarks[k].folderPath, fileBookmarks[k].fileName));
            setMediaPaths(fileBookmarkSources)
            setLoading(false);
            return;
        }

        fetchFilePaths(selectedSource.filePath, selectedSource.mediaType);
        
    }, [selectedSource, fileBookmarks]);

    useEffect(() => {
        // when the source changes then update the page
        if(!pageBookmarks || !selectedSource) { return; }
        
        const folderName = getFilename(selectedSource.filePath);
        console.log(folderName);
        const lastPageNumber = pageBookmarks[folderName]?.pageNumber;

        if(!lastPageNumber)
        {
            // TODO: handle adding the page bookmark if one is not found
        }

        updatePage(mediaPaths, lastPageNumber);
    }, [mediaPaths]);   // mediaPaths will update when selectedSource changes


    const nextPage = () => updatePage(mediaPaths, pageNumber + 1);
    const previousPage = () => updatePage(mediaPaths, pageNumber - 1);

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
            <MediaView mediaSource={selectedMedia} setSelectedMedia={setSelectedMedia} />
            <div className={styles.mediaBrowser}>
                {displayMedia}
            </div>
        </React.Fragment>
    )
}
