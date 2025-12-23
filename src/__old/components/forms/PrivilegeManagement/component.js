import React from 'react';
import { Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import { AddCircle } from '@material-ui/icons';
import Text from '../../elements/Text';

import { useSelector } from 'react-redux';
import Journey from './journey';
import Category from './category';
import Feature from './feature';

//hooks
import useCategory from './hooks/useCategory';
import useFeature from './hooks/useFeature';
import useValidation from './hooks/useValidation';

const Component = ({ classes }) => {
  // const { messageCategory, categoryValidation, isEmptyValidation } = useValidation();
  const { messageCategory } = useValidation();

  const { data } = useSelector((state) => ({
    data: state.privilege.edit,
  }));

  const { addCategory } = useCategory();
  const { addFeature } = useFeature();

  // useEffect(() => {
  //   categoryValidation(data.category);
  //   isEmptyValidation(data);
  // }, [data.category]);

  return (
    <>
      {!!Object.keys(data).length && (
        <Grid container>
          <Grid item xs={12}>
            <Journey classes={classes} data={data} />
            <Grid item style={{ marginLeft: 30 }}>
              {data.category.map((category) => (
                <div key={category._id}>
                  <Category
                    classes={classes}
                    data={category}
                    error={messageCategory.status}
                  />
                  <Grid item style={{ marginLeft: 30 }}>
                    <Feature category={category} classes={classes} />
                    <div className={classes.insertBtn}>
                      <span onClick={() => addFeature(category._id)}>
                        <AddCircle />
                        <Text color="green" variant="button">
                          ADD FEATURE
                        </Text>
                      </span>
                    </div>
                  </Grid>
                </div>
              ))}
              <div className={classes.insertBtn}>
                <span onClick={addCategory}>
                  <AddCircle />
                  <Text color="green" variant="button">
                    ADD CATEGORY
                  </Text>
                </span>
              </div>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

Component.propTypes = {
  classes: PropTypes.object,
};

Component.defaultProps = {
  classes: {},
};

export default Component;
