import React, {Component} from 'react';
import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import { convertToCoordinates } from './GeoLocation.js'
import { API_KEY } from '../helpers/config.js'

const mapStyles = {//sets map size
    width: '100%',
    height: '100%',
}

class MapContainer extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        latLng: {//coordinates for map center and marker placement
          lat: 30,
          lng: -90
        },
      }
    }

    componentDidMount() {
      const { address } = this.props;//sets map center and marker on load
        if(address){
            convertToCoordinates(address)
            .then(response => {
                this.setState({
                    latLng: response.data.results[0].geometry.location,
                })
                console.log(this.state.latLng)
            })
            .catch(err => console.error(err))
      }  
    }
  
    render() {
      const { latLng } = this.state;

      return (

          <Map
            google={this.props.google}
            zoom={15}
            style={mapStyles}
            center={latLng}
          >
            <Marker position={latLng} />
          </Map>
      );
    }
  }

  export default GoogleApiWrapper({
    apiKey: API_KEY
  })(MapContainer);