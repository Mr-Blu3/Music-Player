import * as React from "react";
import * as style from "./style.css";

namespace Footer {
    export interface Props {
    }
    export interface State {
    }
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class FooterComponent extends React.Component<Footer.Props, Footer.State> {

  constructor(props) {super(props);}

  render()
  {
    return (
      <div className={style.footer}>
        <p> &copy; 2017 Pontus Pettersson </p>
      </div>
    );
  }
}
