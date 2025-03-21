"use client";

import React, { useEffect, useState } from "react";
import PostView from "../../components/posts/PostView";

interface Post {
  id: number;
  title: string;
  body: string;
  username: string;
}

export default function PostPage() {
  const url = "http://localhost:8080/api/posts/";
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      });
  }, [setPosts, url]);

  console.debug(posts);
  return (
    <div key={1}>
      {posts.map((post) => {
        return (
          <PostView
            key={post.id}
            title={post.title}
            username={post.username}
            body={post.body}
          />
        );
      })}
    </div>
  );
}
