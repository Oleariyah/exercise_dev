import gql from 'graphql-tag';

const TodosQuery = gql`
 {
  todos {
    id
    text
    complete
  }
}
`;

export default TodosQuery;