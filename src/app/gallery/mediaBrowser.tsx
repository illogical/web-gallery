import React, { useEffect, useState } from "react"

interface MediaBrowserProps {
    selectedSource: string | undefined;
}

export const MediaBrowser: React.FC<MediaBrowserProps> = ({selectedSource}) => {
    const [mediaPaths, setMediaPaths] = useState<string[]>([]);

    useEffect(() => {
        if(!selectedSource) { return; }

        const path = selectedSource;
        const type = "photos";
        const endpoint = `/api/media?path=${path}&type=${type}`;

        fetch(endpoint)
            .then((response: any) => response.json())
            .then((data: string[]) => setMediaPaths(data));

        // TODO: fetch file paths from images API
    }, [selectedSource]);


    return (
        <React.Fragment>
            <div>Selected source: {selectedSource}</div>
            {mediaPaths.length > 0 && `${mediaPaths.length} paths found.`}
            <br />
            {mediaPaths.length > 0 && <img src={mediaPaths[0]} alt={""} />}
        </React.Fragment>
    )
}