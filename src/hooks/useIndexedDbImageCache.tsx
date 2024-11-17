import { useState, useCallback } from "react";

// Types for IndexedDB and hook
interface UseIndexedDbImageCache {
    storeImage: (key: string, imageUrl: string) => Promise<void>;
    getCachedImage: (key: string,fallback:string,autoCache?:boolean) => Promise<string | null>;
    error: string | null;
    loading: boolean;
}

// Hook Implementation
export const useIndexedDbImageCache = (): UseIndexedDbImageCache => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const openDatabase = useCallback((): Promise<IDBDatabase> => {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("ImageCacheDB", 1);

            request.onupgradeneeded = (event) => {
                const db = request.result;
                if (!db.objectStoreNames.contains("images")) {
                    db.createObjectStore("images");
                }
            };

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }, []);

    const storeImage = useCallback(
        async (key: string, imageUrl: string): Promise<void> => {
            setLoading(true);
            setError(null);
            try {
                const db = await openDatabase();
                const response = await fetch(imageUrl);
                if (!response.ok) throw new Error("Failed to fetch image.");
                const blob = await response.blob();

                const transaction = db.transaction("images", "readwrite");
                const store = transaction.objectStore("images");
                store.put(blob, key);

                transaction.oncomplete = () => {
                    setLoading(false);
                };

                transaction.onerror = () => {
                    setLoading(false);
                    setError(transaction.error?.message || "Failed to store image.");
                };
            } catch (err: any) {
                setLoading(false);
                setError(err.message || "An error occurred.");
            }
        },
        [openDatabase]
    );

    const getCachedImage = useCallback(
        async (key: string,fallback:string,autoCache?:boolean): Promise<string | null> => {
            setLoading(true);
            setError(null);
            try {
                const db = await openDatabase();
                const transaction = db.transaction("images", "readonly");
                const store = transaction.objectStore("images");
                const request = store.get(key);

                return new Promise<string | null>((resolve, reject) => {
                    request.onsuccess = () => {
                        const blob = request.result as Blob;
                        if (blob) {
                            resolve(URL.createObjectURL(blob));
                        } else {
                            if(autoCache){
                                storeImage(key, fallback);
                            }
                            resolve(fallback);
                            
                        }
                    };
                    request.onerror = () => {
                        setError(request.error?.message || "Failed to retrieve image.");
                        reject(null);
                    };
                });
            } catch (err: any) {
                setError(err.message || "An error occurred.");
                setLoading(false);
                return null;
            } finally {
                setLoading(false);
            }
        },
        [openDatabase]
    );

    return { storeImage, getCachedImage, error, loading };
};
