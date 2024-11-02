export { default } from './filter';
export interface FilterProps {
  accOptions: {
    label: string;
    iterables: TOption[];
  }[];
  selectedItems: TOption[];
  setSelectedItems: (data: TOption) => void;
  reset: () => void;
  handleApplyButton: () => void;
}