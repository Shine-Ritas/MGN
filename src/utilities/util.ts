export const goTo = (path: string, delay: number = 500) => {
    setTimeout(() => {
        window.location.href = path; // Use href to assign the URL as a string
    }, delay);
}
