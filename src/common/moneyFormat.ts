export const moneyFormat = (number: any) =>
    new Intl.NumberFormat('de-DE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(parseFloat(number))
