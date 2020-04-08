function truncateText(text, length) {
  if (text.length < length) return text;
  return text.slice(0, text.lastIndexOf(" ", length)) + "...";
}

export default truncateText;
