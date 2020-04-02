import React, { Component } from "react";
import { Query, Mutation } from "@apollo/react-components";
import { gql } from "apollo-boost";
import styled from "styled-components";
import PropTypes from "prop-types";
import Error from "./Error";
import Button from "./styles/Button";

const possiblePermissions = [
  "ADMIN",
  "USER",
  "ITEM_CREATE",
  "ITEM_UPDATE",
  "ITEM_DELETE",
  "PERMISSION_UPDATE"
];

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION($id: ID!, $permissions: [Permission]!) {
    updatePermissions(id: $id, permissions: $permissions) {
      id
      name
      permissions
    }
  }
`;

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  td, th {
    padding: 0.25rem;
    text-align: center;
    border-right: 1px solid ${props => props.theme.lightgrey};
  }
  tr > *:last-child {
    border-right: none;
  }
  tbody > tr {
    border-top: 1px solid ${props => props.theme.lightgrey}
  }
  label {
    padding: 0.5rem;
    display: block;
  }
`;

const Permissions = () => {
  return (
    <Query query={ALL_USERS_QUERY}>
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <Error error={error} />;
        // Need a header row
        return (
          <>
            <h1>User Permissions</h1>
            <StyledTable>
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  {possiblePermissions.map(permission => (
                    <th scope="col" key={permission}>
                      {permission}
                    </th>
                  ))}
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <UserTR user={user} key={user.id} />
                ))}
              </tbody>
            </StyledTable>
          </>
        );
      }}
    </Query>
  );
};

class UserTR extends Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      permissions: PropTypes.array
    }).isRequired
  };
  state = {
    permissions: this.props.user.permissions
  };
  handleChange = e => {
    const { checked, value } = e.target;
    let newPermissions = [...this.state.permissions];
    if (checked) {
      newPermissions.push(value);
    } else {
      newPermissions = newPermissions.filter(
        permission => permission !== value
      );
    }
    this.setState({
      permissions: newPermissions
    });
  };
  render() {
    const { id, name, email, permissions } = this.props.user;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{ id, permissions: this.state.permissions }}
      >
        {(updatePermissions, { loading, error, called }) => {
          return error ? (<tr><td colspan="8"><Error error={error} /></td></tr>) : (
            <tr>
              <th scope="row">{name}</th>
              <td>{email}</td>
              {possiblePermissions.map(permission => {
                return (
                  <td key={permission}>
                    <label htmlFor={`${name}-permission-${permission}`}>
                      <input
                        id={`${name}-permission-${permission}`}
                        type="checkbox"
                        value={permission}
                        onChange={this.handleChange}
                        checked={this.state.permissions.includes(permission)}
                      />
                    </label>
                  </td>
                );
              })}
              <td>
                <Button primary disabled={loading} onClick={updatePermissions}>Submit Changes</Button>
              </td>
            </tr>
          );
        }}
      </Mutation>
    );
  }
}

export default Permissions;
