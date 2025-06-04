export interface IPost {
    id: string;
    content: string;

    createdAt: Date;
    updatedAt: Date;

    userId: string;
}

export interface ICreatePost {
    content: string;
}

export interface IUpdatePost extends ICreatePost {
    postId: string;
}

export interface DataForPostRender {
    name: string;
    surname?: string;
    createdAt: Date;
    content: string;
    postId: string;
}
