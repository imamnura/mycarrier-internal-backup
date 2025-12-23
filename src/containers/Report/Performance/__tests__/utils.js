import {
  tabText,
  maskStatusTitle,
  normalizeDocumentPie,
  normalizeGeneralPie,
  parsingValue,
  normalizeBarChart,
  normalizeGroupedBar,
  normalizeDocumentValue,
} from '../utils';

describe('src/pages/PerformanceReport/utils', () => {
  test('tabText', () => {
    expect(tabText('bakes', 'documentValue')).not.toBeNull();
    expect(tabText('offeringLetter', 'documentValue')).not.toBeNull();
    expect(tabText('smsa2p', 'documentValue')).not.toBeNull();
    expect(tabText('neucloud', 'documentValue')).not.toBeNull();
    expect(tabText('gp', 'documentValue')).not.toBeNull();
    expect(tabText('', 'documentValue')).not.toBeNull();

    expect(tabText('po', 'customerBar')).not.toBeNull();
    expect(tabText('baso', 'customerBar')).not.toBeNull();
    expect(tabText('bakes', 'customerBar')).not.toBeNull();
    expect(tabText('offeringLetter', 'customerBar')).not.toBeNull();
    expect(tabText('smsa2p', 'customerBar')).not.toBeNull();
    expect(tabText('neucloud', 'customerBar')).not.toBeNull();
    expect(tabText('gp', 'customerBar')).not.toBeNull();
    expect(tabText('visitNCX', 'customerBar')).not.toBeNull();
    expect(tabText('', 'customerBar')).not.toBeNull();

    expect(tabText('neucloud', 'productPie')).not.toBeNull();
    expect(tabText('smsa2p', 'productPie')).not.toBeNull();
    expect(tabText('gp', 'productPie')).not.toBeNull();
    expect(tabText('visitNCX', 'productPie')).not.toBeNull();
    expect(tabText('', 'productPie')).not.toBeNull();

    expect(tabText('po', 'orderTypePie')).not.toBeNull();
    expect(tabText('baso', 'orderTypePie')).not.toBeNull();
    expect(tabText('visitNCX', 'orderTypePie')).not.toBeNull();
    expect(tabText('', 'orderTypePie')).not.toBeNull();

    expect(tabText('po')).not.toBeNull();
    expect(tabText('baso')).not.toBeNull();
    expect(tabText('bakes')).not.toBeNull();
    expect(tabText('offeringLetter')).not.toBeNull();
    expect(tabText('smsa2p')).not.toBeNull();
    expect(tabText('neucloud')).not.toBeNull();
    expect(tabText('gp')).not.toBeNull();
    expect(tabText('document')).not.toBeNull();
    expect(tabText('visitNCX')).not.toBeNull();
    expect(tabText('serviceAssurance')).not.toBeNull();
    expect(tabText('neucentrix')).not.toBeNull();
    expect(tabText('')).not.toBeNull();
  });

  test('maskStatusTitle', () => {
    expect(maskStatusTitle('title', 'po')).not.toBeNull();
    expect(maskStatusTitle('title', 'baso')).not.toBeNull();
    expect(maskStatusTitle('title', 'bakes')).not.toBeNull();
    expect(maskStatusTitle('title', 'quotation')).not.toBeNull();
    expect(maskStatusTitle('title', 'offeringLetter')).not.toBeNull();
    expect(maskStatusTitle('title', 'smsa2p')).not.toBeNull();
    expect(maskStatusTitle('title', 'neucloud')).not.toBeNull();
    expect(maskStatusTitle('title', 'gp')).not.toBeNull();
    expect(maskStatusTitle('title', 'visitNCX')).not.toBeNull();
  });

  test('normalizeDocumentPie', () => {
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'approval', percentage: 10.999 }],
        'po',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'approved', percentage: 10.999 }],
        'po',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'returned', percentage: 10.999 }],
        'po',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'checking', percentage: 10.999 }],
        'po',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'po',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'baso',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'bakes',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'quotation',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'others',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'smsa2p',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'neucloud',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'gp',
      ),
    ).not.toBeNull();
    expect(
      normalizeDocumentPie(
        [{ count: 1, title: 'others', percentage: 10.999 }],
        'visitNCX',
      ),
    ).not.toBeNull();
  });

  test('normalizeGeneralPie', () => {
    expect(normalizeGeneralPie([])).not.toBeNull();
    expect(normalizeGeneralPie()).toBeNull();
  });

  test('parsingValue', () => {
    expect(parsingValue(1000)).not.toBeNull();
    expect(parsingValue()).toBeNull();
  });

  test('normalizeBarChart', () => {
    expect(normalizeBarChart([{ count: 1, title: 'others' }])).not.toBeNull();
    expect(normalizeBarChart()).toBeNull();
  });

  test('normalizeGroupedBar', () => {
    expect(normalizeGroupedBar()).not.toBeNull();
  });

  test('normalizeDocumentValue', () => {
    expect(normalizeDocumentValue('bakes', { value: 'test' })).not.toBeNull();
    expect(normalizeDocumentValue('bakes', '')).not.toBeNull();
    expect(
      normalizeDocumentValue('offeringLetter', { value: 'test' }),
    ).not.toBeNull();
    expect(normalizeDocumentValue('offeringLetter', '')).not.toBeNull();
    expect(normalizeDocumentValue('smsa2p', { value: 'test' })).not.toBeNull();
    expect(normalizeDocumentValue('smsa2p', '')).not.toBeNull();
    expect(
      normalizeDocumentValue('neucloud', { value: 'test' }),
    ).not.toBeNull();
    expect(normalizeDocumentValue('neucloud', '')).not.toBeNull();
    expect(normalizeDocumentValue('gp', { value: 'test' })).not.toBeNull();
    expect(normalizeDocumentValue('gp', '')).not.toBeNull();
    expect(normalizeDocumentValue('', { value: 'test' })).not.toBeNull();
    expect(normalizeDocumentValue()).not.toBeNull();
  });
});
