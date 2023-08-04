import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc, collection, arrayUnion, addDoc, getDocs, query, orderBy, startAfter, limit, getCountFromServer } from "firebase/firestore";

export interface BlogPostInput {
    content: string;
    medias?: Array<BlogPostMedia>;
}
export interface BlogPost extends BlogPostInput {
    medias?: Array<BlogPostMedia>;

    id: string;
    created_at: string;
    updated_at?: string;
}

export enum BlogPostMediaType {
    Image = 'image',
    Video = 'video'
}

export interface BlogPostMedia {
    type: BlogPostMediaType;
    url: string;
    width: number;
    height: number;
}

export default function useBlogPosts() {
    /* -------------------------------------------------------------------------- */
    /*                                   Getters                                  */
    /* -------------------------------------------------------------------------- */

    const getBlogPostBySlug = async (blogSlug: string, blogPostId: string): Promise<BlogPost|null> => {
        console.log({blogSlug, blogPostSlug: blogPostId});
        const docSnap = await getDoc(doc(db, "blogs", blogSlug, "posts", blogPostId));
        return docSnap.exists() ? docSnap.data() as BlogPost : null;
    };

    const getBlogPostsBySlug = async (blogSlug: string, limitValue = 10, startAfterDoc = null): Promise<Array<BlogPost>> => {
        const postsRef = collection(db, "blogs", blogSlug, "posts");

        const q =  startAfterDoc ?
            query(
                postsRef, 
                orderBy("created_at", "desc"), 
                limit(limitValue), 
                startAfter(startAfterDoc),
            ) :
            query(
                postsRef, 
                orderBy("created_at", "desc"), 
                limit(limitValue), 
            );

        const docSnap = await getDocs(q);

        return docSnap.docs.map(doc => doc.data() as BlogPost);
    }

    const getBlogPostCountBySlug = async (blogSlug: string): Promise<number> => {
        const postsRef = collection(db, "blogs", blogSlug, "posts");
        const snap = await getCountFromServer(postsRef);
        return snap.data().count
    }

    /* -------------------------------------------------------------------------- */
    /*                           Create, Update, Delete                           */
    /* -------------------------------------------------------------------------- */

    const create = async (
        blogSlug: string, 
        blogPostInput: BlogPostInput
    ): Promise<void> => {
        const id = Date.now().toString();

        await setDoc(doc(db, "blogs", blogSlug, "posts", id), {
            id,
            content: cleanBlogPostContent(blogPostInput.content),
            medias: blogPostInput.medias ?? [],
            created_at: (new Date()).toISOString(),
        });
    };

    const update = async (
        blogSlug: string, 
        blogPostId: string, 
        blogPostInput: BlogPostInput
    ): Promise<void> => {
        await updateDoc(doc(db, "blogs", blogSlug, "posts", blogPostId), {
            content: cleanBlogPostContent(blogPostInput.content),
            medias: blogPostInput.medias ?? [],
            updated_at : (new Date()).toISOString(),
        });
    };

    const destroy = async (
        blogSlug: string,
        blogPostId: string
    ): Promise<void> => {
        await deleteDoc(doc(db, "blogs", blogSlug, "posts", blogPostId));
    };

    return {
        getBlogPostBySlug,
        getBlogPostsBySlug,
        getBlogPostCountBySlug,

        create,
        update,
        destroy,
    }
}

function cleanBlogPostContent(content: string): string {
    if (content === '<p><br></p>') {
        return '';
    }

    return content;
}