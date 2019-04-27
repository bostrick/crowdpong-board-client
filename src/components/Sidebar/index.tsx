import * as React from 'react';
import {observer, inject} from 'mobx-react';
import {InfoPanel} from '../InfoPanel';

import "./style.css";

@observer
export class Sidebar extends React.Component<{}, {}> {

  render() {
    return <div className="sidebar">
      <figure className="w-100 figure">
        <img className="w-100" src="img/controller_url.png"/>
      </figure>
      <InfoPanel />
    </div>;
  }

}
