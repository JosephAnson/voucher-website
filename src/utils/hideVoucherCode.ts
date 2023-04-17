export function hideVoucherCode(voucher: string) {
  if (voucher.length <= 4) {
    return '*'.repeat(voucher.length)
  }
  else {
    const firstFourChars = voucher.slice(0, 4)
    const restOfChars = voucher.slice(4)
    const asterisks = '*'.repeat(restOfChars.length)
    return firstFourChars + asterisks
  }
}
