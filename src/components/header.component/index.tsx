import * as React from "react";
import * as style from "./style.css";
namespace AppHeader {
  export interface Props {clearedGames: number}
  export interface State {scores: number; miss: number}
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class HeaderComponent extends React.Component<AppHeader.Props, AppHeader.State> {

  constructor() {
    super();
    this.state = {scores: 0, miss: 0}
  }

  headerScoresChild(scores)
  {
    this.setState({scores: scores})
  }

  headerMiss(miss)
  {
    this.setState({miss: miss})
  }

  render() {
        return (
          <div className={style.header}>
            <p className={style.right}>Scores ({this.state.scores})</p>
            <p className={this.state.miss < 0 ? style.right +' '+ style.red: style.right}>Missed: ({this.state.miss})</p>
            <p className={style.left}>Game Played ({this.props.clearedGames})</p>
          </div>
        );
    }
}
