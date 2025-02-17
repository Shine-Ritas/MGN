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



const ChapterContentViewGrid = ({uploadedData = [],setUploadedData}:{uploadedData: FileWithUniqueId[],setUploadedData:any}) => {
    const [items, setItems] = useState<FileWithUniqueId[]>(uploadedData);
    const [activeItem, setActiveItem] = useState<FileWithUniqueId|null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const [postDrag, { isLoading }] = useMutate({ callback: undefined, navigateBack: false });

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

                if(sourceItem?.isUploaded && targetItem?.isUploaded){
                    await postDrag("admin/sub-mogous/image/reorder",{
                        mogou_id : sourceItem?.mogou_id,
                        sub_mogou_id : sourceItem?.sub_mogou_id,
                        source_image_id : sourceItem?.id,
                        target_image_id : targetItem?.id
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
            disabled={isLoading}
            items={uploadedData.map(item => ({ id: item.name }))} 
            strategy={rectSortingStrategy}>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 px-6 py-4'>
                    {items.map((item,index)=> (
                        <SortableItem 
                        index={index+1}
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