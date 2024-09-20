const readingStyleClasses = (type: string) => {
    // use case or match
    switch (type) {
        case "double-page":
            return{
                "class" :  "grid grid-cols-2 gap-4",
                "max" : 2
            };
        case "single-page":
            return{
                "class" :  "flex flex-col ",
                "max" : 1
            };
        case "long-strip":
            return{
                "class" :  "flex flex-col gap-4",
                "max" : 100
            };
        default:
            return{
                "class" :  "flex flex-col gap-4",
                "max" : 2
            };
    }}


export default readingStyleClasses