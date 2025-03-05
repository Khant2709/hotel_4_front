export const handleFieldChange = (e, fields, setFields) => {
  const {name, value, type, checked} = e.target;

  const currentName = type === 'checkbox' ? 'checkbox' : name;
  const currentValue = type === 'checkbox' ? checked : value;

  if (!currentName) {
    console.error('Поле name не передано');
    return;
  }

  // Проверяем, существует ли поле с указанным именем
  const fieldExists = fields.some((field) => field.name === currentName);
  if (!fieldExists) {
    console.error(`Field with name "${currentName}" does not exist`);
    return;
  }

  // Обновляем состояние поля
  updateFieldState(currentName, currentValue, fields, setFields, (field, value) => {
    const {message} = field.validation(value);
    return {...field, value, isEdit: true, errorText: message};
  });
};

const updateFieldState = (name, newValue, fields, setFields, updateLogic) => {
  const updatedFields = fields.map((field) =>
      field.name === name ? updateLogic(field, newValue) : field
  );
  setFields(updatedFields);
};