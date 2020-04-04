import React, { Component } from "react";
import Downshift, { resetIdCounter } from "downshift";
import { ApolloConsumer } from "@apollo/react-common";
import { gql } from "apollo-boost";
import debounce from "lodash.debounce";
import SearchResult from "./SearchResult";
import { SearchStyles, DropdownStyles } from "./styles/SearchStyles";

const SEARCH_RECIPES_QUERY = gql`
  query SEARCH_RECIPES_QUERY($searchTerm: String!) {
    recipes(
      where: {
        OR: [
          { title_contains: $searchTerm },
          { description_contains: $searchTerm },
          { instructions_contains: $searchTerm }
        ]
      }
    ) {
      id
      title
      image
    }
  }
`;

class RecipeSearch extends Component {
  state = {
    loading: false,
    recipes: []
  };

  onChange = debounce(async (e, client) => {
    // Set state to loading
    this.setState({
      loading: true
    });
    // Query recipes based on search terms
    const res = await client.query({
      query: SEARCH_RECIPES_QUERY,
      variables: { searchTerm: e.target.value }
    });
    // Set state to clear loading and add items
    this.setState({
      loading: false,
      recipes: res.data.recipes
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
                  <label {...getLabelProps()}>Search for a recipe: </label>
                  <div
                    style={{ display: "inline-block" }}
                    {...getRootProps({}, { suppressRefError: true })}
                  >
                    <input
                      {...getInputProps({
                        type: "search",
                        id: "search",
                        className: this.state.loading ? "loading" : "",
                        placeholder: "Search for a recipe",
                        onChange: e => {
                          e.persist();
                          this.onChange(e, client);
                        }
                      })}
                    />
                  </div>
                  <DropdownStyles {...getMenuProps()}>
                    {isOpen && inputValue ? (
                      this.state.recipes.map((recipe, index) => (
                        <SearchResult {...getItemProps({
                          key: recipe.id,
                          index,
                          item: recipe,
                        })} 
                          image={recipe.image}
                          title={recipe.title}
                          highlighted={highlightedIndex === index}
                        />  
                      ))
                    ) : null}
                    {isOpen && inputValue && !this.state.items.length && !this.state.loading && (
                      <SearchResult {...getItemProps({ item: null})} noItem title={`No recipes found for search term "${inputValue}"`}/>
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

export default RecipeSearch;
