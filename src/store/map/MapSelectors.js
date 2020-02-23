
/**
 * Gets the field value, or undefined (or supplied default) if not yet set.
 */
export const selectFieldValue = ({ form }, formId, fieldId, defaultValue) => {
    let value;
    if (form.formsById[formId] &&
        form.formsById[formId].fieldsById[fieldId]) {
        value = form.formsById[formId].fieldsById[fieldId].value;
    }
    return (typeof value !== 'undefined') ? value : defaultValue;
};
