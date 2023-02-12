export default function highScore(scores: object, threshold: number): boolean {
    return Object.values(
        scores
    )
        .filter((score) => score > threshold)
        .length > 0
}
