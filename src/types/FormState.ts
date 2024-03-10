type FormState = {
  state: 'idle' | 'submitting' | 'success' | 'error';
  error: string | null;
};

export default FormState;
