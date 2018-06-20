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

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.submitHandler = this.submitHandler.bind(this);

    this.state = {
      fieldVal: ''
    }
  }

  submitHandler(evt) {
    evt.preventDefault();
    this.props.onUpdate(this.state.fieldVal);

    this.setState({
      fieldVal: ''
    })

  }

  update(e){
    this.setState({
      fieldVal: e.target.value
    });
  };

  render() {
        return (
          <div className={style.header}>
          <p>Spotify Music Player</p>
            <form onSubmit={this.submitHandler}>
            <input
               type="text"
               placeholder="type here"
               value={this.state.fieldVal}
               onChange={this.update}
              />
              <input type="submit" />
            </form>
          </div>
        );
    }
}
