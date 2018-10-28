import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import {UpdateMutation} from '../graphql/mutation';
import {graphql, compose} from 'react-apollo';
import TodosQuery from '../graphql/query';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

class CheckBox extends React.Component {

    updateTodo = async todo => {
        //update todo
        await this.props.updateTodo({
          variables: {
            id: todo.id,
            complete: !todo.complete
          },
          update : store => {
            // Read the data from our cache for this query.
            const data = store.readQuery({ query:TodosQuery });
            // Add our comment from the mutation to the end.
            data.todos = data.todos.map(x => x.id === todo.id ? ({...todo, complete: !todo.complete}) : x)
            // Write our data back to the cache.
            store.writeQuery({ query: TodosQuery, data});
          }
        })
      


//declare the state of each element
state = {
    complete: !todo.complete
};

//when new text are typed into the the text form, set new text
handleChange = e => {
    this.setState({
    complete: !todo.complete
    })
};

//when enter key is pressed, then submit 
onClick = e => {
    if (e.onClick) {
        this.props.updateTodo(this.state.complete);
    }
};
};
//form rendering part

render() {
    const {
            data: {loading, todos}
          } = this.props;
          if (loading){
            return null;
    }
      return (
              <List >
                {todos.map(todo => (
                  <ListItem key={todo.id} role={undefined} dense button >
                  <Checkbox onClick={() => this.updateTodo(todo)} onChange = {}/>
                  </ListItem>
                ))}
              </List>
        
        );
      }
      }
    
export default compose(graphql(UpdateMutation, {name: 'updateTodo'}),graphql(TodosQuery))(CheckBox);