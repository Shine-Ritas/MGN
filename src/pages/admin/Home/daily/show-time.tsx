import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect, useMemo } from 'react';

// Date formatting utilities
const dateFormatter = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour12: false,
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

// Component-specific types
interface ShowTimeProps {
  upTime: string;
  timeZone: string;
}

export default function ShowTime({ upTime,timeZone}: ShowTimeProps) {
  const [currentTime, setCurrentTime] = useState(() => new Date());
  

  // Memoize formatted values
  const formattedTime = useMemo(() => timeFormatter.format(currentTime), [currentTime]);
  const formattedDate = useMemo(() => dateFormatter.format(currentTime), [currentTime]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid col-span-2 gap-3">
      <Card className="backdrop-blur-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="bg-gradient-to-br pt-3 pb-3 border-b">
            <div className="text-center">
              <p className="text-xs text-slate-500 mb-1 font-mono">SYSTEM TIME</p>
              <time className="text-3xl font-mono  mb-1 block">
                {formattedTime}
              </time>
              <time className="text-sm text-slate-400 block">{formattedDate}</time>
            </div>
          </div>
          
          <div className="p-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-background rounded-md p-3 border">
                <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                <p className="text-sm font-mono">{upTime}</p>
              </div>
              <div className="bg-background rounded-md p-3 border">
                <p className="text-xs text-muted-foreground mb-1">Time Zone</p>
                <p className="text-sm font-mono">{timeZone}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}