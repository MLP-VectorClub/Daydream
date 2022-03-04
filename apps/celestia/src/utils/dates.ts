import { format } from 'date-fns';

export const formatLongDate = (date: Date) => format(date, 'do LLLL y, H:mm:ss');
