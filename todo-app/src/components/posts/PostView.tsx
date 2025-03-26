import PostCard from "./PostCard";
import Link from "next/link";
import { Post } from "@/types/post";

export default function PostView({ postList }: { postList: Post[] }) {
    return (
        <div>
            {postList.map((post) => (
                <div key={post.id}>
                    <Link href={`/posts/${post.id}`} className="block hover:bg-gray-50">
                        <PostCard
                            key={post.id}
                            title={post.title}
                            username={post.username}
                            body={post.body}
                        />
                    </Link>
                    <hr />
                </div>
            ))}

        </div>
    );
}