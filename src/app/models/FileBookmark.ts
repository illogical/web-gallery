import { Timestamp } from "firebase/firestore";

export interface FileBookmark {
    fileName: string;
    folderPath: string;
    timestamp: Timestamp;
}