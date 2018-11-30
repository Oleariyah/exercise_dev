import React, { Component, Fragment } from "react";
import { Query } from "react-apollo";
import { CssBaseline } from "@material-ui/core/";
import { Header, Footer } from "./layouts";
import Exercises from "./exercises";
import ExercisesQuery from './graphql/query';
import { muscles } from "../store";

class App extends Component {
   constructor(props) {
    super(props);
  
    const exercises = props.data.exercises;

    this.state = {
      exercises,
      exercise: {}
    };
}

  getExercisesByMuscles() {
    const initExercises = muscles.reduce(
      (exercises, category) => ({
        ...exercises,
        [category]: []
      }),
      {}
    );
    
    return Object.entries(
      this.state.exercises.reduce((exercises, exercise) => {
        const { muscles } = exercise;

        exercises[muscles] = [...exercises[muscles], exercise];

        return exercises;
      }, initExercises)
    );
  }

  handleCategorySelect = category =>
    this.setState({
      category
    });

  handleExerciseSelect = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: false
    }));

  handleExerciseCreate = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises, exercise]
    }));

  handleExerciseDelete = id =>
    this.setState(({ exercises, exercise, editMode }) => ({
      exercises: exercises.filter(ex => ex.id !== id),
      editMode: exercise.id === id ? false : editMode,
      exercise: exercise.id === id ? {} : exercise
    }));
  

  handleExerciseSelectEdit = id =>
    this.setState(({ exercises }) => ({
      exercise: exercises.find(ex => ex.id === id),
      editMode: true
    }));

  handleExerciseEdit = exercise =>
    this.setState(({ exercises }) => ({
      exercises: [...exercises.filter(ex => ex.id !== exercise.id), exercise],
      exercise,
      editMode: false
    }));

  render() {
    const exercises = this.getExercisesByMuscles(),
    {category, exercise, editMode} = this.state

    return (
      <Fragment>
        <CssBaseline />
        
            <Header
            muscles = {muscles}
            onExerciseCreate = {this.handleExerciseCreate}
            />
            
            <Exercises 
            exercise = {exercise}     
            exercises = {exercises}
            category = {category}
            muscles = {muscles}
            editMode = {editMode}
            onSelect = {this.handleExerciseSelect}
            onDelete = {this.handleExerciseDelete}
            onSelectEdit = {this.handleExerciseSelectEdit}
            onEdit = {this.handleExerciseEdit}
            />
            <Footer 
            category = {category}
            muscles = {muscles}
            onSelect = {this.handleCategorySelect}
            />
          
        </Fragment>
    );
  }
}

export default class AppContainer extends Component{
  render() {
    return (
      <Query query={ExercisesQuery}>
        {({ loading, error, data }) => {
          if (loading) {
            return <p>Loading ...</p>;
          }
          if (error) {
            return `Error ${error}`;
          }

          return <App data={data} />;
        }}
      </Query>
    );
  }
}
