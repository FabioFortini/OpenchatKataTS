import express from "express";

export type Post = {
    postId: string;
    userId: string;
    text: string;
    dateTime: string;
}

export interface CreatePostUseCase {
    execute(userId: string, content: string): Post;
}

export class OpenChat {
    private _createPostUseCase: CreatePostUseCase;

    constructor(createPostUseCase: CreatePostUseCase) {
        this._createPostUseCase = createPostUseCase;

    }

    start() {
        const app = express();
        app.use(express.json());
        app.post("/users/:userId/timeline", async (req, res) => {
            let createdPost = this._createPostUseCase.execute(req.params.userId, req.body.text);
            res.json(createdPost)
        })

        app.listen(3000)
    }
}