import React, { Fragment } from 'react';
import Create from '@fragments/Create';
import useAction from './hooks/useAction';
import PropTypes from 'prop-types';
import StepperForm from '../StepperForm';
import { breadcrumb } from '../../utils';
import { Grid } from '@material-ui/core';
import Typography from '@components/Typography/Typography';
import ButtonMinimal from '@components/ButtonMinimal/ButtonMinimal';
import useStyles from '../../styles';
import AddCC from '../AddCC';
import { Box, Text } from '@legion-ui/core';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import FormReviewer from './elements/FormReviewer';

const ApprovalData = (props) => {
  const {
    data,
    bpNumber,
    count,
    // reminderId,
    loading,
    onSubmit,
    submitLoading,
    onStepperClick,
    reviewerFields,
    onAddRecipient,
    onDeleteReviewer,
    control,
    onAddCC,
    onDeleteCC,
    tempCC,
    setTempCC,
    popUpcc,
    closePopUpCC,
    formState,
    onReorder,
    watch,
    update,
    trigger,
  } = useAction(props);

  const classes = useStyles({ ccType: false });

  return (
    <>
      <Create
        action={[
          {
            children: 'Save as Draft',
            onClick: onSubmit('draft'),
            variant: 'ghost',
            loading: submitLoading === 'draft',
          },
          {
            children: 'Discard',
            onClick: onSubmit('discard'),
            variant: 'ghost',
            loading: submitLoading === 'discard',
          },
          {
            children: 'Cancel',
            onClick: onSubmit('cancel'),
            variant: 'ghost',
            loading: submitLoading === 'cancel',
          },
          {
            children: 'Previous Step',
            onClick: onSubmit('previous'),
            loading: submitLoading === 'previous',
            hideDivider: true,
            ml: 8,
          },
          {
            children: 'Submit',
            onClick: onSubmit('next'),
            loading: submitLoading === 'next',
            hideDivider: true,
            ml: 8,
            disabled: !formState.isValid || tempCC.length < 1,
          },
        ]}
        breadcrumb={breadcrumb(bpNumber, count)}
        loading={loading}
        stepperTab={
          <StepperForm active={3} data={data} onStepperClick={onStepperClick} />
        }
      >
        <Box
          background="white"
          padding="24px 32px"
          radius="8px"
          shadow="0px 6px 9px 0px rgba(46, 67, 77, 0.08)"
          mt="24px"
        >
          {/* <Text color="secondary500" as="h6" mb="16px" pb={'32px'}>
            Approver
          </Text>

          <Grid container spacing={2}>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography color="general-mid" inline variant="caption">
                NAME
              </Typography>
              <Typography inline variant="subtitle1">
                {data?.approver?.name || '-'}
              </Typography>
            </Grid>
            <Grid item lg={4} sm={6} xs={12}>
              <Typography color="general-mid" inline variant="caption">
                TITLE
              </Typography>
              <Typography inline variant="subtitle1">
                {data?.approver?.jobTitle || '-'}
              </Typography>
            </Grid>
          </Grid> */}
          <Text
            color="secondary500"
            as="h6"
            mb="16px"
            pb={'32px'}
            // pt={'40px'}
          >
            Reviewer
          </Text>
          <DragDropContext onDragEnd={onReorder}>
            <Droppable droppableId="reviewer">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {reviewerFields.map((field, index) => {
                    if (field.isEdit) {
                      return (
                        <Fragment key={field.id}>
                          <Draggable draggableId={field.id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <FormReviewer
                                  control={control}
                                  field={field}
                                  index={index}
                                  provided={provided}
                                  update={update}
                                  watch={watch}
                                  trigger={trigger}
                                />
                                {reviewerFields.filter((v) => v.isEdit === true)
                                  .length !== 1 &&
                                  (index < reviewerFields.length - 1 ||
                                    index === 4) && (
                                    <Box mt={'4px'}>
                                      <Grid alignItems="center" container>
                                        <Grid item xs={10}>
                                          <div className={classes.dashed} />
                                        </Grid>
                                        <Grid item xs={2}>
                                          <ButtonMinimal
                                            label="delete reviewer"
                                            onClick={onDeleteReviewer(index)}
                                            variant="delete"
                                          />
                                        </Grid>
                                      </Grid>
                                    </Box>
                                  )}
                              </div>
                            )}
                          </Draggable>
                        </Fragment>
                      );
                    }
                  })}
                  {reviewerFields.length < 5 && (
                    <Box mt={'4px'}>
                      <Grid alignItems="center" container>
                        <Grid item xs={10}>
                          <div className={classes.dashed} />
                        </Grid>
                        <Grid item xs={2}>
                          <ButtonMinimal
                            label="add reviewer"
                            onClick={onAddRecipient}
                            variant="add"
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  {reviewerFields.map((field, index) => {
                    if (!field.isEdit) {
                      return (
                        <div key={field.id}>
                          <FormReviewer
                            control={control}
                            field={field}
                            index={index}
                            provided={provided}
                            update={update}
                            watch={watch}
                            trigger={trigger}
                          />
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <Text color="secondary500" as="h6" mb="16px" pb={'32px'} pt={'40px'}>
            CC
          </Text>
          {tempCC?.map((item, i) => (
            <Fragment key={i}>
              <Grid alignItems="center" container key={`cc${i}`}>
                <Grid item xs={2}>
                  <Typography color="general-mid" variant="body1">
                    CC {i + 1}
                  </Typography>
                </Grid>
                <Grid item xs={10}>
                  <Typography
                    color="general-main"
                    variant="body1"
                    weight="medium"
                  >
                    {item.name?.toUpperCase()}
                  </Typography>
                </Grid>
              </Grid>
              {/* {i > 3 && ( */}
              <Grid alignItems="center" container>
                <Grid item xs={10}>
                  <div className={classes.dashed} />
                </Grid>
                <Grid item xs={2}>
                  <ButtonMinimal
                    label="delete CC"
                    onClick={onDeleteCC(item)}
                    variant="delete"
                  />
                </Grid>
              </Grid>
              {/* )} */}
            </Fragment>
          ))}
          <Box>
            <Grid alignItems="center" container>
              <Grid item xs={10}>
                <div className={classes.dashed} />
              </Grid>
              <Grid item xs={2}>
                <ButtonMinimal label="add cc" onClick={onAddCC} variant="add" />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Create>

      <AddCC
        onClose={closePopUpCC}
        open={popUpcc}
        recepientCC={tempCC}
        setRecepientCC={setTempCC}
      />
    </>
  );
};

ApprovalData.defaultProps = {
  data: null,
};

ApprovalData.propTypes = {
  data: PropTypes.object,
  // paramsData: PropTypes.bool.isRequired,
  // setTab: PropTypes.func.isRequired
};

export default ApprovalData;
