import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc, deleteDoc, setDoc, collection, arrayUnion, addDoc, getDocs, query, orderBy, startAt, startAfter, limit, getCountFromServer } from "firebase/firestore";
import useUsers from "./users";

export default function useBlogs() {
    const Users = useUsers();

    const getCurrentUsersBlogSlugs = async () => {
        const dbUser = await Users.getDbUser();

        if (!dbUser) {
            return [];
        }

        return dbUser.blog_slugs ?? [];
    }

    const getCurrentUsersBlogs = async () => {
        const blogSlugs = getCurrentUsersBlogSlugs();

        return await Promise.all(blogSlugs.map(async (blogSlug) => {
            return await getBlogBySlug(blogSlug);
        }));
    };

    const getBlogBySlug = async (blogSlug) => {
        console.log({blogSlug});
        // debugger;
        const docSnap = await getDoc(doc(db, "blogs", blogSlug));
        return docSnap.exists() ? docSnap.data() : null;
    };

    const getBlogPostBySlug = async (blogSlug, blogPostSlug) => {
        console.log({blogSlug, blogPostSlug});
        const docSnap = await getDoc(doc(db, "blogs", blogSlug, "posts", blogPostSlug));
        return docSnap.exists() ? docSnap.data() : null;
    };

    const getBlogPostsBySlug = async (blogSlug, limitValue = 10, startAfterDoc = null) => {
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

        // return docSnap.docs.map((doc) => {
        //     return {
        //         id: doc.id,
        //         ...doc.data(),
        //     };
        // });

        return docSnap.docs;
    }

    const getBlogPostCountBySlug = async (blogSlug) => {
        const postsRef = collection(db, "blogs", blogSlug, "posts");
        const snap = await getCountFromServer(postsRef);
        return snap.data().count
    }


    const createBlogForCurrentUser = async (blogSlug, blogName) => {
        const newBlogRef = doc(db, "blogs", blogSlug);

        await setDoc(newBlogRef, {
            slug: blogSlug,
            name: blogName,
            owner: Users.firebaseUser.uid,
        });

        await setDoc(Users.dbUserRef, {
            uid: Users.firebaseUser.uid,
            blog_slugs: arrayUnion(blogSlug),
        });
    };

    const createBlogPost = async (blogSlug, blogPostContent) => {
        console.log({blogSlug, blogPostContent});
        await addDoc(collection(db, "blogs", blogSlug, "posts"), {
            content: blogPostContent,
            created_at: (new Date()).toISOString(),
        });
    };

    const updateBlogPostBySlug = async (blogSlug, blogPostSlug, blogPostContent) => {
        await updateDoc(doc(db, "blogs", blogSlug, "posts", blogPostSlug), {
            content: blogPostContent,
            updated_at : (new Date()).toISOString(),
        });
    };

    const deleteBlogPostBySlug = async (blogSlug, blogPostSlug) => {
        await deleteDoc(doc(db, "blogs", blogSlug, "posts", blogPostSlug));
    };

    return {
        getBlogBySlug,
        getBlogPostBySlug,
        getCurrentUsersBlogSlugs,
        getCurrentUsersBlogs,
        getBlogPostsBySlug,
        getBlogPostCountBySlug,
        createBlogForCurrentUser,
        createBlogPost,
        updateBlogPostBySlug,
        deleteBlogPostBySlug,
    };
}
