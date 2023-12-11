"use client"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, Database, query, orderByChild, set, equalTo, push, remove } from "firebase/database";
import { useEffect, useState } from "react";
import firebaseApp from "./firebaseConfig";
import { ObjectDictionary } from "../models/ObjectDictionary";
import { MediaFileSource } from "../models/MediaFileSource";
import { FileBookmark } from "../models/FileBookmark";
import { PageBookmark } from "../models/PageBookmark";
import { findKeyByFilePath, getFilename, getFolderPath } from "../helpers/utilities";
import { Timestamp } from "firebase/firestore";

const email = process.env.NEXT_PUBLIC_USER_EMAIL ?? "";
const pw = process.env.NEXT_PUBLIC_USER_PW ?? "";

export const useFirebase = () => 
{
    const { sourcePaths, getSourcePaths } = useSourcePaths();
    const { fileBookmarks, getFileBookmarks, toggleBookmark } = useFileBookmarks();
    const { pageBookmarks, getPagebookmarks, createPageBookmark } = usePageBookmarks();

    const initialLoad = () => {
        const db = getDatabase(firebaseApp); 
        if(!db)
        {
            console.error("db is not initialized");
            return;
        }

        getSourcePaths(db);
        getFileBookmarks(db);
        getPagebookmarks(db);
    }

    useEffect(() => {
        const auth = getAuth(firebaseApp);

        if(auth.currentUser != null)
        {
            console.log("Already logged in.");
            initialLoad();
            return;
        }
        
        signInWithEmailAndPassword(auth, email, pw)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
    
                console.log("User has logged in.");
    
                initialLoad();
            })
            .catch((error: any) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }, []);

    return { sourcePaths, fileBookmarks, pageBookmarks, createPageBookmark, toggleFileBookmark: toggleBookmark };
}

const useSourcePaths = () =>
{
    const [sourcePaths, setSourcePaths] = useState<ObjectDictionary<MediaFileSource> | undefined>();

    const getSourcePaths = (db: Database) => {
        const sourcePathsRef = ref(db, 'sourcePaths/');
        onValue(sourcePathsRef, (snapshot) => {
            const data = snapshot.val();
            setSourcePaths(data);
        });
    }

    return { sourcePaths, getSourcePaths };
}

const useFileBookmarks = () => {
    const [fileBookmarks, setFileBookmarks] = useState<ObjectDictionary<FileBookmark> | undefined>();

        const getFileBookmarks = (db: Database) => {
            const fileBookmarksRef = ref(db, 'fileBookmarks/');
            const bookmarkQuery = query(fileBookmarksRef, orderByChild("timestamp"));
            onValue(bookmarkQuery, (snapshot) => {
                const data = snapshot.val();
                setFileBookmarks(data);
            });
        }

    const toggleBookmark = (filePath: string) => {
        if(!fileBookmarks || filePath == "")
        {
            return;
        }

        const db = getDatabase(firebaseApp);         
        const key = findKeyByFilePath(fileBookmarks, filePath);
        
        if(key)
        {
            // delete a bookmark
            const fileBookmarksRef = ref(db, `fileBookmarks/${key}`);
            remove(fileBookmarksRef);

            console.log("bookmark deleted.");
            
            return;
        }

        // create a bookmark
        const bookmark: FileBookmark = {
            filePath: getFolderPath(filePath),
            timestamp: Timestamp.now()
        }

        console.log("bookmark created.");

        const fileBookmarksRef = ref(db, `fileBookmarks`);
        push(fileBookmarksRef, bookmark);
       
        return;
    }


    return { fileBookmarks, getFileBookmarks, toggleBookmark };
}

const usePageBookmarks = () => {
    const [pageBookmarks, setPageBookmarks] = useState<ObjectDictionary<PageBookmark> | undefined>();

    const getPagebookmarks = (db: Database) => {
        const pageBookmarksRef = ref(db, 'pageBookmarks/');
        onValue(pageBookmarksRef, (snapshot) => {
            const data = snapshot.val();
            setPageBookmarks(data);
        });
    }

    const createPageBookmark = (filePath: string, pageNumber: number, pageSize: number) => {
        const db = getDatabase(firebaseApp); 
        if(!db)
        {
            console.error("db is not initialized");
            return;
        }

        const folderName = getFilename(filePath);
        const pageBookmarksRef = ref(db, `pageBookmarks/${folderName}`);
        const newBookmark: PageBookmark = {
            pageNumber, 
            pageSize
        }
        set(pageBookmarksRef, newBookmark);
    }

    return { pageBookmarks, getPagebookmarks, createPageBookmark };
}

const mapToArrayFromProps = (data: any) => {
    const keys = Object.keys(data);
    let items: string[] = [];
    for (let i = 0; i < keys.length; i++) {
        var prop = keys[i];
        items.push(data[prop]);
    }

    return items;
}

