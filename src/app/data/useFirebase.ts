"use client"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, onValue, Database } from "firebase/database";
import { useEffect, useState } from "react";
import firebaseApp from "./firebaseConfig";
import { ObjectDictionary } from "../models/ObjectDictionary";
import { MediaFileSource } from "../models/MediaFileSource";
import { FileBookmark } from "../models/FileBookmark";

const email = process.env.NEXT_PUBLIC_USER_EMAIL ?? "";
const pw = process.env.NEXT_PUBLIC_USER_PW ?? "";

export const useFirebase = () => 
{
    const { sourcePaths, getSourcePaths } = useSourcePaths();
    const { fileBookmarks, getFileBookmarks } = useFileBookmarks();

    const initialLoad = () => {
        const db = getDatabase(firebaseApp); 
        getSourcePaths(db);
        getFileBookmarks(db);
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

    return { sourcePaths, fileBookmarks };
}

export const useSourcePaths = () =>
{
    const [sourcePaths, setSourcePaths] = useState<ObjectDictionary<MediaFileSource> | undefined>();

    const getSourcePaths = (db: Database | undefined) => {
        if(!db)
        {
            console.error("db is not initialized");
            return;
        }

        const sourcePathsRef = ref(db, 'sourcePaths/');
        onValue(sourcePathsRef, (snapshot) => {
            const data = snapshot.val();
            setSourcePaths(data);
        });
    }

    return { sourcePaths, getSourcePaths };
}

export const useFileBookmarks = () => {
    const [fileBookmarks, setFileBookmarks] = useState<ObjectDictionary<FileBookmark> | undefined>();

    const getFileBookmarks = (db: Database | undefined) => {
        if(!db)
        {
            console.error("db is not initialized");
            return;
        }

        const fileBookmarksRef = ref(db, 'fileBookmarks/');
        onValue(fileBookmarksRef, (snapshot) => {
            const data = snapshot.val();
            setFileBookmarks(data);
        });
    }

    // TODO: save a bookmark
    // TODO: delete a bookmark
    // TODO: function the can toggle (decides to save or delete)

    return { fileBookmarks, getFileBookmarks };
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
