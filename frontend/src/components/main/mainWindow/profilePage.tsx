import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sidebarItems } from "@/constants/sidebar.constants";
import { useToggleState } from "@/hooks/useToggleState";
import { useUser } from "@/hooks/useUser";
import { useUserPosts } from "@/hooks/useUserPosts";
import { UserService } from "@/services/user.service";
import { IUserUpdate } from "@/types/user.types";
import { useMutation } from "@tanstack/react-query";
import { CircleUserRound, Edit2Icon, X } from "lucide-react";
import { ChangeEvent, useState } from "react";
import EditablePosts from "./EditPosts/editablePosts";

const ProfilePage = () => {
    const { data: user, isSuccess, refetch: refetchUser } = useUser();
    const { data: userPosts, isSuccess: isUserPostsReady } = useUserPosts();

    const [isNameEditMode, setIsNameEditMode] = useToggleState();
    const [isEmailEditMode, setIsEmailEditMode] = useToggleState();

    const [nameInput, setNameInput] = useState<string>("");
    const [emailInput, setEmailInput] = useState<string>("");

    const handleNameInput = (e: ChangeEvent<HTMLInputElement>) => {
        setNameInput(e.target.value);
    };
    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        setEmailInput(e.target.value);
    };

    const mutation = useMutation({
        mutationFn: (data: IUserUpdate) => UserService.update(data),
        onSuccess() {
            refetchUser();
        },
    });

    return (
        <>
            <h1 className="w-full border-b-2 border-light text-left pl-8 text-lightest pb-4 mt-3 font-bold">
                {sidebarItems.PROFILE}
            </h1>
            <div className="w-full pb-4 flex flex-row text-lightest justify-center gap-5 mt-3 border-b-8 border-light ">
                <div>
                    <CircleUserRound size={90} />
                </div>

                {isSuccess && (
                    <div className="pt-5">
                        <div className="flex gap-1 max-h-[30px]">
                            {isNameEditMode ? (
                                <>
                                    <Input
                                        defaultValue={`${user?.name} ${
                                            user?.surname !== null ? user?.surname : ""
                                        }`}
                                        onChange={handleNameInput}
                                        className="bg-darkest border-solid border-2 border-lightest"
                                    />
                                </>
                            ) : (
                                <p>{`${user?.name} ${user?.surname !== null ? user?.surname : ""}`}</p>
                            )}

                            <button
                                className="pb-2"
                                onClick={setIsNameEditMode}
                            >
                                {isNameEditMode ? <X size={15} /> : <Edit2Icon size={15} />}
                            </button>
                            {isNameEditMode && (
                                <Button
                                    variant={"outline"}
                                    className="bg-lightest border-solid border-2 border-light hover:bg-light text-darkest h-6"
                                    onClick={() => {
                                        const trimmed = nameInput.trim();

                                        const parts = trimmed.split(" ");

                                        if (parts.length == 2) {
                                            mutation.mutateAsync({
                                                name: parts[0],
                                                surname: parts[1],
                                            });
                                        } else {
                                            mutation.mutateAsync({
                                                name: trimmed,
                                            });
                                        }

                                        setIsNameEditMode();
                                    }}
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                        <div className="flex gap-1 max-h-[30px] mt-1">
                            {isEmailEditMode ? (
                                <Input
                                    defaultValue={user?.email}
                                    className="bg-darkest border-solid border-2 border-lightest"
                                    onChange={handleEmailInput}
                                />
                            ) : (
                                <p className="pt-2">{user?.email}</p>
                            )}

                            <button onClick={setIsEmailEditMode}>
                                {isEmailEditMode ? <X size={15} /> : <Edit2Icon size={15} />}
                            </button>
                            {isEmailEditMode && (
                                <Button
                                    variant={"outline"}
                                    className="bg-lightest border-solid border-2 border-light hover:bg-light text-darkest h-6"
                                    onClick={() => {
                                        mutation.mutateAsync({
                                            email: emailInput,
                                        });
                                        setIsEmailEditMode();
                                    }}
                                >
                                    Save
                                </Button>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <EditablePosts
                posts={userPosts}
                isPostsReady={isUserPostsReady}
            />
        </>
    );
};

export default ProfilePage;
