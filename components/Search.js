import React, { Component } from "react";
import styled from "styled-components";
import Downshift, { resetIdCounter } from "downshift";
import { ApolloConsumer } from "@apollo/react-common";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import Router from "next/router";

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: {
      OR: [
        { title_contains: $searchTerm },
        { description_contains: $searchTerm }
      ]
    }) {
      id
      title
      description
      price
      image
    }
  }
`;

function routeToItem(selectedItem) {
  Router.push({
    pathname: "/item",
    query: { id: selectedItem.id }
  })
}

class Search extends Component {
  state = {
    loading: false,
    items: []
  };

  onChange = debounce(async (e, client) => {
    // Set state to loading
    this.setState({
      loading: true
    })
    // Query items based on search terms
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value }
    });
    // Set state to clear loading and add items
    this.setState({
      loading: false,
      items: res.data.items
    })
  }, 350);

  render() {
    resetIdCounter();
    return (
      <ApolloConsumer>
        {(client) => {
          return (
            <Downshift
              onChange={routeToItem}
              itemToString={item => item === null ? "" : item.title}
            >
              {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem,
                getRootProps
              }) => (
                <div>
                  <label {...getLabelProps()}>Search for an item</label>
                  <div
                    style={{ display: "inline-block" }}
                    {...getRootProps({}, { suppressRefError: true })}
                  >
                    <input {...getInputProps({
                      type: "search",
                      id: "search",
                      className: this.state.loading ? "loading" : "",
                      placeholder: "Search for an item",
                      onChange: e => {
                        e.persist();
                        this.onChange(e, client);
                      }
                    })} />
                  </div>
                  <ul {...getMenuProps()}>
                    {isOpen && inputValue ? (
                      this.state.items.map((item, index) => (
                      <li
                        {...getItemProps({
                          key: item.id,
                          index,
                          item,
                          style: {
                            backgroundColor:
                            // TODO: In a custom component, use a custom highlight prop
                              highlightedIndex === index
                                ? "lightgray"
                                : "white",
                            fontWeight:
                              selectedItem === item ? "bold" : "normal"
                          }
                        })}
                      >
                        {item.title}
                      </li>
                    ))) : null}
                  </ul>
                </div>
              )}
            </Downshift>
          )
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
