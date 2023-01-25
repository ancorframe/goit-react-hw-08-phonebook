import { toast } from 'react-toastify';

export const notifySuccess = e =>
  toast.success(e, {
    theme: 'dark',
  });

export const notifyError = e =>
  toast.error(e, {
    theme: 'dark',
  });

export const notifyWarning = e =>
  toast.warning(e, {
    theme: 'dark',
  });
