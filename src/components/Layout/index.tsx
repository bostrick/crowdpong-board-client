import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {Board} from '../Board';
import {Sidebar} from '../Sidebar';

import "./style.css";

@observer
export class Layout extends React.Component<{}, {}> {

  render() {
    return <div className="row">
      <div className="col-md-9">
        <Board/>
      </div>
      <div className="col-md-3">
        <Sidebar/>
      </div>
    </div>;
  }

}
