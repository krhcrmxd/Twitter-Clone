import { DataForPostRender } from "@/types/post.types";
import { formatDistanceToNow } from "date-fns";
import { CircleUserRound } from "lucide-react";
import { FC } from "react";

const Post: FC<DataForPostRender> = ({ name, surname, createdAt, content }) => {
    const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });
    return (
        <div className="flex flex-row gap-2 pb-4 pl-4 pt-4 w-full border-b-2 border-light rounded text-lightest items-center ">
            <CircleUserRound size={30} />
            <div>
                <p className="flex flex-row gap-1">
                    {`${name} ${surname ? surname + " " : ""}`}
                    <span className="text-light">{`${" " + timeAgo}`}</span>
                </p>
                <p className="max-w-xl">{content}</p>
            </div>
        </div>
    );
};

export default Post;
