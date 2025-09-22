"use client";
import Link from "next/link";
import React from "react";
import PostCard from "./PostCard";
import useSWR from "swr";
import axios from "axios";

export type PostData = {
  id: number;
  title: string;
  content?: string | null;
  createdAt: string;
  author: {
    id: number;
    name: string | null;
    email: string;
    image?: string;
  };
  media: {
    url: string;
  }[];
};

const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};

const Post = () => {
  const { data, error } = useSWR<PostData[]>("/api/posts", fetcher);

  if (error) return <p>Failed to load posts</p>;
  if (!data) return <p>Loading...</p>;

  return (
    // <div className="justify-center w-full mx-auto flex flex-col gap-3 mt-12">
    //   {(Array.isArray(data) ? data : []).map((post) => (
    //     <Link href={`/dashboard/posts/${post.id}`} key={post.id}>
    //       <PostCard {...post} />
    //     </Link>
    //   ))}
    // </div>

    <div className=" w-full mx-auto flex flex-col gap-1">
      {(Array.isArray(data)
        ? [...data].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        : []
      ).map((post) => (
        // <Link href={`/dashboard/posts/${post.id}`} key={post.id}>
          <PostCard {...post} key={post.id} />
        // </Link>
      ))}
    </div>
  );
};

export default Post;
