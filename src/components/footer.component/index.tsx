import * as React from "react";
import * as style from "./style.css";

namespace Footer {
    export interface Props {
      triggerClickReset: () => any;
    }
    export interface State {
    }
}

// 'HelloProps' describes the shape of props.
// State is never set so we use the 'undefined' type.
export class FooterComponent extends React.Component<Footer.Props, Footer.State> {

  constructor(props) {
    super(props);

  }

  render()
  {
    const { triggerClickReset} = this.props;
    return (
      <div className={style.footer}>
        <p> &copy; 2017 Pontus Pettersson </p>
        <button onClick={triggerClickReset} type="button" className={'btn btn-secondary'}>Restart game</button>
      </div>
    );
  }
}
