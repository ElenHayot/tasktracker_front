// ===================== VALIDATION EMAIL ===================== //

// Regex simple mais efficace pour la plupart des cas
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Version plus strict pour être ultra précis
export const validateEmailStrict = (email) => {
  const strictEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  return strictEmailRegex.test(email);
};

//===================== FORMATAGE EMAIL ===================== //
export const formatEmail = (email) => {
  // Enlève les espaces et met en minuscules
  return email.trim().toLowerCase();
};

//================ VALIDATE TELEPHONE ================== //

export const validatePhone = (phone) => {
  // Enlève les espaces, points et tirets pour la validation
  const cleanPhone = phone.replace(/[\s.-]/g, '');

  // Accepte les formats français : 0123456789 ou +33123456789
  const phoneRegex = /^(?:(?:\+33|0)[1-9](?:[0-9]{8}))$/;
  return phoneRegex.test(cleanPhone);
};

// ================ FORMATAGE TELEPHONE ================ //

export const formatPhone = (value) => {
  if (!value) return;

  // Garde seulement les chiffres et le +
  const cleaned = value.replace(/[^\d+]/g, '');

  // Format international +33
  if (cleaned.startsWith('+33')) {
    const number = cleaned.slice(3);
    if (number.length <= 9) {
      return '+33' + number.replace(/(\d{1})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5').trim();
    }
    return cleaned;
  }

  // Format national français 0X XX XX XX XX
  if (cleaned.startsWith('0') && cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5').trim();
  }

  return cleaned;
};

// ==================== VALIDATION PASSWORD ==================== //

export const validatePassword = (value) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(value)) {
    return `Password doit contenir au minimum 8 caractères, dont une minuscule, une majuscule et un chiffre`;
  }
  return '';
} 

// ==================== VALIDATION GENERIQUE ==================== //

export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.trim == '') {
    return `${fieldName} is required`;
  }
  return '';
}

export const validateMinLength =  (value, minLength, fieldName = 'Ce champ') => {
  if (value.length < minLength) {
    return `${fieldName} doit contenir au moins ${minLength} caractères`;
  }
  return '';
}