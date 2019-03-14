
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
  /**
   * 样式
   */
  style?: React.CSSProperties;
  /**
   * 附加额外的 class
   */
  className?: string;
  /**
   * 附加id
   */
  id?: string;

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
    const {
      type, svg, className, ...otherProps
    } = this.props;
    return (
      <i
        className={`archer-icon ${className || ''}`}
        dangerouslySetInnerHTML={{__html: this.props.svg || this.state.svgHtml}}
        {...otherProps}
      />
    );
  }
}

export default Icon;
