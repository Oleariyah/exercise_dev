import React, {Component} from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import {graphql, compose} from 'react-apollo';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import {CreateMutation, UpdateMutation} from '../graphql/mutation';


const styles = ({
    formControl: {
        width: 300
    },
})
export default compose( graphql(CreateMutation, {name: 'createExercise'}),
                        graphql(UpdateMutation, {name: 'updateExercise'}),
                        withStyles(styles))(class extends Component {
    
    state = this.getInitState();

    getInitState() {
        const { exercise } = this.props;
        return exercise ? exercise : {
            title: '',
            description: '',
            muscles: ''
        };
    }

    
    handleSubmit = async () => {
        //Todo Validate
        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
            ...this.state
        });

        await this.props.createExercise({
            variables: {
                title:this.state.title,
                description:this.state.description,
                muscles:this.state.muscles,
              }
        });
    };
    
    handleSubmitEdited = async () => {
        //Todo Validate
        
        this.props.onSubmit({
            id: this.state.title.toLocaleLowerCase().replace(/ /g, '-'),
            ...this.state
        });

        await this.props.updateExercise({
            variables: {
                id:this.state.id,
                title:this.state.title,
                description:this.state.description
              }
        });
    };


    handleChange = name => ({ target: { value } }) => {
        this.setState({
            [name]: value
        });
    };
    render() {
        const { title, description, muscles } = this.state, 
        { classes, exercise, muscles: categories } = this.props;
        
        return (<form>
            <TextField 
                id="standard-name" 
                label="Title" 
                value={title} 
                onChange={this.handleChange('title')} 
                margin="auto" 
                className= {classes.formControl}
                fullWidth />
            <br />
            <FormControl
                className = {classes.formControl}
                margin="auto"
                fullWidth>
                <InputLabel
                     htmlFor="muscle">
                     Muscle
                     </InputLabel>
                <Select 
                    value={muscles} 
                    onChange={this.handleChange('muscles')}>
                    {categories.map(category => 
                        <MenuItem 
                            value={category}>
                            {category}
                        </MenuItem>)}
                </Select>
            </FormControl>
            <br />
            <TextField 
                id="standard-name" 
                label="Description" 
                multiline row="4" 
                value={description} 
                onChange={this.handleChange('description')} 
                margin="auto"
                className= {classes.formControl} 
                fullWidth />
            <br />
            {exercise ?
                <Button variant="raised" onClick={this.handleSubmitEdited} disabled={!title || !muscles} color="primary">
                 "Edit" 
                </Button> : 
                <Button variant="raised" onClick={this.handleSubmit} disabled={!title || !muscles} color="primary">
                "Create"
                </Button>}
            
        </form>);
    }
})
