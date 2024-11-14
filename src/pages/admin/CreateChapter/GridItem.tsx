import { forwardRef, HTMLAttributes, memo, useMemo, useRef } from 'react';
import { getFileUrlCache } from './cache/cache';
import ZoomableImage from '@/components/ui/zoomable-image';
import { Button } from '@/components/ui/button';
import { useSortable } from '@dnd-kit/sortable';
import { Move } from 'lucide-react';

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
    id: number;
    withOpacity?: boolean;
    isDragging?: boolean;
    file?: File;
    index?: number;
};

const STATIC_STYLES = {
    transformOrigin: '50% 50%',
    height: '140px',
    width: '140px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
} as const;

const fileUrlCache = getFileUrlCache();

const Item = memo(
    forwardRef<HTMLDivElement, ItemProps>(({ withOpacity, isDragging, style, file, index, ...props }, ref) => {
        const fileURLRef = useRef<string | null>(null);

        // Generate or retrieve cached object URL for the file only once
        const fileURL = useMemo(() => {
            if (!file) return null;
            if (fileUrlCache.has(file)) {
                return fileUrlCache.get(file)!;
            }
            const url = URL.createObjectURL(file);
            fileUrlCache.set(file, url);
            fileURLRef.current = url;
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
                        variant={'destructive'}
                        className="absolute bottom-0 h-6 px-2 -right-4">{index}</Button>
                    </>
                )}
            </div>
        );
    })
);

Item.displayName = "Item";

export default Item;
