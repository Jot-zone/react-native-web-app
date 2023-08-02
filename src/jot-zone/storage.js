import { storage } from "../firebase/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function useStorage() {
    const uploadFile = async (file, path) => {
        const storageRef = ref(storage, path);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    }

    const uploadBlogImage = async (file, blogSlug, fileExtension) => {
        const path = `zones/${blogSlug}/images/${Date.now()}.${fileExtension}`;
        return await uploadFile(file, path);
    }

    return {
        uploadBlogImage,
    }
}
