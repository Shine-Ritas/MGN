import { useEffect,useRef } from "react";

export default function useEffectAfterMount(
    fn: () => void,
    dependencies: any[] = []
): void {
    const isMounted = useRef<boolean>(false);
    const fnRef = useRef(fn);

    useEffect(() => {
        fnRef.current = fn;
    }, [fn]);

    useEffect(() => {
        if (!isMounted.current) {
            isMounted.current = true;
            return;
        }

        fnRef.current();
    }, dependencies);
}
