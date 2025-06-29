export const avatarTitle = (userName: string): string => {
    const wordsArr = userName?.split(' ');
    if(wordsArr?.length > 0) {
        let letters = '';

        wordsArr?.forEach(word => {
            letters += word.charAt(0);
            return letters;
        });
        return letters;
    } else {
        return '';
    }
}