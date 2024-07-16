import { getPosts } from "~/actions/posts";
import { Blogs } from "~/components/blog-card";

export default async function MyBlog() {

    const posts = await getPosts();

    return (
        <section>
            <h1 className="text-[2rem] font-bold mb-2">My Posts</h1>
            <div
                className="grid grid-col-1 gap-5 md:grid-cols-3">
                {posts?.data?.map((post) => {
                    return <Blogs key={post.id} posts={post} />
                })}
            </div>
        </section >
    );

}