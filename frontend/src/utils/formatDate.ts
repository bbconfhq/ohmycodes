import { format } from 'date-fns';

export const formatDate = (date: string) => format(new Date(date), 'yyyy-MM-dd HH:mm:ss');
