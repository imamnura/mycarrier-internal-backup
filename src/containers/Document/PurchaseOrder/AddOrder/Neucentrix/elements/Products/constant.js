export const STEPS = ['Service Name', 'Pricing'];

export const DEFAULT_VALUES = {
  serviceName: 'CNDC Neucentrix',
  agentOrPrinciple: '',
  location: '',
  otc: 0,
  mrc: 0,
  step: 1,
  services: {},
};

export const SERVICE_NAME_OPTIONS = [
  {
    label: 'CNDC Neucentrix',
    value: 'CNDC Neucentrix',
  },
];

export const AGENT_OR_PRINCIPLE_OPTIONS = [
  {
    label: 'Agent',
    value: 'Agent',
  },
  {
    label: 'Principle',
    value: 'Principle',
  },
];

export const LOCATION_OPTIONS = [
  {
    label: 'Jakarta',
    value: 'Jakarta',
  },
  {
    label: 'Bandung',
    value: 'Bandung',
  },
  {
    label: 'Pekanbaru',
    value: 'Pekanbaru',
  },
  {
    label: 'Semarang',
    value: 'Semarang',
  },
];

export const RACK_TYPE_OPTIONS = [
  {
    label: 'None',
    value: 'None',
  },
  {
    label: 'Full Rack',
    value: 'Full Rack',
  },
  {
    label: 'Sub Rack',
    value: 'Sub Rack',
  },
  {
    label: '1U',
    value: '1U',
  },
  {
    label: 'Private Suit',
    value: 'Private Suit',
  },
];

export const POWER_OPTIONS = [
  {
    label: 'Single Source',
    value: 'ithall-single-ampere',
  },
  {
    label: 'Dual Source',
    value: 'ithall-dual-ampere',
  },
];

export const AMPERE_OPTIONS = [
  {
    label: 'None',
    value: 'None',
  },
  {
    label: '2A',
    value: '2A',
  },
  {
    label: '4A',
    value: '4A',
  },
  {
    label: '6A',
    value: '6A',
  },
  {
    label: '10A',
    value: '10A',
  },
  {
    label: '12A',
    value: '12A',
  },
  {
    label: '16A',
    value: '16A',
  },
  {
    label: '20A',
    value: '20A',
  },
  {
    label: '22A',
    value: '22A',
  },
  {
    label: '25A',
    value: '25A',
  },
  {
    label: '28A',
    value: '28A',
  },
  {
    label: '30A',
    value: '30A',
  },
  {
    label: '32A',
    value: '32A',
  },
  {
    label: '40A',
    value: '40A',
  },
  {
    label: '50A',
    value: '50A',
  },
  {
    label: '54A',
    value: '54A',
  },
  {
    label: '63A',
    value: '63A',
  },
  {
    label: '75A',
    value: '75A',
  },
  {
    label: '80A',
    value: '80A',
  },
  {
    label: '90A',
    value: '90A',
  },
];

export const RACK_AND_FIBER_OPTIONS = [
  {
    label: '0',
    value: '0',
  },
  {
    label: '1',
    value: '1',
  },
  {
    label: '2',
    value: '2',
  },
  {
    label: '3',
    value: '3',
  },
];

export const NCIX_PORT_OPTIONS = [
  {
    label: 'Member Class A - Port 10 Gbps',
    value: 'Member Class A - Port 10 Gbps',
  },
  {
    label: 'Member Class B - Port 1 Gbps',
    value: 'Member Class B - Port 1 Gbps',
  },
  {
    label: 'Member Class C - Port 100 Mbps',
    value: 'Member Class C - Port 100 Mbps',
  },
];

export const MLP_BLP_OPTIONS = [
  {
    label: 'MLP',
    value: 'MLP',
  },
  {
    label: 'BLP',
    value: 'BLP',
  },
];

export const SERVICE_ITEM_IT_HALL = 'itHall';
export const SERVICE_ITEM_NER = 'NER';
export const SERVICE_ITEM_NCIX = 'NCIX';

export const SERVICE_FORM_INDEX = {
  [SERVICE_ITEM_IT_HALL]: 0,
  [SERVICE_ITEM_NER]: 1,
  [SERVICE_ITEM_NCIX]: 2,
};

export const SERVICE_NAME_FORM_LABEL = {
  [SERVICE_ITEM_IT_HALL]: 'Rent Rack IT Hall',
  [SERVICE_ITEM_NER]: 'Rent Rack NER',
  [SERVICE_ITEM_NCIX]: 'NCIX Membership',
};

export const DUMMY_SERVICES = {
  itHall: {
    itHallRackType: 'Full Rack',
    itHallPower: 'ithall-single-ampere',
    itHallAmpere: '10A',
    itHallRackTotal: '10',
    itHallRackUtp: '1',
    itHallFiber: '1',
  },
  NER: {
    nerRackUtp: '1',
  },
  NCIX: {},
};
