import * as React from 'react';
import iconName from '../utils/icon';
import Icon from '../../src/react/';
import { Input, Button, Progress, Select } from 'yoshino';
import './app.css';
export interface IAppProps {
}

const svgTarget = 'https://unpkg.com/ionicons@4.4.2/dist/ionicons/svg/';

const config: {[index: string]: string} = {};
iconName.forEach((i) => {
  config[i] = `${svgTarget}${i}.svg`;
})
Icon.archer.set(config);
Icon.archer.setThreadNum(100);
export default class IApp extends React.Component<IAppProps, any> {
  getPercent = () => Math.round(((iconName.length - Icon.archer.prefetchQueue.length) / iconName.length) * 100);

  state = {
    url: 'https://raw.githubusercontent.com/ShanaMaid/archer-svgs/master/demo/static/music.svg',
    svg: '',
    percent: this.getPercent(),
    prefetchLoading: false,
    type: iconName[0],
    show: false,
  };


  componentDidMount() {
    this.download();
  }

  download = async () => {
    const svg = await Icon.archer.fetchSvg(this.state.url);
    this.setState({svg});
  }

  prefetch = async () => {
    if (this.state.prefetchLoading) {
      return;
    }
    this.setState({
      prefetchLoading: true,
    });
    const handle = setInterval(() => {
      this.setState({percent: this.getPercent()});
      this.forceUpdate();
    }, 500);
    await Icon.archer.startPreFetch();
    clearInterval(handle);
    this.setState({
      prefetchLoading: false,
      percent: this.getPercent(),
    });
  }


  public render() {
    const {
      url, percent, prefetchLoading,
      type, svg, show,
    } = this.state;
    return (
      <div className="body">
        <div className="module">
          <h3>通过url下载单个svg图标</h3>
          <div className="single-icon">
            <Input value={url} onChange={(v) => this.setState({url: v})}/>
            <Button type="primary" onClick={this.download}>下载</Button>
            <div>
              <Icon svg={svg}/>
            </div>
          </div>
        </div>
        <div className="module">
          <h3>通过iconName下载单个svg图标</h3>
          <div className="single-icon">
            <Select value={type} onChange={(v) => this.setState({type: v})}>
              {
                iconName.map((icon, key) => {
                  return (
                    <Select.Option
                      value={icon}
                      key={key}
                    >
                      {icon}
                    </Select.Option>
                  )
                })
              }
            </Select>
            <Icon type={type}/>
          </div>
        </div>
        <div className="module">
          <h3>预加载(共{iconName.length + 1}个图标)</h3>
          <div className="prefetch">
            <Button type="primary" onClick={this.prefetch} loading={prefetchLoading}>开启预加载</Button>
            <div>
              <Progress percent={percent}/>
            </div>
          </div>
        </div>
        <div className="module">
          <h3>展示所有图标</h3>
          <div className="prefetch">
            {
              show ? (
                <div>
                  {
                    iconName.map((icon, key) => {
                      return (
                        <Icon type={icon} key={key}/>
                      );
                    })
                  }
                </div>
              ) : (
                <div className="notice" onClick={() => this.setState({show: true})}>点击展示所有图标</div>
              )
            }
              
          </div>
        </div>
      </div>
    );
  }
}
