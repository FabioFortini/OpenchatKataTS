import express from "express";
import * as http from "node:http";

export type Post = {
    postId: string;
    userId: string;
    text: string;
    dateTime: string;
}

export interface CreatePostError {
    errorType: "USER_NOT_FOUND" | "INAPPROPRIATE_LANGUAGE"
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
        app.post("/users/:userId/timeline", (req: any, res: any) => {
            let createPostResult = this._createPostUseCase.execute(req.params.userId, req.body.text);
            let error = (createPostResult as CreatePostError).errorType;
            if (error === "USER_NOT_FOUND") return res.sendStatus(404)
            if (error === "INAPPROPRIATE_LANGUAGE") return res.sendStatus(400)

            res.json(createPostResult)
        })

        this.server = app.listen(3000);
    }

    stop() {
        this.server?.close();
    }
}