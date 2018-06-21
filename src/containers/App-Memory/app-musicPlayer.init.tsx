import * as React from "react";
import {RouteComponentProps} from "react-router";
import { HeaderComponent, BodyComponent, FooterComponent } from '../../components';
import * as style from './style.css';

export namespace AppMusicPlayer {
  export interface Props extends RouteComponentProps<void> {
    query?: string;
    fieldValFromChild?: any;
  }
  export interface State {
    fieldValFromChild?: any;
    gallery: any,
    playList: any
  }
}

export class AppMusicPlayerInit extends React.Component<AppMusicPlayer.Props, AppMusicPlayer.State>{

  constructor(props)
  {
    super(props);
    this.onUpdate = this.onUpdate.bind(this)
    this.state = {
      fieldValFromChild: null,
      gallery: [{name: '', images: ['']}],
      playList: {tracks: [{preview_url: '', album: {images: ['']}}]}
    }
  }


  onUpdate = (val) => {
    this.getInfo(val);
  };

  private getInfo(val)
  {
    let sArtist = 'q='+ val + '&type=artist';
    let sFetchUrl = 'https://api.spotify.com/v1/search?' + sArtist + '&type=artist&limit=1';
    let sTokenAuth = 'BQBXaHvfPoAphP9cEu3i8JSjlSbNmH8jq-21YEks5754hOVJjK78NNi5NALcKKSiT6pQzuiceTJ9yC3M_KqPX14Thvy4t2964S02xp0Ojb-p9cTrD5ZnDMAjQ1PUElja_6OZXa20vCzHQyJzyzHR5_WHdH2YHA';
    let ALBUM_URL = 'https://api.spotify.com/v1/artists/';
    let myOptions : RequestInit  = {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + sTokenAuth,
        'content-type': 'application/json'
      },
      mode: "cors",
      cache: "default"
    };

    fetch(sFetchUrl, myOptions).then(response => response.json()).then(json => {

      let getPlayList = `${ALBUM_URL}${json.artists.items[0].id}/top-tracks?country=US&`
      fetch(getPlayList, myOptions).then(resp => resp.json()).then(json => {
        this.setState({playList: json})
      })
      this.setState({gallery: json.artists.items});
    }).catch(err => console.warn(err));
  }


  public render()
  {
    return (
      <div className={style.normal}>
        <HeaderComponent onUpdate={this.onUpdate}></HeaderComponent>
        <BodyComponent getPlayList={this.state.playList} getGallery={this.state.gallery}></BodyComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  }
}




