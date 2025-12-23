import { getDashboardWorklog, noDataStageInformation } from '../utils';

describe('src/containers/LeadManagementSystem/Dashboard/Detail/utils', () => {
  test('getDashboardWorklog', () => {
    expect(
      getDashboardWorklog([{ status: 'Waiting' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Need_Validation' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Valid' }], 'amMapping', false),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Valid' }], 'other', false),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Valid' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Valid' }], 'other', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Qualify' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'qualified' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'dispatchLead' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Delayed_Convert' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog(
        [{ status: 'Create_Opportunity' }],
        'amMapping',
        true,
      ),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'opportunity' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Auto_Quote' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'auto_quote' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Quote' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Delayed_Quote' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'agreement' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'order' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Retire' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'retired' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Drop_Quote' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'drop_quote' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'Invalid' }], 'amMapping', true),
    ).toBeTruthy();
    expect(
      getDashboardWorklog([{ status: 'test error' }], 'amMapping', true),
    ).toBeTruthy();
  });

  test('noDataStageInformation', () => {
    expect(noDataStageInformation('Qualify', 'Qualify')).toBeNull();
    expect(noDataStageInformation('Opportunity', 'Opportunity')).toBeNull();
    expect(noDataStageInformation('Quote', 'Quote', true)).toBeNull();
    expect(noDataStageInformation('Agreement', 'Agreement')).toBeNull();
    expect(noDataStageInformation('Order', 'Order')).toBeNull();
    expect(noDataStageInformation('Provisioning', 'Provisioning')).toBeNull();
    expect(noDataStageInformation('Quote', 'Provisioning')).toBeTruthy();
    expect(noDataStageInformation('Invalid', 'Provisioning')).toBeTruthy();
  });
});
