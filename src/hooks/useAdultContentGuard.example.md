# useAdultContentGuard Hook

A custom React hook for handling adult content warnings and user consent across your application.

## Features

- ✅ Automatic adult content detection
- ✅ Persistent consent management via localStorage
- ✅ Customizable redirect paths
- ✅ Reusable across multiple components
- ✅ One-time consent (stored permanently until user clears localStorage)

## Usage

### Basic Example

```tsx
import useAdultContentGuard from "@/hooks/useAdultContentGuard";
import AdultContentModal from "@/components/ui/adult-content-modal";

const YourComponent = () => {
    const { data, isLoading } = useQuery("your-endpoint");
    
    // Check if content has adult material
    const hasAdultContent = data?.categories?.some(
        (category: any) => category.is_adult === true
    ) || false;

    // Use the hook
    const { 
        showAdultModal, 
        handleAcceptAdultContent, 
        handleDeclineAdultContent,
        hasConsent 
    } = useAdultContentGuard({
        hasAdultContent,
        isLoading,
        redirectPath: "/" // optional, defaults to "/"
    });

    return (
        <>
            <AdultContentModal 
                isOpen={showAdultModal}
                onAccept={handleAcceptAdultContent}
                onDecline={handleDeclineAdultContent}
            />
            
            {/* Your component content */}
            <div>Your content here</div>
        </>
    );
};
```

### Advanced Example - Conditional Rendering

```tsx
const YourComponent = () => {
    const { data, isLoading } = useQuery("your-endpoint");
    const hasAdultContent = data?.is_adult || false;

    const { 
        showAdultModal, 
        handleAcceptAdultContent, 
        handleDeclineAdultContent,
        hasConsent 
    } = useAdultContentGuard({
        hasAdultContent,
        isLoading,
        redirectPath: "/safe-content"
    });

    // Only render content if user has consented or content is not adult
    if (hasAdultContent && !hasConsent) {
        return null; // or a loading state
    }

    return (
        <>
            <AdultContentModal 
                isOpen={showAdultModal}
                onAccept={handleAcceptAdultContent}
                onDecline={handleDeclineAdultContent}
            />
            
            <div>Adult content displayed here</div>
        </>
    );
};
```

## Props

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `hasAdultContent` | `boolean` | Yes | - | Whether the content contains adult material |
| `isLoading` | `boolean` | No | `false` | Whether the content is still loading |
| `redirectPath` | `string` | No | `"/"` | Path to redirect when user declines |

## Return Values

| Property | Type | Description |
|----------|------|-------------|
| `showAdultModal` | `boolean` | Whether to show the modal |
| `handleAcceptAdultContent` | `() => void` | Function to handle user acceptance |
| `handleDeclineAdultContent` | `() => void` | Function to handle user decline |
| `hasConsent` | `boolean` | Whether user has given consent |

## localStorage Key

The hook uses the key `"adult_content_consent"` to store user consent. The value will be `"accepted"` when the user has consented.

## Notes

- Once a user accepts adult content, they won't see the modal again (consent is stored in localStorage)
- If a user declines, they will be redirected to the specified path
- If the user declines, they will see the modal again the next time they visit adult content
- The modal will only show after content has finished loading (`isLoading` is `false`)

