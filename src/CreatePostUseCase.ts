import {PostRepository} from "./PostRepository.ts";
import {Post} from "./Post.ts";

export interface CreatePostUseCase {
    execute(userId: string, content: string): Post | CreatePostError;
}

export interface CreatePostError {
    errorType: "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE"
}

export class CreatePost implements CreatePostUseCase {
    private _postRepository: PostRepository;
    constructor(postRepository: PostRepository) {
        this._postRepository = postRepository;
    }

    execute(userId: string, content: string): Post | CreatePostError {
        this._postRepository.createPost(userId, content)
        return {} as Post;
    }
}