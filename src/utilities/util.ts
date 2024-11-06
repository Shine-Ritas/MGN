import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"


export const goTo = (path: string, delay: number = 500) => {
    setTimeout(() => {
        window.location.href = path; // Use href to assign the URL as a string
    }, delay);
}


export const timeLeft = (di?: string | number | Date) => {
    if (!di) {
        return 'Invalid date';
    }
    const diff = new Date(di).getTime() - new Date().getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days} days, ${hours} hours, and ${minutes} minutes left`;
  };
  
  


  export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
  }
  
