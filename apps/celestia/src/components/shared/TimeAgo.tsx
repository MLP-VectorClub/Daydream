import { FC, TimeHTMLAttributes, useEffect, useMemo, useState } from 'react';
import { timer } from 'rxjs';
import { formatDistanceToNow, isValid } from 'date-fns';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { UncontrolledTooltip } from 'reactstrap';
import { formatLongDate } from 'src/utils';
import { UncontrolledTooltipProps } from 'reactstrap/lib/Tooltip';
import TooltipContent from 'src/components/shared/TooltipContent';

interface PropTypes extends Omit<TimeHTMLAttributes<unknown>, 'datetime'> {
  date: Date | string;
  tooltip?: boolean;
  tooltipPlacement?: UncontrolledTooltipProps['placement'];
}

const TimeAgo: FC<PropTypes> = ({ date: inputDate, tooltip = true, tooltipPlacement = 'top', ...rest }) => {
  const [text, setText] = useState('');
  const date = useMemo(() => {
    if (inputDate instanceof Date) return inputDate;
    try {
      const value = new Date(inputDate);
      if (!isValid(value)) throw new Error(`Invalid date: ${inputDate}`);
      return value;
    } catch (err) {
      console.error(err);
      return new Date(0);
    }
  }, [inputDate]);

  useEffect(() => {
    const sub = timer(0, 10e3)
      .pipe(
        map(() =>
          formatDistanceToNow(date, {
            includeSeconds: true,
            addSuffix: true,
          })
        ),
        distinctUntilChanged(),
        tap((value) => setText(value))
      )
      .subscribe();

    return () => {
      sub.unsubscribe();
    };
  }, [date]);

  const timeTag = (
    <time dateTime={date.toISOString()} {...rest}>
      {text}
    </time>
  );

  if (rest.id && tooltip) {
    return (
      <>
        {timeTag}
        <UncontrolledTooltip target={rest.id} placement={tooltipPlacement} fade={false}>
          {({ scheduleUpdate }) => <TooltipContent scheduleUpdate={scheduleUpdate}>{formatLongDate(date)}</TooltipContent>}
        </UncontrolledTooltip>
      </>
    );
  }

  return timeTag;
};

export default TimeAgo;
