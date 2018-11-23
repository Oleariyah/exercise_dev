import gql from 'graphql-tag';

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

export default ExercisesQuery;