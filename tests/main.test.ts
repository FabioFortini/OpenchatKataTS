import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {CreatePostError, CreatePostUseCase, OpenChat, Post} from "../src/OpenChat";
import {mock} from "vitest-mock-extended";




describe("Create Post API", () => {
    const mockCreatePostUseCase = mock<CreatePostUseCase>()
    const openChat = new OpenChat(mockCreatePostUseCase)
    const userId = "1234";

    beforeEach(() => openChat.start())
    afterEach(() => openChat.stop())

    it("returns the created post on the timeline", async () => {
        const createdPost = {
            postId: "saved-createdPost-id",
            userId: "1234",
            text: "This is created",
            dateTime: "2018-01-10T11:30:00Z"
        } as Post;
        mockCreatePostUseCase.execute.mockReturnValue(createdPost);

        const result = await fetch(`http://localhost:3000/users/${userId}/timeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": "This is a post"})
        });

        expect(mockCreatePostUseCase.execute).toHaveBeenCalledWith("1234", "This is a post")
        const body = await result.json();
        expect(body).toEqual({
            "postId": "saved-createdPost-id",
            "userId": "1234",
            "text": "This is created",
            "dateTime": "2018-01-10T11:30:00Z"
        })
    })

    it("returns 404 when user not found", async () => {
        mockCreatePostUseCase.execute.mockReturnValue({
            errorType: "USER_NOT_FOUND"
        } as CreatePostError);

        const result = await fetch(`http://localhost:3000/users/any/timeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": "not relevant"})
        });

        expect(result.status).toEqual(404)
    })
})
