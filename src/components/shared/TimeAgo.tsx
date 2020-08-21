import React, { useEffect, useState } from 'react';
import { timer } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { useDateLocale } from '../../hooks/date-locale';

const TimeAgo: React.FC<{ date: Date }> = ({ date }) => {
  const locale = useDateLocale();
  const [text, setText] = useState('');

  useEffect(() => {
    const sub = timer(0, 10e3).pipe(
      map(() => formatDistanceToNow(date, { includeSeconds: true, addSuffix: true, locale })),
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
