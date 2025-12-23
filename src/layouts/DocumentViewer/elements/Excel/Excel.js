import React from 'react';
import Typography from '@components/Typography';
import useStyles from './styles';
import useAction from './hooks/useAction';
import ViewerContainer from '../ViewerContainer';
import Loading from '@components/Loading';

const Excel = () => {
  const { excelData, url, title, action, onClose, onDownload, loading } =
    useAction();

  const classes = useStyles();

  return (
    <ViewerContainer
      action={action}
      emptyDoc={loading ? false : !excelData?.data?.length}
      onClose={onClose}
      onDownload={onDownload}
      open={!!url}
      title={title}
    >
      {loading ? (
        <div className={classes.loading}>
          <Loading color="primary" size="huge" />
        </div>
      ) : (
        <>
          {!!excelData?.data?.length && (
            <div className={classes.wrapper}>
              <table borde className={classes.table}>
                <thead>
                  <tr>
                    {excelData.header?.map((headItem, id) => (
                      <td key={`excel-head-${id}`}>
                        <Typography variant="subtitle2" weight="medium">
                          {headItem}
                        </Typography>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {excelData.data?.map((dataItem, ix) => (
                    <tr key={`excel-row-${ix}`}>
                      {excelData.header?.map((key, id) => (
                        <td key={`excel-col-${id}`}>{dataItem[key]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </ViewerContainer>
  );
};

export default React.memo(Excel);
