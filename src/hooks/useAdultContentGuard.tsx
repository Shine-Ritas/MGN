import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const ADULT_CONTENT_CONSENT_KEY = "adult_content_consent";

interface UseAdultContentGuardProps {
    hasAdultContent: boolean;
    isLoading?: boolean;
    redirectPath?: string;
}

interface UseAdultContentGuardReturn {
    showAdultModal: boolean;
    handleAcceptAdultContent: () => void;
    handleDeclineAdultContent: () => void;
    hasConsent: boolean;
}

/**
 * Custom hook to handle adult content warnings and consent
 * @param hasAdultContent - Whether the content contains adult material
 * @param isLoading - Whether the content is still loading
 * @param redirectPath - Path to redirect when user declines (defaults to "/")
 * @returns Object containing modal state and handlers
 */
const useAdultContentGuard = ({
    hasAdultContent,
    isLoading = false,
    redirectPath = "/"
}: UseAdultContentGuardProps): UseAdultContentGuardReturn => {
    const navigate = useNavigate();
    const [showAdultModal, setShowAdultModal] = useState(false);
    const [hasConsent, setHasConsent] = useState(false);
    const [hasCheckedConsent, setHasCheckedConsent] = useState(false);

    // Check for adult content and handle consent
    useEffect(() => {
        if (!isLoading && !hasCheckedConsent) {
            if (hasAdultContent) {
                const consent = localStorage.getItem(ADULT_CONTENT_CONSENT_KEY);
                
                if (consent === "accepted") {
                    setHasConsent(true);
                    setHasCheckedConsent(true);
                } else {
                    setShowAdultModal(true);
                    setHasConsent(false);
                }
            } else {
                setHasConsent(true);
                setHasCheckedConsent(true);
            }
        }
    }, [hasAdultContent, isLoading, hasCheckedConsent]);

    const handleAcceptAdultContent = useCallback(() => {
        localStorage.setItem(ADULT_CONTENT_CONSENT_KEY, "accepted");
        setShowAdultModal(false);
        setHasConsent(true);
        setHasCheckedConsent(true);
    }, []);

    const handleDeclineAdultContent = useCallback(() => {
        setShowAdultModal(false);
        setHasConsent(false);
        navigate(redirectPath);
    }, [navigate, redirectPath]);

    return {
        showAdultModal,
        handleAcceptAdultContent,
        handleDeclineAdultContent,
        hasConsent
    };
};

export default useAdultContentGuard;

