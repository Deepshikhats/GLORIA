import Table from '@/components/table';
import PATH from '@/routes/paths';
import { DeleteEmployee, ListEmployees } from '@/services/employeeService';
import { colorMapping, employeeColums, swrKeys } from '@/utils/constants';
import { debounce, notify } from '@/utils/helpers/helpers';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import Modals from '../../modals';
const Employees = () => {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<IEmployee>();
  const [isDLoading, setIsDLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');

  const { data, isLoading, mutate } = useSWR(
    `${swrKeys.EMPLOYEES}-${page}`,
    () =>
      ListEmployees({
        limit: 10,
        page,
        type: 'Employees',
        search: searchValue,
      }),
    {
      keepPreviousData: true,
      revalidateIfStale: false,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  );
  useEffect(() => {
    const debouncedMutate = debounce(() => mutate());
    debouncedMutate();
    return () => {
      debouncedMutate.cancel();
    };
  }, [searchValue]);

  const handleEmployeeDelete = () => {
    setIsDLoading(true);
    //@ts-ignore
    DeleteEmployee(selectedRow?.id)
      .then((value) => {
        notify(value.message, { type: 'success' });
        setShowDeleteModal(false);
        mutate();
      })
      .finally(() => setIsDLoading(false));
  };

  /********************************CUSTOM METHODS************************************** */

  const handleRowActions = (action: string, rowData: IEmployee) => {
    const { id, username, ...rest } = rowData;
    setSelectedRow(rowData);
    if (action === 'edit') {
      localStorage.setItem('emp', JSON.stringify(rest));
      navigate(`edit-employee/${id}`);
    } else if (action === 'delete') {
      setShowDeleteModal(true);
    }
  };

  // Filter out agents from the data before passing it to the Table component
  const filteredRows = data?.results?.filter(
    (employee: IEmployee) => !employee.is_agent
  );

  return (
    <section className="h-full overflow-hidden p-2 slideIn">
      {/* @ts-ignore */}
      <Table
        btnLabel="Add Employee"
        rows={filteredRows}
        colums={employeeColums}
        currentPage={page}
        showingLimit={10}
        isLoading={isLoading}
        totalCount={data?.count}
        setCurrentPage={setPage}
        onBtnClick={() => navigate(PATH.addEmployees)}
        colorMapping={colorMapping}
        showFilter={false}
        isSearchable={true}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        checkboxSelection={true}
        showEyeBtn={false}
        showDownloadBtn={false}
        handleRowAction={handleRowActions}
      />
      <Modals.ConfirmationModal
        isOpen={showDeleteModal}
        setOpen={setShowDeleteModal}
        isSubmitting={isDLoading}
        content="Are sure to delete employee"
        title="Delete Employee"
        onSubmit={handleEmployeeDelete}
      />
    </section>
  );
};

export default Employees;
