import { variantInterface } from "@/routes/type";
import { type ClassValue, clsx } from "clsx"
import JSZip from "jszip";
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

    if (diff < 0) {
        return 'Expired';
    }

    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    return `${days} days, ${hours} hours, and ${minutes} minutes left`;
};


export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export const isSubscriptionValid = (date?: string | number | Date) => {

    if (!date) {
        return false;
    }

    return new Date(date) > new Date();
}

export const isSubscriptionExpired = (date?: string | number | Date, subscription_name?: string): { variant: variantInterface, message: string } => {
    if (!date) {
        return { variant: "destructive", message: "No Subscription" };
    }
    return new Date(date) < new Date()
        ? { variant: "destructive", message: "Expired" }
        : { variant: "gold", message: subscription_name! };
}

export function prefixRoutes<T extends Record<string, any>>(prefix: string, routes: T): T {
    const prefixedRoutes: Record<string, any> = {};

    for (const key in routes) {
        if (Object.prototype.hasOwnProperty.call(routes, key)) {
            const value = routes[key] as any;
            if (typeof value === 'string') {
                prefixedRoutes[key] = prefix + value;
            } else if (typeof value === 'object' && value.to) {
                prefixedRoutes[key] = { ...value, to: prefix + value.to };
            } else {
                prefixedRoutes[key] = value;
            }
        }
    }

    return prefixedRoutes as T;
}

export const getRandomInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min) * 60 * 1000; // Convert minutes to milliseconds
};

export const rTitle = (title: string,limit: number  = 20) => {
    return title.length > limit
        ? `${title.substring(0, limit)}...`
        : title
}

export const extractZip = async (file: File): Promise<File[]> => {
    const zip = new JSZip();
    const zipData = await zip.loadAsync(file);
    const extractedImages: File[] = [];
  
    for (const f of Object.values(zipData.files)) {
      if (f.dir) continue; // Skip directories
  
      if (f.name.startsWith("__MACOSX/") || f.name.includes("/._")) continue; // Skip MacOS metadata files
  
      if (/\.(png|jpe?g|webp)$/i.test(f.name)) {
        // ✅ Extract image file
        const imageData = await f.async("uint8array");
        const content = new Blob([imageData], { type: "image/jpeg" });
        extractedImages.push(new File([content], f.name, { type: content.type }));
      } else if (f.name.endsWith(".zip")) {
        // 🔄 Recursively extract nested ZIP
        const nestedZipData = await f.async("uint8array");
        const nestedFile = new File([nestedZipData], f.name, { type: "application/zip" });
        const nestedImages = await extractZip(nestedFile); // Recursive call
        extractedImages.push(...nestedImages);
      }
    }
  
    return extractedImages;
  }


export const whereIn = <T>(array: T[], haystacks: T[],key:string): T[] => {
    return array.filter((item) => {
        return haystacks.includes(item[key]);
    });
}
