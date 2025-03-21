import PostPage from "app/posts/pages/[index]/page";
import "@/styles/styles.css";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <div>Test Post</div>
      </Suspense>
    </div>
  );
}
