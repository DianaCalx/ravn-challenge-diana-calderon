import { gql } from '@apollo/client';

export const createTask = gql`
  mutation createTask($task: CreateTaskInput!) {
    createTask(input: $task) {
      id
    }
  }
`;

export const updateTask = gql`
  mutation updateTask($task: UpdateTaskInput!) {
    updateTask(input: $task) {
      id
    }
  }
`;

export const deleteTask = gql`
  mutation deleteTask($task: DeleteTaskInput!) {
    deleteTask(input: $task) {
      id
    }
  }
`;
