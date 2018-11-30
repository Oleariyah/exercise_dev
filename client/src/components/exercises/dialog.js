import React, { Fragment, Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import Form from './form';

class CreateDialog extends Component {
    state = {
        open: false
    }
    
    handleToggle = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleFormSubmit = exercise => {
        this.handleToggle()
        this.props.onCreate(exercise)
    }
    
    render(){
        
        const {open} = this.state,
        {muscles} = this.props
              
        return(
            <Fragment>

            <Button 
            variant="fab" 
            onClick={this.handleToggle} 
            color="secondary" 
            mini>

            <AddIcon />
            
            </Button>
            
            <Dialog
            open={open}
            onClose={this.handleToggle}
            fullWidth
            maxWidth='xs'
            >
                
                <DialogTitle>
                Create A New Exercise
                </DialogTitle>
                
                <DialogContent>
                    
                    <DialogContentText>
                    Please, fill the form below.    
                    </DialogContentText>
                    <Form 
                    muscles={muscles}
                    onSubmit={this.handleFormSubmit}
                    />

                </DialogContent>
            </Dialog>
        </Fragment>
    )}}

    export default CreateDialog;