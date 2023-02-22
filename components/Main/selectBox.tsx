import { Select } from '@chakra-ui/react';

export default function SelectBox() {
  return (
    <Select
      color="hey.main"
      textColor="black"
      borderColor="hey.main"
      focusBorderColor="hey.main"
      borderWidth={2}
      placeholder="정렬 기준"
      mr={6}
      w={32}
      onChange={(e) => {
        alert(e.target.value);
      }}
    >
      <option value="Option 1">Option 1</option>
      <option value="Option 2">Option 2</option>
      <option value="Option 3">Option 3</option>
    </Select>
  );
}
