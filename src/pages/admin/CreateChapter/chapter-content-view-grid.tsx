import { useCallback, useEffect, useState } from 'react';
import {
    DndContext,
    closestCenter,
    MouseSensor,
    TouchSensor,
    DragOverlay,
    useSensor,
    useSensors,
    DragStartEvent,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    restrictToFirstScrollableAncestor,
} from "@dnd-kit/modifiers";

import SortableItem from './sortable-grid-item';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Item from './grid-item';
import { FileWithUniqueId } from './chapter-content';
import useMutate from '@/hooks/useMutate';



const ChapterContentViewGrid = ({ uploadedData = [], setUploadedData }: { uploadedData: FileWithUniqueId[], setUploadedData: any }) => {
    const [items, setItems] = useState<FileWithUniqueId[]>(uploadedData);
    const [activeItem, setActiveItem] = useState<FileWithUniqueId | null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const [postDrag, { isLoading }] = useMutate({ callback: undefined, navigateBack: false });

    const [postDelete, { isLoading: isDeleting }] = useMutate({ callback: undefined, navigateBack: false });

    const handleDelete = useCallback(async (id: string) => {
        const index = items.findIndex((item) => item.id === id);
        const deletedItem = items[index];
        if (deletedItem.isUploaded) {
            const response = await postDelete("admin/sub-mogous/image/delete", {
                mogou_id: deletedItem.mogou_id,
                sub_mogou_id: deletedItem.sub_mogou_id,
                image_id: deletedItem.id
            });

            if (!response.error) {
                const newItems = items.filter((item) => item.id !== id);
                setItems(newItems);
                setUploadedData(newItems);
            }
        }
        else{
            // remove from ui
            const newItems = items.filter((item) => item.id !== id);
            setItems(newItems);
            setUploadedData(newItems);
            
        }

    }, [postDelete]);


    const handleDragStart = useCallback((event: DragStartEvent) => {

        return setActiveItem(items.find((item) => item.id === event.active.id) || null);
    }, [items]);

    const handleDragEnd = useCallback(async (event: DragEndEvent) => {
        const { active, over } = event;

        if (active?.id !== over?.id) {
            const updatedItems = await (async (items: FileWithUniqueId[]) => {

                const oldIndex = items.findIndex((item) => item.id === active?.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                const sourceItem = items.find((item) => item.id === active?.id);
                // target item should be the item before new index
                const targetItem = items.find((item) => item.id === over?.id);

                if (sourceItem?.isUploaded && targetItem?.isUploaded) {
                    await postDrag("admin/sub-mogous/image/reorder", {
                        mogou_id: sourceItem?.mogou_id,
                        sub_mogou_id: sourceItem?.sub_mogou_id,
                        source_image_id: sourceItem?.id,
                        target_image_id: targetItem?.id
                    });
                }

                const moved = arrayMove(items, oldIndex, newIndex);

                return moved;
            })(items);

            setItems(updatedItems);
            setUploadedData(updatedItems);
        }

        setActiveItem(null);
    }, [postDrag, setUploadedData]);

    const handleDragCancel = useCallback(() => {
        setActiveItem(null);
    }, []);

    useEffect(() => {
        setItems(uploadedData);
    }
        , [uploadedData]);

    return (
        <DndContext

            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={
                [restrictToFirstScrollableAncestor]
            }
            onDragCancel={handleDragCancel}
        >
            <SortableContext
                disabled={isLoading || isDeleting}
                items={uploadedData.map(item => ({ id: item.name }))}
                strategy={rectSortingStrategy}>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 px-6 py-4'>
                    {items.map((item, index) => (
                        <SortableItem
                            handleDelete={handleDelete}
                            index={index + 1}
                            key={item.id} id={item.id as never} file={item} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay
                adjustScale
            >
                {
                    activeItem ? <Item
                        id={activeItem.id as never}
                        file={activeItem} isDragging /> : null

                }
            </DragOverlay>

        </DndContext>
    )
}

export default ChapterContentViewGrid