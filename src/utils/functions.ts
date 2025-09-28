function darkenColor(colorHex: string, factor: number): string {
  // Ensure the factor is between 0 and 1
  const clampedFactor = Math.min(1, Math.max(0, factor));

  // Parse the color components (red, green, blue)
  const r = parseInt(colorHex.slice(1, 3), 16);
  const g = parseInt(colorHex.slice(3, 5), 16);
  const b = parseInt(colorHex.slice(5, 7), 16);

  // Darken each component by the specified factor
  const darkenedR = Math.round(r * (1 - clampedFactor));
  const darkenedG = Math.round(g * (1 - clampedFactor));
  const darkenedB = Math.round(b * (1 - clampedFactor));

  // Convert the components back to hexadecimal and combine them
  const darkenedHex =
    "#" +
    (darkenedR < 16 ? "0" : "") + darkenedR.toString(16) +
    (darkenedG < 16 ? "0" : "") + darkenedG.toString(16) +
    (darkenedB < 16 ? "0" : "") + darkenedB.toString(16);

  return darkenedHex;
}

const shortenText = (originalText:string, maxLength: number)=> {
  const shortenedText = (originalText && originalText.length > maxLength && (originalText.length-maxLength > 3)) ? originalText.substring(0, maxLength) + '...' : originalText;
  return shortenedText;
}

function lightenColor(colorHex: string, factor: number): string {
  // Ensure the factor is between 0 and 1
  const clampedFactor = Math.min(1, Math.max(0, factor));

  // Parse the color components (red, green, blue)
  const r = parseInt(colorHex.slice(1, 3), 16);
  const g = parseInt(colorHex.slice(3, 5), 16);
  const b = parseInt(colorHex.slice(5, 7), 16);

  // Lighten each component by the specified factor
  const lightenedR = Math.round(r + (255 - r) * clampedFactor);
  const lightenedG = Math.round(g + (255 - g) * clampedFactor);
  const lightenedB = Math.round(b + (255 - b) * clampedFactor);

  // Convert the components back to hexadecimal and combine them
  const lightenedHex =
    "#" +
    (lightenedR < 16 ? "0" : "") + lightenedR.toString(16) +
    (lightenedG < 16 ? "0" : "") + lightenedG.toString(16) +
    (lightenedB < 16 ? "0" : "") + lightenedB.toString(16);

  return lightenedHex;
}

function camelCaseToSentenceCase(word: string) {
  return word
    .split(/(?=[A-Z])/)
    .join(' ')
    .replace(/\/\s+/, '/');
}

const loadImg = (src: string): Promise<string> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(src);
    // img.onerror = () => reject(new Error("could not load image"));
    img.onerror = () => {
      // Image failed to load, resolve with "error" string
      resolve("error");
    };
  });


function selectColor(number: number, number2: number) {
  const hue = number * 137.508; // use golden angle approximation
  return `hsl(${hue},50%,75%)`;
}

function padDigit(num: number) {
  if (num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

export { 
    camelCaseToSentenceCase,
    darkenColor,
    lightenColor,
    loadImg,
    padDigit,
    selectColor,
    shortenText,
 };