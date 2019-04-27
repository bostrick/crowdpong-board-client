import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {IGame} from '../../stores/game';

import "./style.css";

@inject("game")
@observer
export class Board extends React.Component<{game? : IGame}, {}> {

  render() {
    const game = this.props.game;
    return <div className="board">
      <svg id="board" version="1.1" 
        width={game.COURT_WIDTH} height={game.COURT_HEIGHT}>

          <rect className="floor" x="0" y="0" width="100%" height="100%" />

          <rect className="wall" x="0" y="0" width="100%" height="10px" />

          <rect className="wall" width="100%" height="10px"
                  x="0" y={game.COURT_HEIGHT-game.WALL_WIDTH} />

          <line className="wall"
              x1={game.COURT_WIDTH/2} y1="0"
              x2={game.COURT_WIDTH/2} y2={game.COURT_HEIGHT}
              strokeDasharray="20" strokeDashoffset="10" 
              strokeWidth={game.WALL_WIDTH} />

          <rect className="paddle"
            width={game.WALL_WIDTH}
            height={game.PADDLE_HEIGHT}
            x={game.PADDLE_OFFSET-game.WALL_WIDTH/2.0}
            y={game.paddle_one_x-game.PADDLE_HEIGHT/2.0} />

          <rect className="paddle"
            width={game.WALL_WIDTH}
            height={game.PADDLE_HEIGHT}
            x={game.COURT_WIDTH-game.PADDLE_OFFSET-game.WALL_WIDTH/2.0}
            y={game.paddle_two_x-game.PADDLE_HEIGHT/2.0} />
                  
          <rect className="ball"
            width={game.WALL_WIDTH}
            height={game.WALL_WIDTH}
            x={game.ball_x[0]-game.WALL_WIDTH/2.0}
            y={game.ball_x[1]-game.WALL_WIDTH/2.0}
          />

        </svg>
      {JSON.stringify(game)}

    </div>;
  }

}
