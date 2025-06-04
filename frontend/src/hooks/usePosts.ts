import { PostService } from "@/services/post.service";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
    return useQuery({
        queryKey: ["posts"],
        queryFn: () => PostService.getAllPosts(),
        retry: 3,
        staleTime: 20000,
        refetchInterval: 30000,
    });
};
