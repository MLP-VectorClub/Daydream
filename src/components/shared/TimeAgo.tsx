import React, { TimeHTMLAttributes, useEffect, useState } from 'react';
import { timer } from 'rxjs';
import { formatDistanceToNow } from 'date-fns';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { UncontrolledTooltip } from 'reactstrap';
import { formatLongDate } from 'src/utils';
import { UncontrolledTooltipProps } from 'reactstrap/lib/Tooltip';
import TooltipContent from 'src/components/shared/TooltipContent';

interface PropTypes extends Omit<TimeHTMLAttributes<unknown>, 'datetime'> {
  date: Date;
  tooltip?: boolean;
  tooltipPlacement?: UncontrolledTooltipProps['placement'];
}

const TimeAgo: React.VFC<PropTypes> = ({ date, tooltip = true, tooltipPlacement = 'top', ...rest }) => {
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

  const timeTag = <time dateTime={date.toISOString()} {...rest}>{text}</time>;

  if (rest.id && tooltip) {
    return (
      <>
        {timeTag}
        <UncontrolledTooltip target={rest.id} placement={tooltipPlacement} fade={false}>
          {({ scheduleUpdate }) => (
            <TooltipContent scheduleUpdate={scheduleUpdate}>
              {formatLongDate(date)}
            </TooltipContent>
          )}
        </UncontrolledTooltip>
      </>
    );
  }

  return timeTag;
};

export default TimeAgo;
