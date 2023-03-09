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
      <Select
        icon={
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.625 6.75L9 12.375L3.375 6.75"
              stroke="#292929"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        }
        borderRadius="1rem"
        height="3rem"
        name={id}
        value={value}
        onChange={onChange}
      >
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
