import { gql } from '@apollo/client';

export const getProfile = gql`
  query getProfile {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;

export const getUsers = gql`
  query getUsers {
    avatar
    fullName
    id
  }
`;

export const getTasks = gql`
  query getTasks($filters: FilterTaskInput!) {
    tasks(input: $filters) {
      assignee {
        avatar
        fullName
        id
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;
