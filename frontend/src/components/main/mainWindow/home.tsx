"use client";
import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/inputWithLabel";
import { sidebarItems } from "@/constants/sidebar.constants";
import { usePosts } from "@/hooks/usePosts";
import { PostService } from "@/services/post.service";
import { ICreatePost } from "@/types/post.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import Posts from "./Posts/posts";

const Home = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreatePost>();

    const [inFocus, setInFocus] = useState<boolean>(false);

    const { refetch: refetchPosts, data: posts, isSuccess: isPostsReady } = usePosts();

    const mutation = useMutation({
        mutationFn: async (postContent: ICreatePost) => PostService.create(postContent),
        onSuccess() {
            refetchPosts();
            toast("Post published");
            PostService.create({ content: "Test" });
        },
    });

    const onSubmit: SubmitHandler<ICreatePost> = (content) => {
        mutation.mutateAsync(content);
    };

    return (
        <>
            <h1 className="w-full  border-b-2 border-light text-left pl-8 text-lightest pb-4 mt-3 font-bold">
                {sidebarItems.HOME}
            </h1>
            <form
                className="w-full border-b-8 border-light p-5 flex flex-row justify-between items-center"
                onSubmit={handleSubmit(onSubmit)}
            >
                <Toaster
                    position="bottom-right"
                    toastOptions={{ duration: 2000 }}
                ></Toaster>
                <div className="w-full h-full">
                    <InputWithLabel
                        label=""
                        className="bg-darker border-light w-full text-lightest h-full focus-visible:border-lightest"
                        placeholder="What`s on your mind?"
                        onFocus={() => setInFocus(true)}
                        type="text"
                        {...register("content", {
                            required: { value: true, message: "Post is empty" },
                        })}
                        onBlur={() => setInFocus(false)}
                    ></InputWithLabel>
                    {errors.content && inFocus && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.content.message}
                        </p>
                    )}
                    {mutation.isError && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {mutation.error instanceof AxiosError
                                ? mutation.error.response?.data?.message
                                : null}
                        </p>
                    )}
                </div>
                <Button
                    variant={"outline"}
                    className="mr-10 bg-lightest font-bold uppercase h-4/5 rounded-xl hover:bg-light hover:border-light duration-500"
                    type="submit"
                >
                    {sidebarItems.TWEET}
                </Button>
            </form>
            <Posts
                isPostsReady={isPostsReady}
                posts={posts}
            />
        </>
    );
};

export default Home;
