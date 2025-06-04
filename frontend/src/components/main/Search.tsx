"use client";
import { usePosts } from "@/hooks/usePosts";
import { debounce } from "@/utils/debounce";
import { SearchIcon } from "lucide-react";
import { useMemo, useState, type ChangeEvent } from "react";
import { Input } from "../ui/input";
import Post from "./mainWindow/Posts/post";

const Search = () => {
    const [searchingInfo, setSearchingInfo] = useState<string>("");

    const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchingInfo(e.target.value);
    };

    const { data: posts, isSuccess } = usePosts();

    const filteredPosts = useMemo(() => {
        return posts
            ?.filter(
                (data) =>
                    data.name.includes(searchingInfo) ||
                    data.content.includes(searchingInfo) ||
                    data.surname?.includes(searchingInfo)
            )
            .map((data) => (
                <Post
                    key={data.postId}
                    content={data.content}
                    name={data.name}
                    surname={data.surname}
                    createdAt={data.createdAt}
                    postId={data.postId}
                />
            ));
    }, [posts, searchingInfo]);

    return (
        <div className="h-full w-2/6 flex flex-col items-center pt-2">
            <Input
                className="w-5/6 bg-darker border-light border-solid border-2 placeholder:text-lightest pl-2 rounded-xl text-lightest focus-visible:border-lightest transition-colors duration-300"
                placeholder="Search"
                onChange={debounce(handleInput, 500)}
            />
            <div
                className={`w-5/6 bg-darker mt-3 h-full rounded-lg mb-3 ${
                    !searchingInfo ? "flex items-center justify-center" : null
                }`}
            >
                {!searchingInfo ? (
                    <SearchIcon
                        size={70}
                        color="#808080"
                    />
                ) : null}
                {searchingInfo && isSuccess ? filteredPosts : null}
            </div>
        </div>
    );
};

export default Search;
