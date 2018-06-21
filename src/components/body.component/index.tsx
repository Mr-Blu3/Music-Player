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
        //ToDO: Take out profile of artist and style it
        <div id={"profile"}>
          {this.props.getGallery[0].name}
          {this.props.getGallery[0].images.map(data => data.url)}
        </div>

        <div id={'playList'}>
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
