import PostView from "@/components/posts/PostView";
import PostPagination from "@/components/posts/PostPagination";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  body: string;
  username: string;
}

const getCount = async () => {
  try {
    const response = await fetch("http://localhost:8080/api/posts/cnt");
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (!response.ok) {
      return 0;
    }
    const count = await response.json();
    return count;
  } catch (error) {
    console.error("Failed to fetch post count:", error);
    return 0;
  }
}

export default async function PostsPage() {
  let currentPageNumber = 0;
  const count = await getCount();
  const pages = Math.ceil(count / 10);
  const limit = 10;
  const url = `http://localhost:8080/api/posts?offset=0&limit=${limit}`;
  const response = await fetch(url);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const updatePageNumber = (number: number) => {
    currentPageNumber = number;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = (await response.json()) as Post[];

  return (
    <div className="container mx-auto p-4">
      <h1 className="title text">Posts</h1>
      <div className="body text">
        {posts.map((post) => (
          <div key={post.id}>
            <PostView
              key={post.id}
              title={post.title}
              username={post.username}
              body={post.body}
            />
            <hr />
          </div>
        ))}
      </div>
      <div className="footer">
        <PostPagination
          pageNumbers={Array.from({ length: pages }, (_, i) => i)}
          currentPageNumber={currentPageNumber}
        />
      </div>
    </div>
  );
}
