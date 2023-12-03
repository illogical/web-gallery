import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import fs from 'fs/promises'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const folderPath = req.query["path"];
    const mediaType = req.query["type"];

    console.log("progress?");

    if (!folderPath) {
        throw { message: "Path was not provided." }
    }

    if (!mediaType || (mediaType != "videos" && mediaType != "photos")) {
        throw { message: "Media type must be photos or videos" }
    }

    try {
        const mediaPath = path.join(process.cwd(), `/public/remote/${folderPath}`);

        // Get all file names in the directory
        const files = await fs.readdir(mediaPath)

        const mediaFiles = mediaType == "videos" ? filterVideos(files) : filterPhotos(files);

        // Create full paths for the image files
        const clientBasePath = `C:\\Dev\\web-gallery\\public`;
        const imagePaths = mediaFiles.map(file => path.join(mediaPath.slice(clientBasePath.length), file)); // TOOD: if this is wrong then break it apart for readability

        console.log(imagePaths[0]);

        res.status(200).json(imagePaths)
    } catch (err: any) {
        res.status(500).json({ message: err.message })
    }
}

const filterPhotos = (files: string[]) => files.filter(file => file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg'));
const filterVideos = (files: string[]) => files.filter(file => file.endsWith('.mp4') || file.endsWith('.wmv') || file.endsWith('.mpg') || file.endsWith('.mpeg'));
