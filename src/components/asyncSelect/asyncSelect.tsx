import { ReactElement } from 'react';
import { GroupBase } from 'react-select';
import type {
  ComponentProps,
  UseAsyncPaginateParams,
} from 'react-select-async-paginate';
import {
  AsyncPaginateProps,
  withAsyncPaginate,
} from 'react-select-async-paginate';
import type { CreatableProps } from 'react-select/creatable';
import Creatable from 'react-select/creatable';

interface AsyncSelectProps
  extends AsyncPaginateProps<
    OptionType,
    GroupBase<OptionType>,
    unknown,
    false
  > {
  label: string;
  showError?: boolean;
  isInvalid?: boolean;
  errorText?: string;
}

type AsyncPaginateCreatableProps<
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean,
> = CreatableProps<OptionType, IsMulti, Group> &
  UseAsyncPaginateParams<OptionType, Group, Additional> &
  ComponentProps<OptionType, Group, IsMulti>;

type AsyncPaginateCreatableType = <
  OptionType,
  Group extends GroupBase<OptionType>,
  Additional,
  IsMulti extends boolean,
>(
  props: AsyncPaginateCreatableProps<OptionType, Group, Additional, IsMulti>
) => ReactElement;

const AsyncSelect: React.FC<AsyncSelectProps> = ({
  label,
  showError,
  isInvalid,
  errorText,
  ...props
}) => {
  const CreatableAsyncPaginate = withAsyncPaginate(
    Creatable
  ) as AsyncPaginateCreatableType;
  return (
    <div>
      <label htmlFor={props.id} className="capitalize mb-[5px] block text-sm">
        {label}
      </label>

      <CreatableAsyncPaginate
        {...props}
        classNames={{
          menu: () => '!z-50 !text-small',
          control: () =>
            `!border-0 !rounded-lg !shadow-none  ${isInvalid ? '!bg-red-100' : '!bg-default-100'} text-small !rounded-xl ${props.isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} `,
          placeholder: () => '!text-base',
        }}
      />
      {showError && (
        <div className="text-xs text-danger h-4 px-2">
          {isInvalid ? errorText : ''}
        </div>
      )}
    </div>
  );
};

export default AsyncSelect;
