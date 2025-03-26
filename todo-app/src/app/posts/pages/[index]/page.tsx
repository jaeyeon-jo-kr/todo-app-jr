import PostView from "@/components/posts/PostCard";
import PostPagination from "@/components/posts/PostPagination";
import Link from "next/link";

import { usePostPage } from "hooks/usePost";

export default async function PostPage({ params }: { params: { index: number } }) {
  const { postList, pageCount } = usePostPage();
  console.debug(postList);
  return (

    <div>
      <PostPagination
        pageNumbers={Array.from({ length: pageCount }, (_, i) => i)}
        currentPageNumber={params.index} />
    </div>
  );
}
