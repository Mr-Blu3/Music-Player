import * as React from "react";
import {RouteComponentProps} from "react-router";
import { HeaderComponent, BodyComponent, FooterComponent } from '../../components';
import * as style from './style.css';

export namespace AppMusicPlayer {
  export interface Props extends RouteComponentProps<void> {
    query?: string;
    fieldVal?: any;
  }
  export interface State {
    fieldVal?: any;
  }
}

export class AppMusicPlayerInit extends React.Component<AppMusicPlayer.Props, AppMusicPlayer.State>{

  constructor(props)
  {
    super(props);

    this.state = {
      fieldVal: null
    };
  }

  onUpdate = (val: any) => {
    console.log(val, 'GO')
    this.setState({
      fieldVal: val
    })
  };

  getInfo(val)
  {
    console.log(val,'asdas');
    /*let sArtist = 'q='+ this.props.query + '&type=artist';
    let sFetchUrl = 'https://api.spotify.com/v1/search?' + sArtist;
    let sTokenAuth = 'BQD7OtUNiYrcZQq1J8uGmPQSEKyj8Ck9Sb9DRPQBZKrzmeonhl86JLjngS90ueiweplIoLTKVkNLJQW95ktdSP8Yg5SutKmHKxDLBmy7Pr0PbNLoOaBKLMsZl5qnevKYwRu8UnbhZK4';

    let oOptions = {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer '+ sTokenAuth
      }),
    };
    fetch(sFetchUrl, oOptions).then(response => response.json()).then(json => {
      console.log(json)
    });*/
  }

  public render()
  {
    return (
      <div className={style.normal}>
        <HeaderComponent onUpdate={this.onUpdate}></HeaderComponent>
        <BodyComponent></BodyComponent>
        <FooterComponent></FooterComponent>
      </div>
    );
  }
}




