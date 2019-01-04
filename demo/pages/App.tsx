import * as React from 'react';
import iconName from '../utils/icon';
import Archer, { IConfig } from '../../src/Archer';
import { Button, Input, Progress, Grid, Select } from 'yoshino';
import Icon from '../components/Icon';
import Locale, { languages, LANGUAGE } from '../utils/locale';
import './app.css';
export interface IAppProps {
}

const svgTarget = 'https://unpkg.com/ionicons@4.4.2/dist/ionicons/svg/';

const { Row, Col } = Grid;


export default class IApp extends React.Component<IAppProps, any> {
  cfg: IConfig = { svgs: {}};

  state = {
    loading: false,
    percent: 0,
    cacheCount: 10,
    loadingCount: 500,
    maxSize: 1024,
    singleSvg: iconName[0],
    language: 'en'  as LANGUAGE,
  };

  componentWillMount() {
    this.apply();
  }

  componentDidMount() {
    // 做一些检测工作
    setInterval(() => {
      const { loading } = this.state;
      if (loading !== Archer.isPrefetch) {
        this.setState({loading: !loading});
      }
      const len = Archer.prefetchQueue.length;
      const count = Object.keys(this.cfg.svgs).length;
      const percent = Math.ceil((count - len) / count * 100);
      this.setState({
        percent,
      });
    }, 100);

  }

  apply = () => {
    const cfg: IConfig = { svgs: {}};
    const { cacheCount, loadingCount, maxSize } = this.state;
    iconName.forEach((item, index) => {
      if (index >= loadingCount) {
        return;
      }
      cfg.svgs[item] =  {
        version: 1,
        url: `${svgTarget}${item}.svg`,
      }
    });

    this.cfg = cfg;

    Archer.init(cfg);
    Archer.setMax(cacheCount);
    Archer.setMaxSize(maxSize)
  }

  public render() {
    const {
      loading, percent, cacheCount,
      loadingCount, maxSize, singleSvg,
      language,
     } = this.state;
    const caches = Object.keys(Archer.getCache());
    return (
      <div className="body">
        <Select
          value={language}
          onChange={(v) => this.setState({language: v})}
        >
          {
            languages.map((l, i) => {
              return (
                <Select.Option value={l.value} key={i}>
                  {l.text}
                </Select.Option>
              )
            })
          }
        </Select>
        <h3>{Locale.action[language]}</h3>
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={() => {
            this.apply();
            Archer.startPreFetch();
          }}
        >
          {Locale.start[language]}
        </Button>
        <Button type="primary" size="large" onClick={Archer.clearSvgCache}>{Locale.clear[language]}</Button>
        <h3>{Locale.config[language]}</h3>
        <p>{Locale.summary[language]}: {iconName.length}</p>
        <Row>
          <Col span={10}>
            <p>
              <span>{Locale.maxSize[language]}:</span>
              <Input
                className="max-size" 
                value={maxSize}
                onChange={(v) => {
                  this.setState({maxSize: Number(v)})
                }}
              />
              <span>kb</span>
            </p>
          </Col>
          <Col span={10}>
            <p>
              <span>{Locale.loadingCount[language]}:</span>
              <Input
                className="max-size" 
                value={loadingCount}
                onChange={(v) => {
                  this.setState({loadingCount: Number(v)})
                }}
              />
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <p>
              <span>{Locale.cacheCount[language]}:</span>
              <Input
                className="max-size" 
                value={cacheCount}
                onChange={(v) => {
                  this.setState({cacheCount: Number(v)})
                }}
              />
            </p>
          </Col>
          <Col span={8}>
            <Button type="primary" size="large" onClick={this.apply}>{Locale.apply[language]}</Button>
          </Col>
        </Row>
        <h3>{Locale.downloadProgress[language]}</h3>
        <Progress percent={percent} diameter={90}/>
        <h3>{Locale.downloadSingle[language]}</h3>
        <Row>
          <Col span={8}>
            <Select
              style={{width: 200}}
              value={singleSvg}
              onChange={(v) => this.setState({singleSvg: v})}
            >
              {
                iconName.map((svg, i) => (
                  <Select.Option value={svg} key={i}>{svg}</Select.Option>
                ))
              }
            </Select>
          </Col>
          <Col span={4}>
            <Icon type={singleSvg}/>
          </Col>
        </Row>
        <h3>{Locale.currentList[language]} - {caches.length}</h3>
        <div className="svg-list">
          {
            caches.map((svg, i) => {
              return (
                <div key={i} className="svg-list-item">
                  <Icon type={svg}/>
                  <p>{svg}</p>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}
