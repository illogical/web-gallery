import path from "path";
import { FileBookmark } from "../models/FileBookmark";
import { ObjectDictionary } from "../models/ObjectDictionary";

export const getFilename = (filePath: string) => {
    if(filePath.indexOf('/') < 0)
    {
        return filePath;
    }

    const lastSlashIndex = filePath.lastIndexOf('/');
    return filePath.slice(lastSlashIndex + 1);
}

export const getFolderPath = (filePath: string) => {
    if(filePath.indexOf('/') < 0)
    {
        return filePath;
    }

    const lastSlashIndex = filePath.lastIndexOf('/');
    return filePath.slice(0, lastSlashIndex);
}

export const findKeyByFilePath = (obj: ObjectDictionary<FileBookmark>, filePath: string) => {
    //const flat = Object.keys(obj).map(key => obj[key][prop]);
    for (let i = 0; i < Object.keys(obj).length; i++) {
        const key = Object.keys(obj)[i];  
        const currentObj = obj[key];

        if(currentObj.filePath == filePath)
        {
            return key;
        }
    }

    return undefined;
}