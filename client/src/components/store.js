import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const ExercisesQuery = gql`
 query{
    exercises {
        id
        title
        description
        muscles
      }
}
`;
 
const exercisesData = () => (
    <Query query = { ExercisesQuery } >
    {({loading, error, data:{exercises}}) => {
      if(loading) return "Loading...";
      if(error) return `Error! ${error.message}`;

      return exercises.map(exercise => exercise);
    }}
    </Query>
  );
console.log(exercisesData())
const exercises =  exercisesData();

export default (exercises)