export interface PostRepository {
    createPost(userId: string, content: string): void
}