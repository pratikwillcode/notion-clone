function stringToColor(str: string): string {
    let hash = 0;
  
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    // Generate RGB values and ensure they are in the light range (128–255)
    const r = 128 + (hash >> 0) & 0x7F;
    const g = 128 + (hash >> 8) & 0x7F;
    const b = 128 + (hash >> 16) & 0x7F;
  
    return `#${r.toString(16).padStart(2, '0')}${g
      .toString(16)
      .padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }
  
  export default stringToColor;
  