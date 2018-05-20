import * as React from "react";
import * as style from "./style.css";
namespace AppHeader {
  export interface Props {
    value?: any;
    onUpdate?: any;
  }
  export interface State {
    fieldVal?: any;
  }
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class HeaderComponent extends React.Component<AppHeader.Props, AppHeader.State> {

  private bRemoveText: boolean;

  constructor(props) {
    super(props);
    this.state = {
      fieldVal: ''
    }
  }

  private search(e)
  {
    let sArtist = 'q='+ this.props.value + '&type=artist';
    let sFetchUrl = 'https://api.spotify.com/v1/search?' + sArtist;
    let sTokenAuth = 'BQD7OtUNiYrcZQq1J8uGmPQSEKyj8Ck9Sb9DRPQBZKrzmeonhl86JLjngS90ueiweplIoLTKVkNLJQW95ktdSP8Yg5SutKmHKxDLBmy7Pr0PbNLoOaBKLMsZl5qnevKYwRu8UnbhZK4';

    let oOptions = {
      method: 'GET',
      headers: new Headers({
        'Authorization': 'Bearer '+ sTokenAuth
      }),
    };
    fetch(sFetchUrl, oOptions).then(response => response.json()).then(json => {
      //console.log(json);
      return json;
    });

    //this.setState({query : ''});
  }

  update = (e) => {
    this.props.onUpdate(e.target.value);
    this.setState({fieldVal: e.target.value});
    if(this.bRemoveText) this.setState({fieldVal: ''});
  };

  render() {
        return (
          <div className={style.header}>
          <p>Spotify Music Player</p>
            <input
              type="text"
              placeholder="type here"
              onChange={this.update}
              value={this.state.fieldVal}
            />
          </div>
        );
    }
}
