import { getPost } from "~/actions/posts";


export default async function Page({ params }: { params: { postid: string } }) {

    const post = await getPost(params.postid);

    if (post.status !== 200) {
        return (
            <div>Post not found</div>
        )
    }

    return (
        <section className="p-5">
            <div className="bg-background_secondary">
                <img src={post.data?.img as string} className='mx-auto' alt="" />
                <p className="mt-2">{post.data?.createdAt.toDateString()}</p>
                <h1 className="text-[3rem]">{post?.data?.title}</h1>
                <div className="mt-2" dangerouslySetInnerHTML={{ __html: post.data?.content || '<h1> Error! </h1>' }}></div>
            </div>
        </section>
    )

}