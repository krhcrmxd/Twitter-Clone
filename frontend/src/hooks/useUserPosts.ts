import { PostService } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export const useUserPosts = () => {
    return useQuery({
        queryKey: ["userPosts"],
        queryFn: () => PostService.getUserPosts(),
        retry: false,
    });
};
