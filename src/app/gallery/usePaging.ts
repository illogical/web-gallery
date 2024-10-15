import { useState } from "react";

export enum PageOperation {
    next,
    previous
}

export const usePaging = <T>(startPageNumber: number, pageSize: number) => {
    const [page, setPage] = useState<T[]>([]);
    const [pageNumber, setPageNumber] = useState<number>(startPageNumber);
    const [lastPageOperation, setLastPageOperation] = useState<PageOperation>();

    const updatePage = (items: T[], updatedPageNumber: number) => {
        const safePageNumber = getSafePageNumber(updatedPageNumber, pageSize, items.length);
        const startIndex = (safePageNumber - 1) * pageSize;
        const endIndex = Math.min(items.length - 1, safePageNumber * pageSize - 1);
        const currentPage = items.slice(startIndex, endIndex + 1);

        cachePageOperation(pageNumber, safePageNumber, pageSize, items.length, setLastPageOperation);

        setPageNumber(safePageNumber);
        setPage(currentPage);
        return safePageNumber;
    }

    return { page, pageNumber, updatePage, lastPageOperation }
}

const getSafePageNumber = (pageNumber: number, pageSize: number, totalCount: number) => {
    const lastPossiblePage = getLastPossiblePageNumber(pageSize, totalCount);

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

const getLastPossiblePageNumber = (pageSize: number, totalCount: number) => {
    const lastPage = Math.floor(totalCount / pageSize);
    const isPageNumberDivisibleByPageSize = totalCount % pageSize == 0;
    const lastPossiblePage = isPageNumberDivisibleByPageSize ? lastPage: lastPage + 1;

    return lastPossiblePage;
}

const cachePageOperation = (previousPageNumber: number, currentPageNumber: number, pageSize: number, totalCount: number, setLastPageOperation:(operation: PageOperation) => void) => {
    const lastPage = getLastPossiblePageNumber(pageSize, totalCount);

    if(currentPageNumber < previousPageNumber)
        {
            setLastPageOperation(PageOperation.previous);
        }
        else if(currentPageNumber > previousPageNumber)
        {
            setLastPageOperation(PageOperation.next);
        }
        else if(previousPageNumber == lastPage && currentPageNumber == 0)
        {
            // user was on the last page and is now on the first page
            setLastPageOperation(PageOperation.next);
        }
        else if(previousPageNumber == 0 && currentPageNumber == lastPage)
        {
            // user was on the first page and is now on the last page
            setLastPageOperation(PageOperation.previous);
        }
        else
        {
            setLastPageOperation(PageOperation.next);
        }
}