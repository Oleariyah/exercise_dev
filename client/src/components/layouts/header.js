import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core/';
import CreateDialog from '../exercises/dialog'

export default ({muscles, onExerciseCreate}) => 

    <AppBar position="static">
        <Toolbar>
        <Typography variant="headline" color="inherit" style={{flex:1}}>
          Exercise Application
        </Typography>
        <CreateDialog 
        muscles = {muscles}
        onCreate = {onExerciseCreate}
        />
        </Toolbar>
    </AppBar>
