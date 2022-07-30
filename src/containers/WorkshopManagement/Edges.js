import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router';

import {
  addNotificationAction,
} from '../../redux/slices/notifications2';
import {
  addEdgeAction,
  getAllWorkshopEdgesAction,
  getAllWorkshopStatesInfoAction,
  removeEdgeAction,
  updateEdgeAction,
} from '../../redux/slices/workshop2';
import { toEnglishNumber, toPersianNumber } from '../../utils/translateNumber';

const useStyles = makeStyles((theme) => ({
  absolute: {
    position: 'absolute',
    right: theme.spacing(2),
    zIndex: 5,
  },
}));

function Index({
  addNotification,
  getAllWorkshopEdges,
  getAllWorkshopStatesInfo,
  addEdge,
  updateEdge,
  removeEdge,

  allWorkshopEdges,
  allStates,
}) {
  const [stateName, setStateName] = useState();
  const [newEdge, setNewEdge] = useState({
    tail: '',
    head: '',
    is_visible: false,
  });
  const { fsmId } = useParams()

  useEffect(() => {
    getAllWorkshopEdges({ fsmId });
    getAllWorkshopStatesInfo({ fsmId });
  }, [])

  const doSearch = () => {

  }

  return (
    <>
      <Grid container spacing={1} alignItems="center" justify="center">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>شروع</TableCell>
                <TableCell align='center'>پایان</TableCell>
                <TableCell align='center'>قابل مشاهده</TableCell>
                <TableCell align='center'>عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell align='center'>
                  <FormControl fullWidth size='small' variant="outlined">
                    <InputLabel>شروع</InputLabel>
                    <Select
                      value={newEdge.tail}
                      onChange={(e) => {
                        setNewEdge({
                          ...newEdge,
                          tail: e.target.value,
                        })
                      }}
                      label='شروع'
                    >
                      {allStates?.map((state) => (
                        <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl >
                </TableCell>
                <TableCell align='center'>
                  <FormControl fullWidth size='small' variant="outlined">
                    <InputLabel>پایان</InputLabel>
                    <Select
                      value={newEdge.head}
                      onChange={(e) => {
                        setNewEdge({
                          ...newEdge,
                          head: e.target.value,
                        })
                      }}
                      label='پایان'
                    >
                      {allStates?.map((state) => (
                        <MenuItem key={state.id} value={state.id}>{state.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl >
                </TableCell>
                <TableCell align='center'>
                  <Checkbox
                    checked={newEdge.is_visible}
                    onChange={() => {
                      setNewEdge({
                        ...newEdge,
                        is_visible: !newEdge.is_visible,
                      })
                    }}
                    color="primary"
                  />
                </TableCell>
                <TableCell align='center'>
                  <Button
                    onClick={() => {
                      addEdge(newEdge)
                    }}
                    variant='contained' color='primary'>
                    {'ایجاد'}
                  </Button>
                </TableCell>
              </TableRow>
              {allWorkshopEdges?.map((edge, index) =>
                <TableRow key={index}>
                  <TableCell align='center'>
                    {edge.tail?.name}
                  </TableCell>
                  <TableCell align='center'>
                    {edge.head?.name}
                  </TableCell>
                  <TableCell align='center'>
                    <Checkbox
                      checked={edge.is_visible}
                      onChange={() => {
                        updateEdge({
                          edgeId: edge.id,
                          is_visible: !edge.is_visible,
                          head: edge.head?.id,
                          tail: edge.tail?.id,
                        }) // todo: fix 
                      }}
                      color="primary"
                    />
                  </TableCell>
                  <TableCell align='center'>
                    <IconButton size='small'
                      onClick={() => {
                        removeEdge({ edgeId: edge.id })
                      }}>
                      <ClearIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

const mapStateToProps = (state) => ({
  allWorkshopEdges: state.workshop.allWorkshopEdges,
  allStates: state.workshop.allStates,
});

export default connect(
  mapStateToProps,
  {
    addEdge: addEdgeAction,
    getAllWorkshopEdges: getAllWorkshopEdgesAction,
    getAllWorkshopStatesInfo: getAllWorkshopStatesInfoAction,
    removeEdge: removeEdgeAction,
    updateEdge: updateEdgeAction,
  }
)(Index);
