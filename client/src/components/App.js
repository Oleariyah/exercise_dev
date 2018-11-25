import React, { Component } from "react";
import { graphql, Query } from "react-apollo";
import { CssBaseline } from "@material-ui/core/";
import { Header, Footer } from "./layouts";
import Exercises from "./exercises";
//import ExercisesQuery from './graphql/query';
import { muscles } from "../store";
import { Provider } from "../context";
import gql from "graphql-tag";

const ExercisesQuery = gql`
  {
    exercises {
      id
      title
      description
      muscles
    }
  }
`;

class App extends Component {
  getInitState() {
    const {
      data: { loading, exercises }
    } = this.props;
    console.log("initial props are", this.props);
    if (loading) {
      return null;
    } else {
      return exercises.map(exercise => exercise);
    }
  }

  state = {
    exercises: this.getInitState(),
    exercise: {}
  };

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

  getContext = () => ({
    muscles,
    exercisesByMuscles: this.getExercisesByMuscles(),
    ...this.state,
    onCategorySelect: this.handleCategorySelect,
    onCreate: this.handleExerciseCreate,
    onEdit: this.handleExerciseEdit,
    onSelectEdit: this.handleExerciseSelectEdit,
    onDelete: this.handleExerciseDelete,
    onSelect: this.handleExerciseSelect
  });

  render() {
    return (
      <Provider value={this.getContext()}>
        <CssBaseline />
        <Header />
        <Exercises />
        <Footer />
      </Provider>
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


//export default graphql(ExercisesQuery)(App);
