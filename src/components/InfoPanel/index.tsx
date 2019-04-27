import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {IGame} from '../../stores/game';

import "./style.css";

@inject("game")
@observer
export class InfoPanel extends React.Component<{game? : IGame}, {}> {

  render() {
    const game = this.props.game;
    return <div className="card">
      <div className="card-body">
        <ul className="list-group">
          <li className="list-group-item">
            blue v: {game.paddle_one_v}
          </li>
          <li className="list-group-item">
            red  v: {game.paddle_two_v}
          </li>
          <li className="list-group-item">
            max  v: {game.paddle_max_v}
          </li>
          <li className="list-group-item">
            delta v: {game.paddle_delta_v}
          </li>
        </ul>
      </div>
    </div>
  }

}
