export const cacheContainer = { fileUrlCache: new WeakMap<File, string>() };

// Function to retrieve the current cache, ensuring you always get the latest reference
export const getFileUrlCache = () => cacheContainer.fileUrlCache;

// Function to clear the cache by creating a new WeakMap
export const clearCacheContainer = () => {
    cacheContainer.fileUrlCache = new WeakMap<File, string>();
};
