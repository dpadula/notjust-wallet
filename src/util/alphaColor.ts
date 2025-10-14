/**
 * Aplica un factor alpha a un color.
 * @param {string} color - El color original (ej: '#FF0000', 'rgb(255, 0, 0)').
 * @param {number} alpha - El factor de opacidad (0.0 a 1.0).
 * @returns {string} El nuevo color en formato 'rgba()'.
 */
export const applyAlphaToColor = (color: string, alpha: number) => {
  // 1. Manejar colores Hexadecimales
  if (color.startsWith('#')) {
    const hex = color.replace('#', '');

    // Convertir de hex a RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    // Devolver en formato RGBA con el nuevo alpha
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  // 2. Manejar colores 'rgb()' (simple, asumiendo formato 'rgb(r, g, b)')
  if (color.startsWith('rgb(')) {
    // Extraer los componentes RGB
    const components = color.match(/\d+/g);
    if (components && components.length === 3) {
      const [r, g, b] = components;
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  }

  // Si el color ya es rgba, lo ideal es parsear y modificar,
  // pero para simplicidad, aquí solo devolvemos una mezcla.
  console.warn(
    'Color format not easily handled. Returning color without modification.'
  );
  return color;
};
