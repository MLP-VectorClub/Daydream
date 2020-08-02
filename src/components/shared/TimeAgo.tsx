import { useEffect, useState } from 'react';
import { timer } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';

const TimeAgo: React.FC<{ date: Date }> = ({ date }) => {
  const [text, setText] = useState('');

  useEffect(() => {
    const sub = timer(0, 10e3).pipe(
      map(() => formatDistanceToNow(date, { includeSeconds: true, addSuffix: true })),
      distinctUntilChanged(),
      tap(value => setText(value)),
    ).subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [date]);

  return <time dateTime={date.toISOString()}>{text}</time>;
};

export default TimeAgo;
