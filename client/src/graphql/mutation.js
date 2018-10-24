import gql from 'graphql-tag';

const UpdateMutation = gql`
mutation ($id: ID!, $complete: Boolean!) {
  updateTodo (id: $id, complete: $complete)
}
`;

const RemoveMutation = gql`
mutation ($id: ID!) {
  removeTodo (id: $id)
}
`;

const CreateMutation = gql`
mutation($text: String!){
  createTodo(text: $text){
    id
    text
    complete
  }
}
`;
export { UpdateMutation, RemoveMutation, CreateMutation};
