
export const date = (value, time=true, month=false, locale='en-US') =>
  value !== undefined && value !== null ? new Date(value)
    .toLocaleDateString(
      locale,
      {
        year: 'numeric',
        month: 'long',
        ...!month && { day: 'numeric' },
        ...time && {
          hour: '2-digit',
          minute: '2-digit'
        }
      }
    ).replace(/,/g, '')
  : '–'


export const money = (value, currency) => 
  value !== undefined && value !== null ? `${value}${currency ? ` ${currency}` : ''}` : `–`
