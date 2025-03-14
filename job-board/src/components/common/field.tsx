import { FieldProps } from '@/interfaces';

export default function Field({ label, children, id, error }: FieldProps) {
  return (
    <div className='w-full'>
      {label ? (
        <label
          htmlFor={id}
          className='mb-[0.4375rem] block font-medium text-sm'
        >
          {label}
        </label>
      ) : null}

      {children}

      {error ? <small className='text-danger text-xs'>{error}</small> : null}
    </div>
  );
}
