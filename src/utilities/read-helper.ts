const readingStyleClasses = (type: string) => {
    switch (type) {
        case "double-page":
            return {
                class: "flex justify-center gap-1", // Centers the images and adds a small gap
                imageClass: "shadow-2xl max-h-screen w-1/2", // Ensures full height without distorting width
                max: 2,
            };
        case "single-page":
            return {
                class: "flex flex-col items-center gap-2",
                imageClass: "rounded shadow-md ", // Full height with centered content
                max: 1,
            };
        case "long-strip":
            return {
                class: "flex flex-col items-center gap-1 max-h-screen overflow-y-scroll",
                imageClass: "w-4/5 h-auto", // Long strip with consistent width
                max: 100,
            };
        default:
            return {
                class: "flex flex-col gap-4",
                max: 2,
            };
    }
};

export default readingStyleClasses;
