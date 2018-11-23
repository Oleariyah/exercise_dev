import gql from 'graphql-tag';

const UpdateMutation = gql`
mutation ($id: ID!, $title: String!, $description: String!) {
  updateExercise (id: $id, title: $title, description: $description)
} 
`;

const RemoveMutation = gql`
mutation ($id: ID!) {
  removeExercise (id: $id)
}
`;

const CreateMutation = gql`
mutation($title: String!, $description: String!, $muscle: String!){
  createTodo(title: $title, description: $description, muscles: $muscles){
    id
    title
    description
    muscles
  }
}
`;
export { UpdateMutation, RemoveMutation, CreateMutation};
