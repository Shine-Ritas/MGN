import { FC, memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Item, { ItemProps } from "./GridItem";

const SortableItem: FC<ItemProps> = memo((props) => {
    const {
        isDragging,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: props.id });

    // Calculate styles only when transform or transition changes
    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition: transition || undefined,

    };

    return (
        <Item
            ref={setNodeRef}
            style={style}
            withOpacity={isDragging}
            isDragging={isDragging}
            index={props.index}
            {...props}
          
        />
    );
});

// Add displayName for easier debugging
SortableItem.displayName = "SortableItem";

export default SortableItem;
