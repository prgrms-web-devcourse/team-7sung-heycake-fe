import { FormControl, FormLabel, Select } from '@chakra-ui/react';

type CakeSelectProps<T> = {
  id: string;
  label: string;
  value: string;
  options: T[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  convertOption: (option: T) => string;
};

function CakeSelect<T>({
  id,
  label,
  value,
  options,
  onChange,
  convertOption,
}: CakeSelectProps<T>) {
  return (
    <FormControl id={id}>
      <FormLabel>{label}</FormLabel>
      <Select name={id} value={value} onChange={onChange}>
        {options.map((option) => (
          <option key={option as string} value={option as string}>
            {convertOption(option)}
          </option>
        ))}
      </Select>
    </FormControl>
  );
}

export default CakeSelect;
