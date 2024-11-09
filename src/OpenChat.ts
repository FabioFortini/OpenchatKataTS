import express from "express";
import * as http from "node:http";

export type Post = {
    postId: string;
    userId: string;
    text: string;
    dateTime: string;
}

export interface CreatePostError {
    errorType: "USER_NOT_FOUND"
}

export interface CreatePostUseCase {
    execute(userId: string, content: string): Post | CreatePostError;
}

export class OpenChat {
    private server?: http.Server;
    private _createPostUseCase: CreatePostUseCase;

    constructor(createPostUseCase: CreatePostUseCase) {
        this._createPostUseCase = createPostUseCase;

    }

    start() {
        const app = express();
        app.use(express.json());
        app.post("/users/:userId/timeline", async (req, res) => {
            let createPostResult = this._createPostUseCase.execute(req.params.userId, req.body.text);
            if ((createPostResult as CreatePostError).errorType === "USER_NOT_FOUND") {
                res.sendStatus(404)
                return
            }
            res.json(createPostResult)
        })

        this.server = app.listen(3000);
    }

    stop() {
        this.server?.close();
    }
}