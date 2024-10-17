import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { memo, useCallback } from 'react';

type GobackProps = {
    to: string | number;
    label?: string;
    variant?: "outline" | "default" | "destructive" | "secondary" | "ghost" | "link" | null | undefined;
    size?:"default" | "sm" | "lg" | "icon" | null | undefined
};

const GobackRaw = ({ to, label = "back", variant = "outline",size="default" }: GobackProps) => {
    const navigate = useNavigate();

    const renderBtn = useCallback(() => {
        if (label === 'back') {
            return (
                <Button 
                type="button"
                size={size}
                variant={variant} onClick={() => navigate(to as string)}>
                    <ChevronLeft className="h-5 w-5" />
                    <span className='sr-only'>{label}</span>
                </Button>
            );
        } else {
            return (
                <Button type="button"
                size={size}
                variant="outline" onClick={() => navigate(to as string)} >
                    {label}
                </Button>
            );
        }
    },[label, navigate, size, to, variant]);

    return renderBtn(); // Call the renderBtn function here to render the button
};

const Goback = memo(GobackRaw);

export default Goback;
