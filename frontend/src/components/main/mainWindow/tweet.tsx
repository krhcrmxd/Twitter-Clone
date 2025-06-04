"use client";
import { Button } from "@/components/ui/button";
import { TextareaWithLabel } from "@/components/ui/textareawithLabel";
import { sidebarItems } from "@/constants/sidebar.constants";
import { usePosts } from "@/hooks/usePosts";
import { PostService } from "@/services/post.service";
import { pickedItem } from "@/stores/sidebarPick.store";
import styles from "@/styles/mainPage.module.scss";
import { ICreatePost } from "@/types/post.types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const Tweet = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ICreatePost>();

    const [, setPickedWindow] = useAtom(pickedItem);

    const [inFocus, setInFocus] = useState<boolean>(false);

    const { refetch: refetchPosts } = usePosts();

    const mutation = useMutation({
        mutationFn: async (postContent: ICreatePost) => PostService.create(postContent),
        onSuccess() {
            refetchPosts();
            toast("Post published");
            setPickedWindow(sidebarItems.HOME);
        },
    });

    const onSubmit: SubmitHandler<ICreatePost> = (content) => {
        mutation.mutateAsync(content);
    };
    return (
        <div className="flex flex-grow flex-col">
            <Toaster
                position="bottom-right"
                toastOptions={{ duration: 2000 }}
            />
            <h1 className="w-full h-10 border-b-2 border-light text-left pl-6 text-lightest font-bold mt-3">
                {sidebarItems.TWEET}
            </h1>
            <div className="h-5/6 w-full pl-6 pt-2">
                <form
                    className="h-full w-11/12 flex flex-col gap-10 items-center"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <TextareaWithLabel
                        label="Content"
                        labelClass="text-lightest font-bold"
                        placeholder="tweet content"
                        className="h-40 resize-none bg-darker border-light text-lightest focus:outline-none focus:border-lightest"
                        onFocus={() => setInFocus(true)}
                        {...register("content", {
                            required: { value: true, message: "Post is empty" },
                        })}
                        onBlur={() => setInFocus(false)}
                    />
                    {errors.content && inFocus && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {errors.content.message}
                        </p>
                    )}
                    {mutation.isError && inFocus && (
                        <p
                            className="text-red-600"
                            role="alert"
                        >
                            {mutation.error instanceof AxiosError
                                ? mutation.error.response?.data?.message
                                : null}
                        </p>
                    )}
                    <Button
                        variant={"outline"}
                        className={styles.tweetButton}
                    >
                        {sidebarItems.TWEET}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default Tweet;
