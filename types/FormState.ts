type FormState = {
  state: 'idle' | 'submitting' | 'success' | 'error';
  error: string | null;
};

export const initialFormState: FormState = {
  state: 'idle',
  error: null,
};

export default FormState;
