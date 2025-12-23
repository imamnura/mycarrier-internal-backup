import { createSlice } from '@reduxjs/toolkit';

import {
  POWER_OPTIONS,
  RACK_AND_FIBER_OPTIONS,
  SERVICE_ITEM_IT_HALL,
  SERVICE_ITEM_NCIX,
  SERVICE_ITEM_NER,
} from '../elements/Products/constant';

const productSlice = createSlice({
  name: 'product',
  initialState: {
    formServices: [
      {
        item: SERVICE_ITEM_IT_HALL,
        forms: [
          {
            type: 'select',
            label: 'IT Hall Rack Type',
            name: 'itHallRackType',
            placeholder: 'Choose IT Hall Rack Type',
            required: true,
            staticWidth: '100%',
          },
          {
            type: 'select',
            label: 'IT Hall Power',
            name: 'itHallPower',
            placeholder: 'Choose IT Hall Power',
            options: POWER_OPTIONS,
            required: true,
            staticWidth: '100%',
          },
          {
            type: 'select',
            label: 'IT Hall Ampere (Amp)',
            name: 'itHallAmpere',
            placeholder: 'Choose IT Hall Ampere',
            required: true,
            staticWidth: '100%',
          },
          {
            type: 'number',
            label: 'IT Hall Rack Total',
            name: 'itHallRackTotal',
            required: true,
            defaultValue: 1,
          },
          {
            type: 'select',
            label: 'IT Hall Rack Utp',
            name: 'itHallRackUtp',
            placeholder: 'Choose IT Hall Rack UTP',
            options: RACK_AND_FIBER_OPTIONS,
            required: true,
            staticWidth: '100%',
            defaultValue: '0',
          },
          {
            type: 'select',
            label: 'IT Hall Add Fiber',
            name: 'itHallFiber',
            placeholder: 'Choose IT Hall Fiber',
            options: RACK_AND_FIBER_OPTIONS,
            required: true,
            staticWidth: '100%',
            defaultValue: '0',
          },
        ],
      },
    ],
    locations: [],
    agents: [],
    membersNcix: [],
    itHallRackTypes: [],
    itHallAmperes: [],
    nerRackTypes: [],
    nerAmperes: [],
    loadingLocation: false,
    loadingAgents: false,
    loadingMembersNcix: false,
    loadingItHallRackTypes: false,
    loadingItHallAmperes: false,
    loadingNerRackTypes: false,
    loadingNerAmperes: false,
    initialValues: null,
  },
  reducers: {
    setInitialValues(state, action) {
      state.initialValues = { ...action.payload };
    },
    progressLocation(state, action) {
      state.loadingLocation = action.payload;
    },

    progressAgents(state, action) {
      state.loadingAgents = action.payload;
    },

    // progressMembersNcix(state, action) {
    //   state.loadingMembersNcix = action.payload;
    // },

    progressItHallRackTypes(state, action) {
      state.loadingItHallRackTypes = action.payload;
      state.formServices[0].forms[0].isLoading = true;
    },
    progressItHallAmperes(state, action) {
      state.loadingItHallAmperes = action.payload;
      state.formServices[0].forms[2].options = [];
      state.formServices[0].forms[2].isLoading = true;
    },
    progressNerRackTypes(state, action) {
      state.loadingNerRackTypes = action.payload;
      const index = [...state.formServices].findIndex(
        (item) => item.item === SERVICE_ITEM_NER,
      );

      if (index >= 0) {
        state.formServices[index].forms[0].options = [];
        state.formServices[index].forms[0].isLoading = true;
      }
    },
    progressNerAmperes(state, action) {
      state.loadingNerAmperes = action.payload;
      const index = [...state.formServices].findIndex(
        (item) => item.item === SERVICE_ITEM_NER,
      );

      if (index >= 0) {
        state.formServices[index].forms[1].options = [];
        state.formServices[index].forms[1].isLoading = true;
      }
    },
    progressMembersNcix(state) {
      const index = [...state.formServices].findIndex(
        (item) => item.item === SERVICE_ITEM_NCIX,
      );

      if (index >= 0) {
        state.formServices[index].forms[0].options = [];
        state.formServices[index].forms[0].isLoading = true;
      }
    },
    setLocations(state, action) {
      state.loadingLocation = false;
      state.locations = [...action.payload].map((item) => ({
        label: item.value,
        value: item,
      }));
    },
    setAgents(state, action) {
      state.loadingAgents = false;
      state.agents = [...action.payload].map((item) => ({
        label: item.value,
        value: item,
      }));
    },
    setItHallRackTypes(state, action) {
      const itHallRackTypes = [...action.payload].map((item) => ({
        label: item.value,
        value: item.value,
        data: item,
      }));

      state.formServices[0].forms[0].options = itHallRackTypes;
      state.formServices[0].forms[0].isLoading = false;
    },
    setItHallAmperes(state, action) {
      const itHallAmperes = [...action.payload].map((item) => ({
        label: item.value,
        value: item.value,
        data: item,
      }));

      state.formServices[0].forms[2].options = itHallAmperes;
      state.formServices[0].forms[2].isLoading = false;
    },
    setNerRackTypes(state, action) {
      const nerRackTypes = [...action.payload].map((item) => ({
        label: item.value,
        value: item.value,
        data: item,
      }));
      const index = [...state.formServices].findIndex(
        (item) => item.item === SERVICE_ITEM_NER,
      );

      state.formServices[index].forms[0].options = nerRackTypes;
      state.formServices[index].forms[0].isLoading = false;
    },
    setNerAmperes(state, action) {
      const nerAmperes = [...action.payload].map((item) => ({
        label: item.value,
        value: item.value,
        data: item,
      }));

      const index = [...state.formServices].findIndex(
        (item) => item.item === SERVICE_ITEM_NER,
      );

      state.formServices[index].forms[1].options = nerAmperes;
      state.formServices[index].forms[1].isLoading = false;
    },
    setMembersNcix(state, action) {
      const members = [...action.payload].map((item) => ({
        label: item.value,
        value: item.value,
        data: item,
      }));
      const index = [...state.formServices].findIndex(
        (item) => item.item === SERVICE_ITEM_NCIX,
      );

      state.formServices[index].forms[0].options = members;
      state.formServices[index].forms[0].isLoading = false;
    },
    addFormService(state, action) {
      const currentFormService = [...state.formServices];
      const isExist = currentFormService.find(
        (item) => item.item === action.payload.item,
      );
      if (!isExist) {
        currentFormService.push(action.payload);
        state.formServices = currentFormService;
      }
    },
    removeFormService(state, action) {
      const currentFormService = [...state.formServices];
      const filtered = currentFormService.filter(
        (service) =>
          service.item.toLowerCase() !== `${action.payload}`.toLowerCase(),
      );
      state.formServices = filtered;
    },
    updateFormService(state, action) {
      const { index, forms } = action.payload;
      state.formServices[index] = {
        ...state.formServices[index],
        forms,
      };
    },
  },
});

export const {
  addFormService,
  removeFormService,
  setLocations,
  setAgents,
  setMembersNcix,
  setItHallAmperes,
  setItHallRackTypes,
  setNerAmperes,
  setNerRackTypes,
  progressLocation,
  progressAgents,
  progressMembersNcix,
  progressNerRackTypes,
  progressItHallAmperes,
  progressItHallRackTypes,
  progressNerAmperes,
  updateFormService,
  setInitialValues,
} = productSlice.actions;

export default productSlice.reducer;
