export const formatCreditCardNumber = (n: string, masked = false) => {
  const digits = n.replace(/\s+/g, '');
  if (digits.length === 0) return '---- ---- ---- ----';

  if (masked) {
    const last4 = digits.slice(-4).padStart(4, '*');
    const groups = ['••••', '••••', '••••', last4];
    return groups.join(' ');
  }

  const groups: string[] = [];
  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }
  while (groups.length < 4) groups.push('----');
  return groups.slice(0, 4).join('  ');
};
