import {describe, expect, it} from "vitest";
import {PostValidator} from "../src/postValidator";

describe("postValidator", () => {
    it('consider not valid post containing orange', () => {
        const wrongPostContent = "this text is orange"
        const postValidator = new PostValidator()

        const isValid: boolean = postValidator.validate(wrongPostContent)

        expect(isValid).toBeFalsy()
    })

    it('consider valid post without orange', () => {
        const wrongPostContent = "this text is blue"
        const postValidator = new PostValidator()

        const isValid: boolean = postValidator.validate(wrongPostContent)

        expect(isValid).toBeTruthy()
    })

    it('consider not valid post containing elephant', () => {
        const wrongPostContent = "this text is an elephant"
        const postValidator = new PostValidator()

        const isValid: boolean = postValidator.validate(wrongPostContent)

        expect(isValid).toBeFalsy()
    })
})