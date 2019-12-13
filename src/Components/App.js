import React, { Component } from "react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";
import { Grid } from "semantic-ui-react";

class App extends Component {
  state = {
    shows: [],
    searchTerm: "",
    selectedShow: "",
    episodes: [],
    filterByRating: ""
  };

  componentDidMount = () => {
    const adapter = new Adapter();
    adapter.getShows().then(shows => this.setState({ shows }));
  };

  componentDidUpdate = () => {
    window.scrollTo(0, 0);
  };

  handleSearch = e => {
    this.setState({ searchTerm: e.target.value.toLowerCase() });
  };

  handleFilter = e => {
    e.target.value === "No Filter"
      ? this.setState({ filterByRating: "" })
      : this.setState({ filterByRating: e.target.value });
  };

  selectShow = show => {
    const adapter = new Adapter();
    adapter.getShowEpisodes(show.id).then(episodes =>
      this.setState({
        selectedShow: show,
        episodes: episodes
      })
    );
  };

  displayShows = () => {
    let shows = [...this.state.shows];
    // if (this.state.filterByRating) {
    //   return this.state.shows.filter(s => {
    //     return s.rating.average >= this.state.filterByRating;
    //   });
    // } else {
    //   return this.state.shows;
    // }
    if (this.state.filterByRating) {
      shows = shows.filter(s => s.rating.average >= this.state.filterByRating);
    }
    if (this.state.searchTerm) {
      shows = shows.filter(s =>
        s.name.toLowerCase().includes(this.state.searchTerm.toLowerCase())
      );
    }
    return shows;
  };

  render() {
    return (
      <div>
        <Nav
          handleFilter={this.handleFilter}
          handleSearch={this.handleSearch}
          searchTerm={this.state.searchTerm}
        />
        <Grid celled>
          <Grid.Column width={5}>
            {!!this.state.selectedShow ? (
              <SelectedShowContainer
                selectedShow={this.state.selectedShow}
                episodes={this.state.episodes}
              />
            ) : (
              <div />
            )}
          </Grid.Column>
          <Grid.Column width={11}>
            <TVShowList
              shows={this.displayShows()}
              selectShow={this.selectShow}
              searchTerm={this.state.searchTerm}
            />
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default App;
