export interface FormField {
  id: string;
  type: string;
  label: string;
  name: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  order: number;
  answer?: string;
}

export interface FormData {
  title: string;
  description: string;
  action: string;
  method: string;
  fields: FormField[];
}
