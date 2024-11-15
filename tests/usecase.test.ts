import {describe, expect, it} from 'vitest'
import {mock} from "vitest-mock-extended";
import {PostRepository} from "../src/PostRepository";
import {CreatePost, CreatePostUseCase} from "../src/CreatePostUseCase";

describe("CreatePostUseCase implementation", () => {
    it("will create a new post", () => {
        const mockPostRepository = mock<PostRepository>()
        const createPostUseCase: CreatePostUseCase = new CreatePost(mockPostRepository);

        createPostUseCase.execute("1234", "This is a post");

        expect(mockPostRepository.createPost).toHaveBeenCalledWith("1234", "This is a post")
    })
})