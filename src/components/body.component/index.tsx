import * as React from "react";
import * as style from './style.css';

namespace AppHeader {
    export interface Props {}

    export interface State {}
}

export class BodyComponent extends React.Component<AppHeader.Props, AppHeader.State> {

  constructor()
  {
    super();
  }

  getMusic()
  {
    // Ta in Musiken from apiet och displaya den
  }

  playMusic()
  {
    // Spela musiken som dyker upp
  }

  topList()
  {
    // Filtrera bort allt förutom top listan
  }

  render() {
    return (
      <div className={style.body}>

      </div>
    );
  }
}
