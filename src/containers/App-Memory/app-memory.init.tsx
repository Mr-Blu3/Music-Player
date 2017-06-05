import * as React from "react";
import {RouteComponentProps} from "react-router";
import { HeaderComponent, BodyComponent, FooterComponent } from '../../components';
import * as style from './style.css';

export namespace AppMemory {
  export interface Props extends RouteComponentProps<void> {}
  export interface State {resetAllCards?: boolean; clearedGames?: number}
}

export class AppMemoryInit extends React.Component<AppMemory.Props, AppMemory.State>{

  headerScores;

  constructor(props)
  {
    super(props);
    this.state = {
      resetAllCards: false,
      clearedGames: 0
    };

    this.handleFooterClick = this.handleFooterClick.bind(this);
  }

  private handleFooterClick()
  {
    this.setState({resetAllCards: true});
  }

  private handleClearedGame(clearedGames: number)
  {
    this.setState({clearedGames: clearedGames});
  }

  private scores(scores: number)
  {
    this.headerScores.headerScoresChild(scores)
  }

  private miss(miss: number)
  {
    this.headerScores.headerMiss(miss);
  }

  public render()
  {
    return (
      <div className={style.normal}>
        <HeaderComponent ref={ref => (this.headerScores = ref)} clearedGames={this.state.clearedGames}></HeaderComponent>
        <BodyComponent miss={this.miss.bind(this)} scores={this.scores.bind(this)} clearedGame={this.handleClearedGame.bind(this)} resetGame={this.state.resetAllCards}></BodyComponent>
        <FooterComponent triggerClickReset={this.handleFooterClick}></FooterComponent>
      </div>
    );
  }
}




