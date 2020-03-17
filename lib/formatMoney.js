function formatMoney(cents) {
  return `$${Math.floor(cents / 100)}.${(cents % 100).toString().padStart(2, "0")}`
}

export default formatMoney;
