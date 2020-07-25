import dateFnsFormat from 'date-fns/format';
import dateFnsIsValid from 'date-fns/isValid';
import locale from 'date-fns/locale/pt-BR';
import dateFnsParse from 'date-fns/parse';

export function dateParse(value: any, format: string = null): Date {
  if (!value) return value;
  if (typeof value !== 'string') return value;

  value = value.replace(/\+.+/gi, '').replace(/\..+$/gi, '');
  const date = !format ? new Date(value) : dateFnsParse(value, format, new Date(), { locale });
  if (!dateFnsIsValid(date)) return value;

  return date;
}

export function dateFormat(date: Date, format: string = 'dd/MM/yyyy'): string {
  if (!(date instanceof Date)) {
    date = dateParse(date);
  }

  return dateFnsFormat(date, format, { locale });
}

export function removeTime(date: Date): Date {
  return dateParse(dateFormat(date, 'yyyy-MM-dd'), 'yyyy-MM-dd');
}
