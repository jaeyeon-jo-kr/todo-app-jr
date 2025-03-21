import PostView from "@/components/posts/PostView";
import PostPagination from "@/components/posts/PostPagination";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  username: string;
}

const getPageCountQueryInfo = async (index: number) => {
  const limit = 10;
  try {
    const response = await fetch("http://localhost:8080/api/posts/cnt");
    await new Promise((resolve) => setTimeout(resolve, 500));
    const totalCount = await response.json();
    return { limit, offset: (index - 1) * limit, pageCount: Math.ceil(totalCount / limit) };
  } catch (error) {
    console.error("Failed to fetch post count:", error);
    return { limit, totalCount: 0, pageCount: 0 };
  }
}

export default async function PostPage({ params }: { params: { index: number } }) {
  const { limit, offset, pageCount } = await getPageCountQueryInfo(params.index);
  const url = `http://localhost:8080/api/posts?offset=${offset}&limit=${limit}`;
  const response = await fetch(url);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = (await response.json()) as Post[];

  console.debug(posts);
  return (
    <div key={"post-1"}>
      {posts.map((post) => (
        <div key={post.id}>
          <Link href={`/posts/${post.id}`} className="block hover:bg-gray-50">
            <PostView
              key={post.id}
              title={post.title}
              username={post.username}
              body={post.body}
            />
          </Link>
          <hr />
        </div>
      ))}
      <PostPagination
        pageNumbers={Array.from({ length: pageCount }, (_, i) => i)}
        currentPageNumber={params.index} />
    </div>
  );
}
