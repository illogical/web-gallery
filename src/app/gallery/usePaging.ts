import { useState } from "react";

export const usePaging = <T>(startPageNumber: number, pageSize: number) => {
    const [page, setPage] = useState<T[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(startPageNumber);
    const [selectedIndex, setSelectedIndex] = useState<number>(0);  // TODO: track which image is being displayed. Not ideal though since the array is stored elsewhere and that array can change in size next time the source is selected.
    // TODO: how to know what the next item is? Can at least make the decision to go forward or backward based upon the index.

    const updatePage = (items: T[], updatedPageNumber: number) => {
        const safePageNumber = getSafePageNumber(updatedPageNumber, pageSize, items.length);
        const startIndex = (safePageNumber - 1) * pageSize;
        const endIndex = Math.min(items.length - 1, safePageNumber * pageSize - 1);
        const currentPage = items.slice(startIndex, endIndex + 1);

        setPageNumber(safePageNumber);
        setPage(currentPage);
        return safePageNumber;
    }

    return { page, pageNumber, updatePage }
}

const getSafePageNumber = (pageNumber: number, pageSize: number, totalCount: number) => {
    const lastPage = Math.floor(totalCount / pageSize);
    const isPageNumberDivisibleByPageSize = totalCount % pageSize == 0;
    const lastPossiblePage = isPageNumberDivisibleByPageSize ? lastPage: lastPage + 1;

    if(pageNumber <= 0)
    {
        // go to end
        return lastPossiblePage;
    }
    else if(pageNumber > lastPossiblePage)
    {
        // start over
        return 1;
    }

    return pageNumber;
}