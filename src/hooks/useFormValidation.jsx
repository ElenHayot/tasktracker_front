import { useState } from "react";

export function useFormValidation( validationRules ) {
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  console.log('hello');

  const validateField = (fieldName, value) => {
    const rules = validationRules[fieldName];
    if (!rules) return '';

    for (const rule of rules) {
      const error = rule(value);
      if (error) {
        setErrors(prev => ({ ...prev, [fieldName]: error }));
        return error;
      }
    }

    setErrors(prev => ({ ...prev, [fieldName]: ''}));
    return '';
  };

  const validateAllFields = (formData) => {
    console.log('hello validateAllFields');
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    // On met à jour le state errors
    setErrors(newErrors);
    console.log(`newErrors = ${newErrors}`);

    // On marque tous les champs comme touchés
    setTouched(Object.keys(validationRules).reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {}));

    console.log(`validateAllFields, isValid = ${isValid}`);
    return isValid;
  };

  const setFieldTouched = (fieldName) => {
    setTouched(prev => ({ ...prev, [fieldName]: true}));
  };

  const resetValidation = () => {
    setErrors();
    setTouched();
  };

  return {
    errors,
    touched,
    validateField,
    validateAllFields,
    setFieldTouched,
    resetValidation
  };
}