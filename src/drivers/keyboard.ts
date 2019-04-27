
import { IGame } from "../stores/game"

export class KeyboardDriver {

    game: IGame;

    constructor(game: IGame) {
      this.game = game;
      window.addEventListener("keydown", this.handle_key_down)
    }

    handle_key_down = (event) => {

      switch(event.code) {

          case 'KeyA':
            this.game.do_paddle_one_up();
            break;

          case 'KeyZ':
            this.game.do_paddle_one_down();
            break;

          case 'Semicolon':
            this.game.do_paddle_two_up();
            break;

          case 'Period':
            this.game.do_paddle_two_down();
            break;

          default:
            console.log(`unhandlded key ${event.code}`);
      }

    }
}

