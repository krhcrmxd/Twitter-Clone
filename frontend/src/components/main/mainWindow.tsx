"use client";

import { sidebarItems } from "@/constants/sidebar.constants";
import { pickedItem } from "@/stores/sidebarPick.store";
import { useAtom } from "jotai";
import Home from "./mainWindow/home";
import ProfilePage from "./mainWindow/profilePage";
import Settings from "./mainWindow/settings";
import Tweet from "./mainWindow/tweet";

const MainWindow = () => {
    const [pickedWindow] = useAtom(pickedItem);

    return (
        <div className="h-full w-3/6 border-solid border-r-2 border-light">
            {pickedWindow === sidebarItems.HOME ? <Home></Home> : null}
            {pickedWindow === sidebarItems.SETTINGS ? <Settings></Settings> : null}
            {pickedWindow === sidebarItems.TWEET ? <Tweet></Tweet> : null}
            {pickedWindow === sidebarItems.PROFILE ? <ProfilePage></ProfilePage> : null}
        </div>
    );
};

export default MainWindow;
