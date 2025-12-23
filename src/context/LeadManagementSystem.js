import { createContext } from 'react';

const LeadManagementSystemContext = createContext({
  data: null,
  setData: () => {},
  fetchDetail: () => {},
  prerequisite: {
    data: [],
    isHaveError: false,
  },
});

export default LeadManagementSystemContext;
