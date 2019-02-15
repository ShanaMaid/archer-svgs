
import { Component } from 'react';
import * as React from 'react';
import Archer from '../Archer';
import './index.css'

export interface IIconProps {
  /**
   * 图标名称
   */
  type?: string;
  /**
   * 图标svg
   */
  svg?: string;
}

export interface IIconState {
  svgHtml: string;
}

const archer = new Archer();

class Icon extends Component<IIconProps, IIconState> {
  static archer = archer;
  state = {
    svgHtml: ''
  };

  async componentDidMount() {
    const  { type } = this.props;
    if (type) {
      const svg = await archer.downloadSvg(type);
      this.setState({
        svgHtml: svg,
      });
    }
  }

  async componentWillReceiveProps(props: IIconProps) {
    if (props.type && props.type !== this.props.type) {
      const svg = await archer.downloadSvg(props.type);
      this.setState({
        svgHtml: svg,
      });
    }
  }

  render() {
    return (
      <i
        className="archer-icon"
        dangerouslySetInnerHTML={{__html: this.props.svg || this.state.svgHtml}}
      />
    );
  }
}

export default Icon;
