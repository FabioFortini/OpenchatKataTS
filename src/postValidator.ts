export class PostValidator {
    private inappropriateWords: string[] = ["orange", "elephant"]

    validate(content: string) {
        return !this.hasInappropriateWords(content);
    }

    private hasInappropriateWords(content: string) {
        return this.inappropriateWords.some((wrongWord: string) => content.includes(wrongWord));
    }
}