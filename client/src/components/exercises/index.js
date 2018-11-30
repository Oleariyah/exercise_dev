import React, { Fragment, Component } from "react";
import {graphql, compose} from 'react-apollo';
import { Grid, Paper, Typography, List } from "@material-ui/core/";
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core/";
import { Delete, Edit } from "@material-ui/icons/";
import Form from "./form";
import { withStyles } from "@material-ui/core/styles";
import {RemoveMutation} from '../graphql/mutation';


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    overflowY: "auto",
    [theme.breakpoints.up("sm")]: {
      marginTop: 5,
      height: "calc(100% - 10px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "100%"
    }
  },
  "@global": {
    "html, body, #root": {
      height: "100%"
    }
  },
  container: {
    [theme.breakpoints.up("sm")]: {
      height: "calc(100% - 64px - 48px)"
    },
    [theme.breakpoints.down("xs")]: {
      height: "calc(100% - 54px - 48px)"
    }
  },
  item: {
    [theme.breakpoints.down("xs")]: {
      height: "50%"
    }
  }
});
 
class Exercises extends Component {
  
  handleDelete = async id => {
     
    await this.props.removeExercise({
        variables: {
            id:id
          }
    });
  };

  render() {
    
    const {
      classes,
      muscles,
      exercises,
      editMode,
      category,
      onSelect,
      exercise,
      onSelectEdit,
      onEdit,
      onDelete,
      exercise: {
        id,
        title = "Welcome!",
        description = "Please select an exercise from the list on the left."
      },
    } = this.props
    return (
      <Grid container className={classes.container}>
    <Grid item className={classes.item} xs={12} sm={6}>
      <Paper className={classes.paper}>
        {exercises.map(([group, exercises]) =>
          !category || category === group ? (
            <Fragment key={group}>
              <Typography
                variant="headline"
                color="secondary"
                style={{ textTransform: "capitalize" }}
              >
                {group}
              </Typography>
              <List component="ul">
                {exercises.map(({ id, title }) => (
                  <ListItem key={id} button onClick={() => onSelect(id)}>
                    <ListItemText primary={title} />
                    <ListItemSecondaryAction>
                      <IconButton
                        color="primary"
                        onClick={() => onSelectEdit(id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton color="primary" 
                      onClick={() => {
                        onDelete(id);
                        this.handleDelete(id);
                      }}>
                        <Delete />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </Fragment>
          ) : null
          )}
        </Paper>
      </Grid>
    <Grid item className={classes.item} xs={12} sm={6}>
      <Paper className={classes.paper}>
        <Typography variant="display1" color="secondary">
          {title}
        </Typography>
        {editMode ? (
          <Form
            key={id}
            exercise={exercise}
            muscles={muscles}
            onSubmit={onEdit}
          />
        ) : (
          <Fragment>
            <Typography variant="subheading">{description}</Typography>
          </Fragment>
        )}
      </Paper>
    </Grid>
  </Grid>
    )
  }
}

export default compose( graphql(RemoveMutation, {name: 'removeExercise'}),
withStyles(styles))(Exercises);
