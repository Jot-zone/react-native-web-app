import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc, collection, arrayUnion, addDoc, getDocs, query, orderBy, startAfter, limit, getCountFromServer } from "firebase/firestore";
import useUsers from "./users";

export interface BlogInput {
    slug: string;
    name: string;
    owner: string;
}
export interface Blog extends BlogInput {}

export default function useBlogs() {
    const Users = useUsers();

    const getCurrentUsersBlogSlugs = async () : Promise<Array<string>> => {
        const dbUser = await Users.getDbUser();

        if (!dbUser) {
            return [];
        }

        return dbUser.blog_slugs ?? [];
    }

    const getCurrentUsersBlogs = async () : Promise<Array<Blog>> => {
        const blogSlugs = await getCurrentUsersBlogSlugs();

        return await Promise.all(blogSlugs.map(async (blogSlug) => {
            return await getBlogBySlug(blogSlug);
        }));
    };

    const getBlogBySlug = async (blogSlug): Promise<Blog|null> => {
        const docSnap = await getDoc(doc(db, "blogs", blogSlug.toLowerCase()));
        return docSnap.exists() ? docSnap.data() as Blog : null;
    };

    const createBlogForCurrentUser = async (blogSlug: string, blogName: string): Promise<void> => {
        blogSlug = blogSlug.toLowerCase();

        if (await getBlogBySlug(blogSlug)) {
            throw new Error("Blog with that subdomain already exists!");
        }
        
        const newBlogRef = doc(db, "blogs", blogSlug);

        await setDoc(newBlogRef, {
            slug: blogSlug,
            name: blogName,
            owner: Users.firebaseUser.uid,
        });

        await Users.createDbUser({
            blog_slugs: arrayUnion(blogSlug),
        });
    };

    return {
        getBlogBySlug,
        getCurrentUsersBlogSlugs,
        getCurrentUsersBlogs,
        createBlogForCurrentUser,
    };
}
