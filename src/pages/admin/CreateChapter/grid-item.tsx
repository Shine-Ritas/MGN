import { forwardRef, HTMLAttributes, memo, useMemo, useRef } from 'react';
import { getFileUrlCache } from './cache/cache';
import ZoomableImage from '@/components/ui/zoomable-image';
import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { Move } from 'lucide-react';
import { FileWithUniqueId } from './chapter-content';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: number;
    withOpacity?: boolean;
    isDragging?: boolean;
    file?: FileWithUniqueId
    index?: number;
};

const STATIC_STYLES = {
    transformOrigin: '50% 50%',
    height: '310px',
    width: '210px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
} as const;

const fileUrlCache = getFileUrlCache();

function isValidUrl(url : string) {
    try {
        new URL(url); // Try to create a URL object
        return true;     // If successful, it's a valid URL
    } catch (_) {
        return false;    // If an error occurs, it's not a valid URL
    }
}const Item = memo(
    forwardRef<HTMLDivElement, ItemProps>(({ withOpacity, isDragging, style, file, index, ...props }, ref) => {
        const fileURLRef = useRef<string | null>(null);

        const fileURL = useMemo(() => {
            if (!file) return null;
            if (fileUrlCache.has(file)) {
                return fileUrlCache.get(file)!;
            }
            const url = isValidUrl(file.path!) ? file.path : URL.createObjectURL(file);
            fileUrlCache.set(file, url!);
            fileURLRef.current = url ?? null;
            return url;
        }, [file]);

        const dynamicStyles = {
            opacity: withOpacity ? 0.5 : 1,
        };

        const { attributes, listeners } = useSortable({ id: props.id });

        return (
            <div 
                ref={ref}
                style={{ ...STATIC_STYLES, ...dynamicStyles, ...style }}
                className="bg-background border border-background/50 relative"
                {...props}
            >
                {file!.isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-10">
                        <span className="text-white text-sm">Uploading...</span>
                    </div>
                )}
                
                {fileURL && (
                    <>
                        <ZoomableImage
                            src={fileURL} 
                            alt="thumbnail" 
                            className="w-full h-full object-contain rounded" 
                        />
                        <Button
                            className={`absolute -top-4 -right-4 rounded-full p-2 ${
                                isDragging ? 'cursor-grabbing' : 'cursor-grab'
                            }`}
                            {...attributes}
                            {...listeners}
                        >
                            <Move className="h-4 w-4" />
                        </Button>
                        <Button 
                            disabled={file!.isUploading}
                            variant={file!.isUploaded ? 'success' : 'destructive'}
                            className="absolute bottom-0 h-6 px-2 -right-4"
                        >
                            {index}
                        </Button>
                    </>
                )}
            </div>
        );
    })
);

Item.displayName = "Item";

export default Item;
