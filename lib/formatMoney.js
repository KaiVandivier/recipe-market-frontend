function formatMoney(cents) {
  // Math.ceil(cents) handles fractional cents in the case of fractional quantities
  return `$${Math.floor(Math.ceil(cents) / 100)}.${(Math.ceil(cents) % 100).toString().padStart(2, "0")}`
}

export default formatMoney;
