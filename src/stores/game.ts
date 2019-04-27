
import { observable, action } from "mobx"

export interface IGame {

  readonly COURT_WIDTH : number;
  readonly COURT_HEIGHT  : number;
  readonly WALL_WIDTH  : number;

  readonly PADDLE_HEIGHT  : number;
  readonly PADDLE_OFFSET  : number;

  ball_x: Array<number>;
  paddle_one_x: number;
  paddle_two_x: number;

  do_paddle_one_up() : void;
  do_paddle_one_down() : void;
  do_paddle_two_up() : void;
  do_paddle_two_down() : void;

}

export class Game implements IGame {

    readonly PADDLE_DELTAV = 0.1;
    readonly PADDLE_V_MAX = 2; 
    readonly BALL_DELTAV = 1.0;

    readonly COURT_WIDTH = 800;
    readonly COURT_HEIGHT = 600;
    readonly WALL_WIDTH = 10;

    readonly PADDLE_HEIGHT = 120;
    readonly PADDLE_OFFSET = 40;

    readonly PADDLE_DELTAX = 4;

    private timer = null;

    private readonly min_y = this.WALL_WIDTH;
    private readonly max_y = this.COURT_HEIGHT - this.WALL_WIDTH;

    @observable ball_x = [this.COURT_WIDTH/2.0, this.COURT_HEIGHT/2.0];
    @observable ball_v = [1.0, 1.0];

    @observable paddle_one_x = this.COURT_HEIGHT/2.0;
    @observable paddle_one_v = 0.0;

    @observable paddle_two_x = this.COURT_HEIGHT/2.0;
    @observable paddle_two_v = 0.0;

    @observable score_one = 0;
    @observable score_two = 0;

    @action
    do_paddle_one_up() { 
      if (this.paddle_one_v > -this.PADDLE_V_MAX) {
        this.paddle_one_v -= this.PADDLE_DELTAV; 
      }
    }

    @action
    do_paddle_one_down() { 
      if (this.paddle_one_v < this.PADDLE_V_MAX) {
        this.paddle_one_v += this.PADDLE_DELTAV; 
      }
    }

    @action
    do_paddle_two_up() {
      if (this.paddle_two_v > -this.PADDLE_V_MAX) {
        this.paddle_two_v -= this.PADDLE_DELTAV; 
      }
    }

    @action
    do_paddle_two_down() {
      if (this.paddle_two_v < this.PADDLE_V_MAX) {
        this.paddle_two_v += this.PADDLE_DELTAV; 
      }
    }

    @action
    do_step = () => { 

      // move the paddles
      console.log(this.COURT_HEIGHT - this.PADDLE_HEIGHT/2.0);

      if (this.paddle_one_v > 0.0 && this.paddle_one_x < this.COURT_HEIGHT) {
        this.paddle_one_x += this.paddle_one_v;
      }

      if (this.paddle_one_v < 0.0 && this.paddle_one_x > 0.0) {
        this.paddle_one_x += this.paddle_one_v;
      }

      if (this.paddle_two_v > 0.0 && this.paddle_two_x < this.COURT_HEIGHT) {
        this.paddle_two_x += this.paddle_two_v;
      }

      if (this.paddle_two_v < 0.0 && this.paddle_two_x > 0.0) {
        this.paddle_two_x += this.paddle_two_v;
      }
            
      // move the ball
      this.ball_x[0] += this.ball_v[0];
      this.ball_x[1] += this.ball_v[1];
      
      // bounce off left paddle?
      const paddle_one_y_min = this.paddle_one_x - this.PADDLE_HEIGHT/2.0;
      const paddle_one_y_max = this.paddle_one_x + this.PADDLE_HEIGHT/2.0;
      const paddle_one_x_max = this.PADDLE_OFFSET + this.WALL_WIDTH/2.0;
      const paddle_one_x_min = this.PADDLE_OFFSET - this.WALL_WIDTH/2.0;

      if (this.ball_v[0] < 0.0 &&
          this.ball_x[1] >= paddle_one_y_min &&
          this.ball_x[1] <= paddle_one_y_max &&
          this.ball_x[0] >= paddle_one_x_min &&
          this.ball_x[0] <= paddle_one_x_max) {
            this.ball_v[0] *= -1;
      }

      // bounce off right paddle?
      const paddle_two_y_min = this.paddle_two_x - this.PADDLE_HEIGHT/2.0;
      const paddle_two_y_max = this.paddle_two_x + this.PADDLE_HEIGHT/2.0;
      const paddle_two_x_max =
        this.COURT_WIDTH - (this.PADDLE_OFFSET - this.WALL_WIDTH/2.0);
      const paddle_two_x_min =
        this.COURT_WIDTH - (this.PADDLE_OFFSET + this.WALL_WIDTH/2.0);

      if (this.ball_v[0] > 0.0 &&
          this.ball_x[1] >= paddle_two_y_min &&
          this.ball_x[1] <= paddle_two_y_max &&
          this.ball_x[0] >= paddle_two_x_min &&
          this.ball_x[0] <= paddle_two_x_max) {
            this.ball_v[0] *= -1;
      }

      // bounce off top/bottom?
      if (this.ball_x[1] <= this.min_y) this.ball_v[1] *= -1;
      if (this.ball_x[1] >= this.max_y) this.ball_v[1] *= -1;

      // bounce of horizontal ends
      if (this.ball_x[0] >= this.COURT_WIDTH) this.ball_v[0] *= -1;
      if (this.ball_x[0] <= 0) this.ball_v[0] *= -1;
    }

    @action
    start() {
      this.timer = setInterval(this.do_step, 10);
    }

    @action
    stop() {
      this.timer.cancel();
    }



}

