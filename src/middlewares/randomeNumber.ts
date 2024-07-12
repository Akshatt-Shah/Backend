import randomstring from 'randomstring';

export function generateRandomAccountNumber(length: number): string {
    // Generate a random numeric string of the specified length
    return randomstring.generate({
        length,
        charset: 'numeric'
    });
}
