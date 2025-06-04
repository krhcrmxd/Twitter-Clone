import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { sidebarItems } from "@/constants/sidebar.constants";
import { UserService } from "@/services/user.service";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const Settings = () => {
    const router = useRouter();
    return (
        <div>
            <h1 className="w-full h-1/6 border-b-2 border-light text-left pl-6 text-lightest font-bold">
                {sidebarItems.SETTINGS}
            </h1>
            <div className="h-5/6 w-full">
                <div className="border-b-2 pl-6 border-light">
                    <h2 className="text-left text-lightest font-bold">App Settings</h2>
                </div>
                <div className=" pl-6 border-b-2 border-light flex flex-col gap-5 pb-3">
                    <h2 className=" text-left text-lightest font-bold">User Settings</h2>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"destructive"}
                                className="w-1/6 hover:bg-red-900 transition-colors duration-300"
                            >
                                <span className="flex flex-row gap-2">
                                    Delete Account
                                    <Trash2 />
                                </span>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-light border-solid border-2 border-lightest text-lightest">
                            <p>You sure?</p>
                            <Button
                                variant={"destructive"}
                                className="hover:bg-red-900 transition-colors duration-300"
                                onClick={async () => {
                                    await UserService.delete();
                                    router.replace("/auth/login");
                                }}
                            >
                                <span className="flex flex-row gap-2">
                                    Yes
                                    <Trash2 />
                                </span>
                            </Button>
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
        </div>
    );
};

export default Settings;
