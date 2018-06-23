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
      playList: {tracks: [{preview_url: '', album: {images: ['']}}], followers: ""}
    }
  }


  onUpdate = (val) => {
    this.getInfo(val);
  };

  private getInfo(val)
  {
    let sArtist = 'q='+ val + '&type=artist';
    let sFetchUrl = 'https://api.spotify.com/v1/search?' + sArtist + '&type=artist&limit=1';
    let sTokenAuth = 'BQAMjLoxoci9aZJ6MjUEODKsNmHY4GzwEsS4BC3kC_VGDLBWV-U15kGnmFmCwVq2lDwfDjbZ3Gb4Krx3v54CQEsX94W8IBm7X4WVlcH9fTwLSEALcyg7pgkHbFCyRn9gOR2nAccaorxzw_P8oZ4qf66CAz5nZw&refresh_token=AQAA1vbr7kKe2WVPdWBOeHSN7UXqx6m8Sf1gaJpdpy7Xeyvv259U4zk4RuwEGx8vjcmOA6gXR7-scZtP0TDXeVF6qHgO8Jts27P383Fj_V0yEsVquriIgPpvlyXxG4VP_gc';
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
    let body;
    body = (this.state.playList.tracks[0].preview_url != "")
      ? <BodyComponent getPlayList={this.state.playList} getGallery={this.state.gallery}></BodyComponent>
      : <p className={style.center}>You need to set token and search for artist</p>

    return (
      <div className={style.normal}>
        <HeaderComponent onUpdate={this.onUpdate}></HeaderComponent>
        {body}
        <FooterComponent></FooterComponent>
      </div>
    );
  }
}




