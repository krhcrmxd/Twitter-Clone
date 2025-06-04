import { UserService } from "@/services/user.service";
import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: () => UserService.getUnique(),
        retry: false,
    });
};
