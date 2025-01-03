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
import SortableItem from './sortable-grid-item';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import Item from './grid-item';
import { FileWithUniqueId } from './chapter-content';

const ChapterContentViewGrid = ({uploadedData = []}:{uploadedData: FileWithUniqueId[]}) => {
    const [items, setItems] = useState<FileWithUniqueId[]>(uploadedData);
    const [activeItem, setActiveItem] = useState<FileWithUniqueId|null>(null);
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDragStart = useCallback((event: DragStartEvent) => {
        return setActiveItem(items.find((item) => item.id === event.active.id) || null);
    }, [items]);

    const handleDragEnd = useCallback((event: DragEndEvent) => {
        const { active, over } = event;

        if (active?.id !== over?.id) {
            setItems((items) => {

                const oldIndex = items.findIndex((item) => item.id === active?.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                return arrayMove(items, oldIndex, newIndex);
            });
        }

        setActiveItem(null);
    }, []);

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
            onDragCancel={handleDragCancel}
        >
            <SortableContext items={uploadedData.map(item => ({ id: item.name }))} 
            strategy={rectSortingStrategy}>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 px-6 py-4'>
                    {items.map((item,index)=> (
                        <SortableItem 
                        index={index+1}
                        key={item.id} id={item.id as never} file={item} />
                    ))}
                </div>
            </SortableContext>
            <DragOverlay adjustScale style={{ transformOrigin: '0 0 ' }}>
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