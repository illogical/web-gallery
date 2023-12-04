import { useEffect, useState } from "react";
import { MediaFileSource } from "../models/MediaFileSource";

export const useFileSystem = (selectedSource: MediaFileSource | undefined, setLoading: (loading: boolean) => void) => {
    const [mediaPaths, setMediaPaths] = useState<string[]>([]);

    useEffect(() => {
        if(!selectedSource) { return; }

        getFilePaths(selectedSource.filePath, selectedSource.mediaType);
        
    }, [selectedSource]);

    const getFilePaths = (path: string, type: "photos" | "videos") => {
        if(!selectedSource) { return; }

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

    return { mediaPaths, getFilePaths };
}