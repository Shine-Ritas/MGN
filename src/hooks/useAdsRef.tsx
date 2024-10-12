import { useEffect, useCallback } from 'react';

type AdsRef = {
    adsOn: boolean;
    initLoad?: boolean;
};

declare global {
    interface Window {
        aclib: {
            runAutoTag: (config: { zoneId: string }) => void;
        };
    }
}


const useAdsRef = ({ adsOn = true ,initLoad=false}: AdsRef) => {
    const reAds = useCallback(() => {
        if (adsOn) {
            // window.aclib.runAutoTag({
            //     zoneId: 'splpxan5i0',
            // });
        }
    }, [adsOn]);

    useEffect(() => {
        if (initLoad) {
            reAds();
        }
    }
    , [initLoad,reAds]);


    return { reAds };
};

export default useAdsRef;
