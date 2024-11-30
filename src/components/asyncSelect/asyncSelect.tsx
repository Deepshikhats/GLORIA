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

const AsyncSelect: React.FC<AsyncSelectProps> = ({ label, ...props }) => {
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
            '!border-0 !rounded-lg !shadow-none !bg-default-100 text-small !rounded-xl',
          placeholder: () => '!text-base',
        }}
      />
    </div>
  );
};

export default AsyncSelect;
