import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePosts } from "@/hooks/usePosts";
import { useToggleState } from "@/hooks/useToggleState";
import { useUserPosts } from "@/hooks/useUserPosts";
import { PostService } from "@/services/post.service";
import { DataForPostRender } from "@/types/post.types";
import { debounce } from "@/utils/debounce";
import { useMutation } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { CircleUserRound, Edit2Icon, Trash2, X } from "lucide-react";
import { ChangeEvent, FC, useState } from "react";

const EditablePost: FC<DataForPostRender> = ({ name, surname, createdAt, content, postId }) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    const [isEditMode, setIsEditMode] = useToggleState();
    const [updateContent, setUpdateContent] = useState<string>("");

    const { refetch: refetchPosts } = usePosts();
    const { refetch: refetchUserPosts } = useUserPosts();

    const mutationEdit = useMutation({
        mutationFn: () =>
            PostService.update({
                content: updateContent,
                postId: postId,
            }),

        onSuccess: () => {
            refetchPosts();
            refetchUserPosts();
        },
    });

    const mutationDelete = useMutation({
        mutationFn: () => PostService.delete(postId),
        onSuccess: () => {
            refetchPosts();
            refetchUserPosts();
        },
    });

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setUpdateContent(e.target.value);
    };

    return (
        <div className="flex flex-row gap-2 pb-4 pl-4 pt-4 w-full border-b-2 border-light rounded text-lightest items-center">
            <CircleUserRound size={30} />
            <div>
                <p className="flex flex-row gap-1">
                    {`${name} ${surname ? surname + " " : ""}`}
                    <span className="text-light">{`${" " + timeAgo}`}</span>
                    <button onClick={setIsEditMode}>
                        {isEditMode ? <X size={15} /> : <Edit2Icon size={15} />}
                    </button>
                    <Trash2
                        size={15}
                        className="cursor-pointer"
                        onClick={() => mutationDelete.mutateAsync()}
                    ></Trash2>
                </p>
                {isEditMode ? (
                    <Input
                        className="max-w-xl bg-darkest border-solid border-2 border-lightest"
                        defaultValue={content}
                        onChange={debounce(handleInput, 250)}
                    />
                ) : (
                    <p className="max-w-xl">{content}</p>
                )}
            </div>
            {isEditMode && (
                <Button
                    variant={"outline"}
                    className="bg-lightest border-solid border-2 border-light hover:bg-light text-darkest mt-5 ml-3"
                    onClick={() => {
                        mutationEdit.mutateAsync();
                        setIsEditMode();
                    }}
                >
                    Save
                </Button>
            )}
        </div>
    );
};

export default EditablePost;
