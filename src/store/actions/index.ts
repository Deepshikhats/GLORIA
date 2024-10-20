import { IStore } from '../store';

const appStore = (
  set: (
    partial: Partial<IStore> | ((state: IStore) => Partial<IStore>),
    replace?: boolean
  ) => void
) => ({
  bulkRegisterData: {
    download_link: '',
    successful_registrations: 0,
    failed_registrations: 0,
  },
  userDetails: {
    email: '',
    first_name: '',
    id: '',
    is_admin: false,
    is_employee: false,
    last_name: '',
    phone_number: '',
    username: '',
  },
  selectedRowIds: [],
  courseDetails: {
    college_name: '',
    course_name: '',
    college_location: '',
    course_description: '',
    brochure: null,
  },
  setCourseDetails: (data: IAddCollege) => {
    set(() => ({ courseDetails: data }));
  },
  setSelectedRowIds: (ids: string[]) => {
    set(() => ({ selectedRowIds: ids }));
  },
  setBulkRegisterData: (data: IBulkRegister_R) =>
    set(() => ({ bulkRegisterData: data })),
  setUserDetails: (data: IUserDetails) => set(() => ({ userDetails: data })),
});

export default appStore;
