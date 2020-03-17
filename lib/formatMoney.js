function formatMoney(cents) {
  if (cents < 100) return `$0.${cents.toString().padStart(2, "0")}`
  if (cents % 100 === 0) return `$${cents / 100}.00`;
  return `$${cents / 100}`;
}

export default formatMoney