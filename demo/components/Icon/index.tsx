
import { Component } from 'react';
import * as React from 'react';
import Archer from '../../../src/Archer';
import './index.css'

export interface IIconProps {
  /**
   * 图标名称
   */
  type: string;
}

export interface IIconState {
  svgHtml: string;
}

class Icon extends Component<IIconProps, IIconState> {
  state = {
    svgHtml: ''
  };

  async componentDidMount() {
    const svg = await Archer.downloadSvg(this.props.type);
    this.setState({
      svgHtml: svg,
    });
  }

  async componentWillReceiveProps(props: IIconProps) {
    if (props.type !== this.props.type) {
      const svg = await Archer.downloadSvg(props.type);
      this.setState({
        svgHtml: svg,
      });
    }
  }

  render() {
    return (
      <i
        className="archer-icon"
        dangerouslySetInnerHTML={{__html: this.state.svgHtml}}
      />
    );
  }
}

export default Icon;
