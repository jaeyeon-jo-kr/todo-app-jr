
'use client'
import { useState, useEffect } from "react";
import axios from "axios";

type Post = {
    username: any;
    id: number;
    title: string;
    body: string;
    userId: number;
};

type PostStatistic = {
    userId: number;
    postCount: number;
    year: number;
    month: number;
    increaseRate: number;
};

export const usePost = (id?: number) => {
    const [post, setPost] = useState<Post | null>(null);
    useEffect(() => {
        if (!id) return;
        axios.get<Post>(`http://localhost:8080/api/posts/${id}`)
            .then(res => setPost(res.data))
            .catch(err => console.error(err));
    }, [id]);

    const createPost = (post: Post) => {
        axios.post<Post>("http://localhost:8080/api/posts", post)
            .then(res => setPost(res.data))
            .catch(err => console.error(err));
    };

    const updatePost = (post: Post) => {
        axios.put<Post>(`http://localhost:8080/api/posts/${post.id}`, post)
            .then(res => setPost(res.data))
            .catch(err => console.error(err));
    };

    const deletePost = (id: number) => {
        axios.delete(`http://localhost:8080/api/posts/${id}`)
            .then(() => setPost(null))
            .catch(err => console.error(err));
    };
    return { post, createPost, updatePost, deletePost };
};

export const usePostPage = () => {
    const [postList, setPostList] = useState<Post[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [limit, setLimit] = useState(10);
    const [offset, setOffset] = useState(0)

    useEffect(() => {
        getPageCountQueryInfo();
    }, [currentPageNumber]);

    useEffect(() => {
        getPostList()
    }, [offset, limit])

    const getPageCountQueryInfo = () => {
        axios.get<number>("http://localhost:8080/api/posts/cnt")
            .then(res => {
                setTotalCount(res.data)
                setOffset((currentPageNumber - 1) * limit)
                setPageCount(Math.ceil(res.data / limit))
            })
            .catch(err => {
                setTotalCount(0)
                setOffset(0)
                setPageCount(0)
                console.error(err)
            });
    };
    const getPostList = () => {
        axios.get(`http://localhost:8080/api/posts?offset=${offset}&limit=${limit}`)
            .then(res => setPostList(res.data))
            .catch(err => console.error(err))
    };

    return { currentPageNumber, setCurrentPageNumber, postList, pageCount, totalCount }
}

export const usePostStatistics = () => {
    const [postStatistics, setPostStatistics] = useState<PostStatistic[]>([]);
    useEffect(() => {
        getPostStatistics();
    }, []);
    const getPostStatistics = () => {
        axios.get<PostStatistic[]>("http://localhost:8080/api/posts/stats")
            .then(res => setPostStatistics(res.data))
            .catch(err => console.error(err));
    };
    return { postStatistics };
}
