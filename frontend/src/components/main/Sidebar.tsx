"use client";
import { sidebarItems } from "@/constants/sidebar.constants";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { AuthService } from "@/services/auth.service";
import styles from "@/styles/mainPage.module.scss";
import { useAtom } from "jotai";
import { BadgePlus, CircleUserRound, Home, LogOut, Settings } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { pickedItem } from "../../stores/sidebarPick.store";
import { Button } from "../ui/button";

const Sidebar = () => {
    const [, setPickedWindow] = useAtom(pickedItem);
    const router = useRouter();

    const { data: user, isSuccess, refetch } = useUser();

    useEffect(() => {
        const validate = async () => {
            if (user === undefined) {
                const fetchedUser = (await refetch()).data;
                if (fetchedUser === undefined) {
                    AuthService.logout();
                    router.refresh();
                    router.refresh();
                }
            }
        };
        validate();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <aside className="flex flex-col gap-10 h-full w-1/6 border-r-2 border-light justify-start">
            <h1 className="mb-5 uppercase font-bold text-2xl text-center text-lightest mt-3">
                Twitter Clone
            </h1>
            <Button
                variant={"ghost"}
                onClick={() => setPickedWindow(sidebarItems.HOME)}
                className={styles.sidebarButton}
            >
                <span className="flex flex-row items-center gap-3  w-full h-full">
                    <Home size={24} />
                    {sidebarItems.HOME}
                </span>
            </Button>
            <Button
                variant={"ghost"}
                onClick={() => setPickedWindow(sidebarItems.SETTINGS)}
                className={styles.sidebarButton}
            >
                <span className="flex flex-row items-center gap-3  w-full h-full">
                    <Settings />
                    {sidebarItems.SETTINGS}
                </span>
            </Button>
            <Button
                onClick={() => setPickedWindow(sidebarItems.TWEET)}
                className={styles.tweetButton}
            >
                <span className="flex flex-row items-center justify-center gap-3  w-full h-full">
                    <BadgePlus />
                    {sidebarItems.TWEET}
                </span>
            </Button>
            <div
                className="text-lightest flex ml-4 flex-row gap-2 hover:cursor-pointer"
                onClick={() => setPickedWindow(sidebarItems.PROFILE)}
            >
                <CircleUserRound size={0} />
                {isSuccess ? (
                    <span>
                        {`${user?.name} ${user?.surname !== null ? user?.surname : ""}`}
                        <p className="text-light">{user?.email}</p>
                    </span>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
            <Button
                className={cn(
                    styles.sidebarButton,
                    "text-left flex flex-row items-center gap-3 justify-start"
                )}
                variant={"ghost"}
                onClick={() => {
                    AuthService.logout();
                    router.refresh();
                    router.refresh();
                }}
            >
                <LogOut />
                <span className="">Logout</span>
            </Button>
        </aside>
    );
};

export default Sidebar;
