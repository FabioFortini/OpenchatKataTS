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

    it("will not create when contains inappropriate language", () => {})
    it("will not create when user does not exist", () => {
        // user repository? createPost ha la responsabilita?
    })
    it("will return the created post", () => {})
})