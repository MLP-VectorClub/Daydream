import {
  useEffect,
  useState,
} from 'react';
import { timer } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import {
  distinctUntilChanged,
  map,
  tap,
} from 'rxjs/operators';

export default (({ date }) => {
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

  return (
    <time dateTime={date.toISOString()}>{text}</time>
  );
}) as React.FC<{ date: Date }>;
