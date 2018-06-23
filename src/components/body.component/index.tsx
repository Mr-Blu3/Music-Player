import * as React from "react";
import * as style from './style.css';

namespace AppHeader {
    export interface Props {getGallery: any, getPlayList}

    export interface State {playing,playingUrl,audio}
}

export class BodyComponent extends React.Component<AppHeader.Props, AppHeader.State> {

  constructor(props)
  {
    super(props);
    console.log(this.props.getGallery[0].name)
    this.state = {
      playingUrl: '',
      audio: null,
      playing: false,
    }
  }

  private set(val, oPlayMusic) : void {
    oPlayMusic.play();
    this.setState({
      playing: true,
      playingUrl: val,
      audio: oPlayMusic,
    })
  }

  private playMusic(val) : void
  {
    let oPlayMusic = new Audio(val);

    if(!this.state.playing) {
      this.set(val, oPlayMusic);
      return;
    }

    (this.state.playingUrl === val) ? this.setState({playing: false}) : this.set(val, oPlayMusic);

    this.state.audio.pause();
  }

  render() {
    return (
      <div>
        <div className={style.profile}>
          <div>
            <img className={style.galler_} src={this.props.getGallery[0].images[0].url} />
          </div>
          <div>
            <label> Name: {this.props.getGallery[0].name}</label><br />
            <label> Followers: { this.props.getGallery[0].followers.total }</label><br />
            <label> Genres: { this.props.getGallery[0].genres[0] }</label><br />
            <label> Popularity: { this.props.getGallery[0].popularity }</label>
          </div>
        </div>
        <hr />
        <div className={style.playList}>
          <h2>Top Rated Tracks</h2>
          {this.props.getPlayList.tracks.map((data, k) => {
              if(k > 0) {
              return (
                <div className={style.wrap_song} key={k}>
                  <div onClick={() =>  this.playMusic(data.preview_url)}>
                    <img className={style.song} src={data.album.images[0].url} /><br />

                    <img
                      className={style.playPause + ' ' + (this.state.playingUrl === data.preview_url && this.state.playing ? style.fadeShow : style.fadeRemove)}
                      src={"./../../images/pause.png"} />
                    <img
                      className={style.playPause + ' ' + (this.state.playingUrl === data.preview_url && !this.state.playing ? style.fadeShow : style.fadeRemove)}
                      src={"./../../images/play.png"} />
                  </div>
                </div>
              )}
            })
          }
        </div>
        </div>
    );
  }
}
