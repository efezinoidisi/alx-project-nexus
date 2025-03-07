import { cn } from '@/utils';
import { CheckboxProps } from '../../interfaces';

const Checkbox: React.FC<CheckboxProps> = ({
  type = 'checkbox',
  label,
  className,
  labelStyles,
  ...otherProps
}) => {
  return (
    <label className={cn('flex items-center gap-1', className)}>
      <input type={type} {...otherProps} />
      <span className={labelStyles}>{label}</span>
    </label>
  );
};

export default Checkbox;
