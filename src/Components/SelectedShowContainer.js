import React, { Component } from 'react';
import Episode from './Episode';

class SelectedShowContainer extends Component {

	mapSeasons = () => {
		if (!!this.props.allEpisodes){
			// console.log(this.props.allEpisodes)
			let seasons = this.props.allEpisodes.map((e)=> e.season).unique()
			return (seasons.map((s) => {
				return (<option value={s} key={s}>Season {s}</option>)
		}));
		} else {
			return null
		}
	}

	mapEpisodes = () => {

		return this.props.allEpisodes.map( (e) => {
			if (e.season === parseInt(this.props.selectedSeason)){
				// console.log(e)
				return (<Episode eachEpisode={e} key={e.id}/>)
			} else {
				// console.log('oof')
				return null
			}
		})
	}


	render() {
		const selectedShow = this.props.selectedShow

		return (
		<div style={{position: "static"}}>
			<h2>{selectedShow.name}</h2>
			<img src={selectedShow.image.medium} alt=""/>
			<p dangerouslySetInnerHTML={{__html: selectedShow.summary}}></p>
			<p>Premiered: {selectedShow.premiered}</p>
			<p>Status: {selectedShow.status}</p>
			<p>Average Rating: {selectedShow.rating.average}</p>
			<select
				style={{display: 'block'}}
				onChange={(event) => this.props.handleSelectionChange(event.target.value)}
				value={this.props.selectedSeason}
			>
				{this.mapSeasons()}
			</select>
				{this.mapEpisodes()}
		</div>
		);
	}

}

export default SelectedShowContainer;

// eslint-disable-next-line
Array.prototype.unique = function() {
  var arr = [];
  for(var i = 0; i < this.length; i++) {
    if(!arr.includes(this[i])) {
        arr.push(this[i]);
    }
  }
  return arr;
  
}
