import express from "express";
import * as http from "node:http";
import {CreatePostError, CreatePostUseCase} from "./CreatePostUseCase.ts";

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