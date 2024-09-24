import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from './setup';

 export const uploadImage = async (file: File): Promise<string> => {
    if (!file) {
        throw new Error('No file provided');
    }

    // Create a storage reference
    const storageRef = ref(storage, `images/${file.name}`);

    // Upload the file
    await uploadBytes(storageRef, file);

    // Get the download URL
    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
};

