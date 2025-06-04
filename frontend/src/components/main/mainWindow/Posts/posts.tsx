"use client";

import { DataForPostRender } from "@/types/post.types";
import { FC } from "react";
import Post from "./post";

interface Props {
    posts: DataForPostRender[] | undefined;
    isPostsReady: boolean;
}

const Posts: FC<Props> = ({ posts, isPostsReady }) => {
    return (
        <div className="overflow-y-auto flex flex-col flex-grow scrollbar-hide max-h-[810px]">
            {isPostsReady ? (
                posts?.map((data) => (
                    <Post
                        key={data.postId}
                        content={data.content}
                        name={data.name}
                        surname={data.surname}
                        createdAt={data.createdAt}
                        postId={data.postId}
                    />
                ))
            ) : (
                <p>no posts</p>
            )}
        </div>
    );
};

export default Posts;
