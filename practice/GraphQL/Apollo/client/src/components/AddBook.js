import React, { Component } from "react";
import { gql } from "apollo-boost";
import { graphql } from "react-apollo";

const getAuthorsQuery = gql`
  {
    authors {
      name
      id
    }
  }
`;

class AddBook extends Component {
  displayAuthors() {
    const data = this.props.data;

    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    }

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  }

  render() {
    return (
      <form id="add-book">
        <div className="field">
          <label>
            Book name:
            <input type="text" />
          </label>
        </div>

        <div className="field">
          <label>
            Genre:
            <input type="text" />
          </label>
        </div>

        <div className="field">
          <label>
            Author:
            <select>
              <option>Select author</option>
              {this.displayAuthors()}
            </select>
          </label>
        </div>

        <button>+</button>
      </form>
    );
  }
}

export default graphql(getAuthorsQuery)(AddBook);