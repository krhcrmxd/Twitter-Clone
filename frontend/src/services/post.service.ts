import { axiosAuth } from "@/api/axios.config";

import { DataForPostRender, ICreatePost, IPost, IUpdatePost } from "@/types/post.types";

export class PostService {
    static async create(data: ICreatePost) {
        try {
            return axiosAuth.post<IPost>("/post/new", data);
        } catch (e) {
            throw e;
        }
    }

    static async delete(id: string) {
        try {
            return axiosAuth.delete(`/post`, { params: { id } });
        } catch (e) {
            throw e;
        }
    }

    static async update(data: IUpdatePost) {
        try {
            return axiosAuth.put("/post", data);
        } catch (e) {
            throw e;
        }
    }

    static async getAllPosts() {
        try {
            return (await axiosAuth.get<DataForPostRender[]>("/user/all")).data;
        } catch (e) {
            throw e;
        }
    }

    static async getUserPosts() {
        try {
            return (await axiosAuth.get<DataForPostRender[]>("/user/unq")).data;
        } catch (e) {
            throw e;
        }
    }
}
