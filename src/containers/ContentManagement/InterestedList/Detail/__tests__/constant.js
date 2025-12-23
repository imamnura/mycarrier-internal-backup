import {
  steps,
  stepsNonConnect,
  stepChoice,
  stepChoiceNonConnect,
  emptyMessageTabList,
  tableHeader,
} from '../constant';

describe('src/pages/ContentManagement/InterestedList/Detail/constant', () => {
  test('steps', () => {
    expect(steps('Invalid')).not.toBeNull();
    expect(steps('Retire')).not.toBeNull();
    expect(steps('Drop_Quote')).not.toBeNull();
    expect(steps('Test')).not.toBeNull();
  });
  test('stepsNonConnect', () => {
    expect(stepsNonConnect('Invalid')).not.toBeNull();
    expect(stepsNonConnect('Test')).not.toBeNull();
  });
  test('stepChoice', () => {
    expect(stepChoice('Waiting')).not.toBeNull();
    expect(stepChoice('Valid')).not.toBeNull();
    expect(stepChoice('Qualify')).not.toBeNull();
    expect(stepChoice('Convert')).not.toBeNull();
    expect(stepChoice('Create_Opportunity')).not.toBeNull();
    expect(stepChoice('Auto_Quote')).not.toBeNull();
    expect(stepChoice('Invalid')).not.toBeNull();
    expect(stepChoice('Retire')).not.toBeNull();
    expect(stepChoice('Drop_Quote')).not.toBeNull();
    expect(stepChoice('Test')).not.toBeNull();
  });
  test('stepChoiceNonConnect', () => {
    expect(stepChoiceNonConnect('Waiting')).not.toBeNull();
    expect(stepChoiceNonConnect('Valid')).not.toBeNull();
    expect(stepChoiceNonConnect('Invalid')).not.toBeNull();
    expect(stepChoiceNonConnect('Test')).not.toBeNull();
  });
  test('emptyMessageTabList', () => {
    expect(emptyMessageTabList(0)).not.toBeNull();
    expect(emptyMessageTabList(1)).not.toBeNull();
    expect(emptyMessageTabList(2)).not.toBeNull();
    expect(emptyMessageTabList(3)).not.toBeNull();
    expect(emptyMessageTabList(4)).not.toBeNull();
    expect(emptyMessageTabList(5)).not.toBeNull();
    expect(emptyMessageTabList('Test')).not.toBeNull();
  });
  test('tableHeader', () => {
    expect(tableHeader(0)).not.toBeNull();
    expect(tableHeader(1)).not.toBeNull();
    expect(tableHeader(2)).not.toBeNull();
    expect(tableHeader(3)).not.toBeNull();
    expect(tableHeader(4)).not.toBeNull();
    expect(tableHeader(5)).not.toBeNull();
    expect(tableHeader('Test')).toBeNull();
  });
});
