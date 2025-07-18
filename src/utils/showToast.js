import {toast} from 'react-toastify';

// Типы уведомлений
const TOAST_TYPES = {
    success: toast.success,
    error: toast.error,
    info: toast.info,
    warn: toast.warn,
};

// Конфигурация toast по умолчанию
const DEFAULT_TOAST_OPTIONS = {
    position: 'top-right',
    autoClose: 4000, // Уведомление закроется через 5 секунд
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
};


export const notifyShowToast = (type, message, options = {}) => {
    const toastFunction = TOAST_TYPES[type];

    if (!toastFunction) {
        console.error(`Unknown toast type: ${type}. Available types: ${Object.keys(TOAST_TYPES).join(', ')}`);
        return;
    }

    const toastOptions = {...DEFAULT_TOAST_OPTIONS, ...options};

    toastFunction(message, toastOptions);
};