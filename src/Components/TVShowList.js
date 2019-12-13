import React, { Component } from 'react';
import {Grid} from 'semantic-ui-react';
import TVShow from './TVShow'
class TVShowList extends Component {

  mapAllShows = () => {
	  if (!!this.props.searchTerm){
		// console.clear()
      return this.props.shows.map((s) => {
        if (s.name.toLowerCase().includes(this.props.searchTerm)){
			// console.log(s)
		  return (<TVShow show={s} key={s.id} selectShow={this.props.selectShow} image={s.image}/> )
		} else {

			return null
		}
      })
    } else {

		return this.props.shows.map( (s)=> {

			// console.log('oof')
			return (<TVShow
				show={s}
				key={s.id}
				selectShow={this.props.selectShow}
				image={s.image}
			/>)
		})
	}
  }

  render() {
    return (
      <div className="TVShowList">
        <Grid>
          {this.mapAllShows()}
        </Grid>
      </div>
    )
  }

}

export default TVShowList;
