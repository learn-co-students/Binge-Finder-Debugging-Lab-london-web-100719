import React, { Component } from "react";
import Episode from "../Components/Episode";

class SelectedShowContainer extends Component {
  mapSeasons = () => {
    if (!!this.props.episodes) {
      let seasons = this.props.episodes.map(e => e.season).unique();

      return seasons.map(s => {
        return (
          <option value={s} key={s}>
            Season {s}
          </option>
        );
      });
    }
  };

  mapEpisodes = () => {
    return this.props.episodes.map(e => {
      if (e.season === this.props.selectedSeason) {
        return <Episode eachEpisode={e} key={e.id} />;
      }
      return null;
    });
  };

  render() {
    const { selectedShow } = this.props;

    return (
      <div style={{ position: "static" }}>
        <h2>{selectedShow.name}</h2>
        <img src={selectedShow.image.medium} alt="" />
        <p dangerouslySetInnerHTML={{ __html: selectedShow.summary }}></p>
        <p>Premiered: {selectedShow.premiered}</p>
        <p>Status: {selectedShow.status}</p>
        <p>Average Rating: {selectedShow.rating.average}</p>
        <select
          value={this.props.selectedSeason}
          style={{ display: "block" }}
          onChange={event => this.props.selectionChange(event.target.value)}
        >
          {this.mapSeasons()}
        </select>
        {this.mapEpisodes()}
      </div>
    );
  }
}

export default SelectedShowContainer;

Array.prototype.unique = function() {
  var arr = [];
  for (var i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
