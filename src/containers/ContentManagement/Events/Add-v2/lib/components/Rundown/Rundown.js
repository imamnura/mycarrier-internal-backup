import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { generateInitialData, ordinalDate, reOrder } from './utils';
import { Box } from '@material-ui/core';
import ButtonMinimal from '@components/ButtonMinimal';
import Order from '@assets/icon-v2/Order';
import Typography from '@components/Typography';
import clsx from 'clsx';
import useStyles from './styles';
import AddRundown from './elements/AddRundown';
import RundownItem from './elements/RundownItem';
import PropTypes from 'prop-types';
import { dateFormat } from '@utils/parser';

const Rundown = (props) => {
  const {
    isClickPreview,
    isLoadingDetail,
    onChangeDataEn,
    onChangeDataId,
    range,
    setRange,
    setValue,
    tab,
    watchField: { rundownen, rundownid },
  } = props;

  const [dataId, setDataId] = useState(rundownid);
  const [dataEn, setDataEn] = useState(rundownen);

  useEffect(() => {
    if (isLoadingDetail) {
      setDataId(rundownid);
      setDataEn(rundownen);
    } else if (!isClickPreview) {
      //not run when preview page
      if (range[0] && range[1]) {
        setDataId(generateInitialData(range));
        setDataEn(generateInitialData(range));
        onChangeDataId(generateInitialData(range));
        onChangeDataEn(generateInitialData(range));
      }
    }
  }, [range]);

  useEffect(() => {
    if (tab === 'id') {
      setDataId(rundownid);
    } else {
      setDataEn(rundownen);
    }
  }, [tab]);

  const classes = useStyles();

  const onDragEnd = (result) => {
    const { destination, source, type } = result;

    if (destination) {
      if (type === 'eventDay') {
        const questions = reOrder({
          type: 'event',
          data: dataId,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });

        const questionsEn = reOrder({
          type: 'event',
          data: dataEn,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });

        setDataId(questions);
        setDataEn(questionsEn);
        onChangeDataId(questions);
        onChangeDataEn(questionsEn);
      } else {
        const child = reOrder({
          type: 'rundown',
          data: dataId[parseInt(type, 10)].items,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });

        const childEn = reOrder({
          type: 'rundown',
          data: dataEn[parseInt(type, 10)].items,
          sourceIndex: source.index,
          destinationIndex: destination.index,
        });

        const questions = JSON.parse(JSON.stringify(dataId));
        const questionsEn = JSON.parse(JSON.stringify(dataEn));

        questions[type].items = child;
        questionsEn[type].items = childEn;

        setDataId(questions);
        setDataEn(questionsEn);
        onChangeDataId(questions);
        onChangeDataEn(questionsEn);
      }
    }
  };

  const onDelete =
    ({ parentIndex, childIndex }) =>
    () => {
      if (!isNaN(parentIndex) && isNaN(childIndex)) {
        const result = dataId.filter((_, index) => index !== parentIndex);
        const resultEn = dataEn.filter((_, index) => index !== parentIndex);
        setDataId(result);
        setDataEn(resultEn);
        onChangeDataId(result);
        onChangeDataEn(resultEn);

        const startDateRange = result[0]?.date;
        const endDateRange = result[result.length - 1]?.date;

        if (result.length > 0) {
          setRange([startDateRange, endDateRange]);
        } else {
          setRange([null, null]);
        }
      } else {
        const result = dataId.map((parentData, p) => {
          if (parentIndex === p) {
            return {
              ...parentData,
              items: parentData.items.filter(
                (_, index) => index !== childIndex,
              ),
            };
          } else {
            return parentData;
          }
        });

        const resultEn = dataEn.map((parentData, p) => {
          if (parentIndex === p) {
            return {
              ...parentData,
              items: parentData.items.filter(
                (_, index) => index !== childIndex,
              ),
            };
          } else {
            return parentData;
          }
        });

        setDataId(result);
        setDataEn(resultEn);
        onChangeDataId(result);
        onChangeDataEn(resultEn);
      }
    };

  const onAdd =
    ({ parentIndex }) =>
    ({ title, startTime, endTime }, setError, callback) => {
      const convertStartTime = dateFormat({
        date: startTime,
        type: 'timezone-jakarta',
      });
      const convertEndTime = dateFormat({
        date: endTime,
        type: 'timezone-jakarta',
      });

      const titleTemp = title;
      const itExist = dataId[parentIndex].items.filter(
        ({ title, startTime, endTime }) => {
          return (
            title.toLowerCase() === titleTemp.toLowerCase() ||
            startTime === convertStartTime ||
            endTime === convertEndTime
          );
        },
      );

      if (itExist.length !== 0) {
        setError(true);
      } else {
        let result = [...dataId];
        result[parentIndex].items.push({
          title,
          startTime: convertStartTime,
          endTime: convertEndTime,
        });

        let resultEn = [...dataEn];
        resultEn[parentIndex].items.push({
          title: '',
          startTime: convertStartTime,
          endTime: convertEndTime,
        });

        setDataId(result);
        setDataEn(resultEn);
        onChangeDataId(result);
        onChangeDataEn(resultEn);

        callback();
      }
    };

  const onEdit =
    ({ parentIndex, childIndex }) =>
    ({ title, startTime, endTime }) => {
      const convertStartTime = dateFormat({
        date: startTime,
        type: 'timezone-jakarta',
      });
      const convertEndTime = dateFormat({
        date: endTime,
        type: 'timezone-jakarta',
      });
      if (tab === 'id') {
        let result = [...dataId];
        result[parentIndex].items[childIndex] = {
          endTime: convertEndTime,
          startTime: convertStartTime,
          title,
        };

        let dEnTemp = [...dataEn];
        dEnTemp[parentIndex].items[childIndex] = {
          ...dEnTemp[parentIndex].items[childIndex],
          endTime: convertEndTime,
          startTime: convertStartTime,
        };

        setDataId(result);
        setDataEn(dEnTemp);
        onChangeDataId(result);
        onChangeDataEn(dEnTemp);
      } else {
        let resultEn = [...dataEn];
        resultEn[parentIndex].items[childIndex] = {
          endTime: convertEndTime,
          startTime: convertStartTime,
          title,
        };

        let dIdTemp = [...dataId];
        dIdTemp[parentIndex].items[childIndex] = {
          ...dIdTemp[parentIndex].items[childIndex],
          endTime: convertEndTime,
          startTime: convertStartTime,
        };

        setDataEn(resultEn);
        setDataId(dIdTemp);
        onChangeDataEn(resultEn);
        onChangeDataId(dIdTemp);
      }
    };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable" type="eventDay">
        {(provided, snapshot) => (
          <div
            className={clsx({
              [classes.container]: true,
              [classes.containerDragging]: snapshot.isDraggingOver,
            })}
            ref={provided.innerRef}
          >
            {tab === 'id'
              ? dataId.map((parent, parentIndex) => (
                  <Draggable
                    draggableId={parent.title + parentIndex}
                    index={parentIndex}
                    key={parent.title + parentIndex}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        className={clsx({
                          [classes.container]: true,
                          [classes.containerDragging]: snapshot.isDraggingOver,
                        })}
                        ref={provided.innerRef}
                      >
                        <div className={classes.parent}>
                          <Box
                            {...provided.dragHandleProps}
                            className={clsx({
                              [classes.box]: dataId.length === 1,
                            })}
                            width={48}
                          >
                            <Order />
                          </Box>
                          <Box flexGrow={1}>
                            {dataId.length > 1 && (
                              <Typography
                                children={
                                  ordinalDate(dataId.length, tab)[parentIndex]
                                }
                                color="general-mid"
                                variant="caption"
                              />
                            )}
                            <Typography
                              children={parent.title}
                              className={classes.marginTop4}
                              inline
                              variant="h5"
                              weight="medium"
                            />
                          </Box>
                          <Box pr={2}>
                            <ButtonMinimal
                              label="delete event day"
                              onClick={onDelete({ parentIndex })}
                              variant="delete"
                            />
                          </Box>
                        </div>
                        <Box
                          className={classes.line}
                          sx={{ height: 50 * (parent.items.length - 1) }}
                        />
                        <Droppable
                          droppableId={`droppable${parent.title + parentIndex}`}
                          type={`${parentIndex}`}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={clsx({
                                [classes.container]: true,
                                [classes.containerDragging]:
                                  snapshot.isDraggingOver,
                                [classes.containerChild]: true,
                              })}
                              ref={provided.innerRef}
                            >
                              {parent.items?.map((child, childIndex) => {
                                return (
                                  <Draggable
                                    draggableId={`${child.title}-${parentIndex}-${childIndex}`}
                                    index={childIndex}
                                    key={`${child.title}-${parentIndex}-${childIndex}`}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        {...provided.draggableProps}
                                        className={clsx({
                                          [classes.container]: true,
                                          [classes.containerDragging]:
                                            snapshot.isDraggingOver,
                                        })}
                                        ref={provided.innerRef}
                                      >
                                        <RundownItem
                                          baseDate={parent.date}
                                          classes={classes}
                                          data={child}
                                          minTime={
                                            dataId[parentIndex]?.items[
                                              childIndex - 1
                                            ]?.endTime
                                          }
                                          onDelete={onDelete({
                                            parentIndex,
                                            childIndex,
                                          })}
                                          onSubmit={onEdit({
                                            parentIndex,
                                            childIndex,
                                          })}
                                          provided={provided}
                                          setValue={setValue}
                                          tab={tab}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                              <AddRundown
                                baseDate={parent.date}
                                classes={classes}
                                minTime={
                                  dataId[parentIndex]?.items[
                                    parent.items.length - 1
                                  ]?.endTime
                                }
                                onSubmit={onAdd({ parentIndex })}
                                parentIndex={parentIndex}
                                setValue={setValue}
                                tab={tab}
                                type="add"
                              />
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))
              : dataEn.map((parent, parentIndex) => (
                  <Draggable
                    draggableId={parent.title + parentIndex}
                    index={parentIndex}
                    key={parent.title + parentIndex}
                  >
                    {(provided, snapshot) => (
                      <div
                        {...provided.draggableProps}
                        className={clsx({
                          [classes.container]: true,
                          [classes.containerDragging]: snapshot.isDraggingOver,
                        })}
                        ref={provided.innerRef}
                      >
                        <div className={classes.parent}>
                          <Box {...provided.dragHandleProps} width={48}>
                            <Order />
                          </Box>
                          <Box flexGrow={1}>
                            <Typography
                              children={
                                ordinalDate(dataEn.length, tab)[parentIndex]
                              }
                              color="general-mid"
                              variant="caption"
                            />
                            <Typography
                              children={parent.title}
                              className={classes.marginTop4}
                              inline
                              variant="h5"
                              weight="medium"
                            />
                          </Box>
                        </div>
                        <Box
                          className={classes.line}
                          sx={{ height: 50 * (parent.items.length - 1) }}
                        />
                        <Droppable
                          droppableId={`droppable${parent.title + parentIndex}`}
                          type={`${parentIndex}`}
                        >
                          {(provided, snapshot) => (
                            <div
                              className={clsx({
                                [classes.container]: true,
                                [classes.containerDragging]:
                                  snapshot.isDraggingOver,
                                [classes.containerChild]: true,
                              })}
                              ref={provided.innerRef}
                            >
                              {parent.items?.map((child, childIndex) => {
                                return (
                                  <Draggable
                                    draggableId={`${child.title}-${parentIndex}-${childIndex}`}
                                    index={childIndex}
                                    key={`${child.title}-${parentIndex}-${childIndex}`}
                                  >
                                    {(provided, snapshot) => (
                                      <div
                                        {...provided.draggableProps}
                                        className={clsx({
                                          [classes.container]: true,
                                          [classes.containerDragging]:
                                            snapshot.isDraggingOver,
                                        })}
                                        ref={provided.innerRef}
                                      >
                                        <RundownItem
                                          baseDate={parent.date}
                                          classes={classes}
                                          data={child}
                                          onDelete={onDelete({
                                            parentIndex,
                                            childIndex,
                                          })}
                                          onSubmit={onEdit({
                                            parentIndex,
                                            childIndex,
                                          })}
                                          provided={provided}
                                          setValue={setValue}
                                          tab={tab}
                                        />
                                      </div>
                                    )}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                              <AddRundown
                                baseDate={parent.date}
                                classes={classes}
                                onSubmit={onAdd({ parentIndex })}
                                setValue={setValue}
                                tab={tab}
                                type="add"
                              />
                            </div>
                          )}
                        </Droppable>
                      </div>
                    )}
                  </Draggable>
                ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

Rundown.propTypes = {
  isClickPreview: PropTypes.bool.isRequired,
  isLoadingDetail: PropTypes.bool.isRequired,
  onChangeDataEn: PropTypes.func.isRequired,
  onChangeDataId: PropTypes.func.isRequired,
  range: PropTypes.array.isRequired,
  setRange: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  tab: PropTypes.string.isRequired,
  watchField: PropTypes.object.isRequired,
};

export default Rundown;
