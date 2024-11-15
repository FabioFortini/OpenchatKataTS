import {afterEach, beforeEach, describe, expect, it} from 'vitest'
import {OpenChat} from "../src/OpenChat";
import {mock} from "vitest-mock-extended";
import {CreatePostError, CreatePostUseCase} from "../src/CreatePostUseCase";
import {Post} from "../src/Post";

describe("Create Post API controller", () => {
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

        const result = await fetch(`http://localhost:3000/users/non-existing/timeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": "not relevant"})
        });

        expect(result.status).toEqual(404)
    })

    it("returns 400 when contains inappropriate language", async () => {
        mockCreatePostUseCase.execute.mockReturnValue({
            errorType: "INAPPROPRIATE_LANGUAGE"
        } as CreatePostError);

        const result = await fetch(`http://localhost:3000/users/${userId}/timeline`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"text": "this will be inappropriate"})
        });

        expect(result.status).toEqual(400)
    })
})
