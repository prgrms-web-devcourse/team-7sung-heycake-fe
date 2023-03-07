export function numberWithHyphenPhone(phoneNumber: number) {
  return phoneNumber
    .toString()
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{2,3})(\d{3,4})(\d{4})$/, `$1-$2-$3`);
}

export function numberWithHyphenMarket(marketNumber: number) {
  return marketNumber
    .toString()
    .replace(/[^0-9]/g, '')
    .replace(/^(\d{3})(\d{2})(\d{5})$/, `$1-$2-$3`);
}
