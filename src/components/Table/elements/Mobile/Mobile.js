import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import Skeleton from '../../../Skeleton';
import Status from '../../../Status';
import Typography from '../../../Typography';
import useStyles from './styles';
import NoData from '../../../../assets/ilustration-v2/NoData';
import { getValueObject } from '../../../../utils/common';
import { dateFormat, rupiahFormat } from '@utils/parser';
import StateMessage from '@components/StateMessage';

const TableMobile = (props) => {
  const {
    data,
    emptyMessage,
    loading,
    loadingRoot,
    onClickRow: _onClickRow,
    schema,
    size,
    meta,
    id = 'data-act',
  } = props;

  const classes = useStyles({ size });

  const onClickRow = (dataItem) => (e) => {
    e.stopPropagation();
    _onClickRow(dataItem);
  };

  const renderInfo = ({ value, label, key }) => (
    <div className={classes.information} key={key}>
      {typeof label === 'string' ? (
        <Typography
          children={label.toUpperCase()}
          inline
          variant="caption"
          weight="bold"
        />
      ) : (
        <>{label}</>
      )}
      {typeof value === 'string' ? (
        <Typography
          children={value}
          className={classes.informationLabel}
          inline
        />
      ) : (
        <>{value}</>
      )}
    </div>
  );

  const generateLoading = (s) =>
    s && (
      <>
        {new Array(s).fill(null).map((l, k) => (
          <div className={classes.itemData} key={k}>
            {schema.map((schemaItem) => (
              <div className={classes.information} key={schemaItem.name}>
                {!schemaItem.schemaStatus && (
                  <Skeleton
                    height={14}
                    width={schemaItem.label.length * 4 + 80}
                  />
                )}
                <Box pt={0.5}>
                  <Skeleton height={18} width={120} />
                </Box>
              </div>
            ))}
            {!!_onClickRow && (
              <div className={classes.itemDataAction}>
                <Skeleton height={14} width={80} />
              </div>
            )}
          </div>
        ))}
      </>
    );

  const renderLoadingRoot = generateLoading(loadingRoot ? size : null);
  const renderLoading = generateLoading(loading && !loadingRoot ? 2 : null);

  const renderNotFound = !loadingRoot && !data.length && (
    <div className={classes.boxNotFound}>
      <Box textAlign="center">
        <StateMessage
          description={emptyMessage?.description}
          ilustration={emptyMessage?.icon || NoData}
          message={emptyMessage?.message || emptyMessage}
        />
      </Box>
    </div>
  );

  const renderData = !loadingRoot && (
    <>
      {data.map((dataItem, i) => (
        <div className={classes.itemData} key={`item${i}`}>
          {schema.map((bodyItem) => {
            const name = bodyItem.name;
            const label = bodyItem.label;
            let value = getValueObject({ name, data: dataItem }) || '-';

            if (
              ['string', 'number'].includes(typeof value) ||
              bodyItem.keepLabel
            ) {
              if (bodyItem.formatDate) {
                value = dateFormat({
                  date: value,
                  type: bodyItem.formatDate,
                  empty: '-',
                });
              }

              if (bodyItem.currency) {
                value = rupiahFormat(value);
              }

              if (bodyItem?.converter) {
                value = bodyItem.converter(value);
              }

              if (bodyItem.schemaStatus) {
                return (
                  <Box display="flex" key={`${name}-${value}`}>
                    <Status
                      children={value}
                      variant={bodyItem.schemaStatus[value]}
                    />
                  </Box>
                );
              }

              return renderInfo({
                key: `${name}-${value}`,
                value: value,
                label: label,
              });
            }

            return <div key={`${name}-${value}`}>{value}</div>;
          })}
          {!!_onClickRow && (
            <div className={classes.itemDataAction}>
              <Typography
                children="Lihat Detail"
                color="primary-main"
                id={`${id}-${i}`}
                onClick={onClickRow(dataItem)}
                style={{ cursor: 'pointer' }}
                variant="buttonS"
                weight="medium"
              />
            </div>
          )}
        </div>
      ))}
    </>
  );

  const totalData =
    meta.page >= meta.totalPage ? meta.totalData : meta.size * meta.page;

  const renderPageInformation = meta.page > 0 &&
    !loadingRoot &&
    data.length > 0 && (
      <div className={classes.pageInformation}>
        <Typography variant="caption">
          Showing <strong>{totalData}</strong> data from{' '}
          <strong>{meta.totalData} data</strong>
        </Typography>
      </div>
    );

  return (
    <>
      {renderLoadingRoot}
      {renderData}
      {renderLoading}
      {renderNotFound}
      {renderPageInformation}
    </>
  );
};

TableMobile.defaultProps = {
  data: [],
  emptyMessage: 'Data not found',
  loading: false,
  loadingRoot: false,
  meta: {
    page: 1,
    totalData: 0,
    totalPage: 0,
  },
  numbering: true,
  onClickRow: null,
  schema: [],
  size: 5,
  useOrderBy: [null, () => {}],
  useOrderDirection: [null, () => {}],
  useSelectedRow: [],
};

TableMobile.propTypes = {
  data: PropTypes.array,
  emptyMessage: PropTypes.string,
  loading: PropTypes.bool,
  loadingRoot: PropTypes.bool,
  meta: PropTypes.object,
  numbering: PropTypes.bool,
  onClickRow: PropTypes.func,
  schema: PropTypes.array,
  size: PropTypes.number,
  useOrderBy: PropTypes.array,
  useOrderDirection: PropTypes.array,
  useSelectedRow: PropTypes.array,
};

export default TableMobile;
