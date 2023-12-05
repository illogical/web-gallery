import { useState } from "react";

export const useFileSystem = (setLoading: (loading: boolean) => void) => {
    const [mediaPaths, setMediaPaths] = useState<string[]>([]);

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

    return { mediaPaths, getFilePaths };
}