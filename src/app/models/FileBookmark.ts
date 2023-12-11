import { Timestamp } from "firebase/firestore";

export interface FileBookmark {
    filePath: string;
    timestamp: Timestamp;
}