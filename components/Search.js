import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import { ApolloConsumer } from "@apollo/react-common";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import SearchResult from "./SearchResult";
import { SearchStyles, DropdownStyles } from "./styles/SearchStyles";

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(
      where: {
        OR: [
          { title_contains: $searchTerm }
          { description_contains: $searchTerm }
        ]
      }
    ) {
      id
      title
      description
      price
      image
    }
  }
`;

class Search extends Component {
  state = {
    loading: false,
    items: []
  };

  onChange = debounce(async (e, client) => {
    // Set state to loading
    this.setState({
      loading: true
    });
    // Query items based on search terms
    const res = await client.query({
      query: SEARCH_ITEMS_QUERY, // This seems like where I can make this modular!
      variables: { searchTerm: e.target.value }
    });
    // Set state to clear loading and add items
    this.setState({
      loading: false,
      items: res.data.items
    });
  }, 350);

  render() {
    resetIdCounter();
    return (
      <ApolloConsumer>
        {client => {
          return (
            <Downshift
              onChange={this.props.onChange}
              itemToString={item => (item === null ? "" : item.title)}
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
                <SearchStyles>
                  <label {...getLabelProps()}>Search for an item: </label>
                  <div
                    style={{ display: "inline-block" }}
                    {...getRootProps({}, { suppressRefError: true })}
                  >
                    <input
                      {...getInputProps({
                        type: "search",
                        id: "search",
                        className: this.state.loading ? "loading" : "",
                        placeholder: "Search for an item",
                        onChange: e => {
                          e.persist();
                          this.onChange(e, client);
                        }
                      })}
                    />
                  </div>
                  <DropdownStyles {...getMenuProps()}>
                    {isOpen && inputValue ? (
                      this.state.items.map((item, index) => (
                        <SearchResult {...getItemProps({
                          key: item.id,
                          index,
                          item,
                        })} 
                          image={item.image}
                          price={item.price}
                          description={item.description}
                          title={item.title}
                          highlighted={highlightedIndex === index}
                        />  
                      ))
                    ) : null}
                    {isOpen && inputValue && !this.state.items.length && !this.state.loading && (
                      <SearchResult {...getItemProps({ item: null})} noItem title={`No items found for search term "${inputValue}"`}/>
                    )}
                  </DropdownStyles>
                </SearchStyles>
              )}
            </Downshift>
          );
        }}
      </ApolloConsumer>
    );
  }
}

export default Search;
