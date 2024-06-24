export function capitalize(text: string): string {
    if (text === null) return null;

    const words = text.split(' ');
    words.forEach((word, index) => {
        let letters = word.split('');
        if (word.length >= 3) letters[0] = letters[0].toUpperCase();

        words[index] = letters.join('');
    });

    return words.join(' ');
}
