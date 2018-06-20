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
    let sTokenAuth = 'BQAi1Vwq1M_Qn0V8Qt1sminkGlDUOdQizxLedsSgWyihmZvH6ljOuInlONBKSOaDH6wUpdk0y0d-5izPIOqgByBQZAE88RuWiTIBXNnjmGwc_EZthBDNG54MHA94jHww8Oz4w6IgThwaISciiqGnKX1Gbwyr8g&refresh_token=AQAz0QIf7AVKCdIAtGgxpQ0wThYht5c543u7kbCkZOg1iPZIpC4OkmzFkuORq8pRohpBB8fTDp-ZvMVLZUXV6PhmEIbfVSAagBKls6M2M0xKl2uaMyYSOKuZxni28pc6F6w';
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




