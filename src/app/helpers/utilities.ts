export const getFilename = (filePath: string) => {
    if(filePath.indexOf('/') < 0)
    {
        return filePath;
    }

    const lastSlashIndex = filePath.lastIndexOf('/');
    return filePath.slice(lastSlashIndex + 1);
}