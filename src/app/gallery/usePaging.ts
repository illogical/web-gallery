import { useState } from "react";

export const usePaging = <T>(items: T[], startPageNumber: number, pageSize: number) => {

    const [page, setPage] = useState<T[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(startPageNumber);

    const updatePage = (updatedPageNumber: number) => {

        const safePageNumber = getSafePageNumber(updatedPageNumber, pageSize, items.length);
        const startIndex = (safePageNumber - 1) * pageSize;
        const endIndex = Math.min(items.length - 1, safePageNumber * pageSize - 1);
        const currentPage = items.slice(startIndex, endIndex + 1);

        // console.log("Total items", items.length);
        // console.log("Pagesize x safePageNumber", pageSize * safePageNumber);

        // console.log("Start index", startIndex);
        // console.log("End index", endIndex);
    
        // console.log("Safe page number", safePageNumber);
        // console.log("Current page count", currentPage.length);

        setPageNumber(safePageNumber);
        setPage(currentPage);
    }

    return { page, pageNumber, updatePage }
}

const getSafePageNumber = (pageNumber: number, pageSize: number, totalCount: number) => {
    const lastPage = Math.floor(totalCount / pageSize);
    const isPageNumberDivisibleByPageSize = totalCount % pageSize == 0;
    const lastPossiblePage = isPageNumberDivisibleByPageSize ? lastPage: lastPage + 1;

    //console.log("Last page number", lastPossiblePage);

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