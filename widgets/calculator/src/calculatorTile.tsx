import * as React from 'react';
import { Link } from 'react-router-dom';
import { PortalApi } from '../../../src/app';

export interface CalculatorTileProps {
  rows: number;
  columns: number;
  portal: PortalApi;
}

export interface CalculatorTileState {
  x: string;
  y: string;
  res: number;
  temperature: number;
}

interface TemperatureChanged {
  value: number;
}

export class CalculatorTile extends React.Component<CalculatorTileProps, CalculatorTileState> {
  constructor(props: CalculatorTileProps) {
    super(props);
    const { portal } = props;
    this.state = {
      x: '0',
      y: '0',
      res: 0,
      temperature: portal.data.temperature,
    };
    portal.on<TemperatureChanged>('temperature-changed', ({ value }) => this.setState({
      temperature: value,
    }));
  }

  private changeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.calc(e.target.value, this.state.y);
  };

  private changeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.calc(this.state.x, e.target.value);
  };

  private calc(x: string, y: string) {
    const { portal } = this.props;
    const res = (+x || 0) + (+y || 0);
    this.setState({
      x,
      y,
      res,
    });

    portal.emit('calculated', {
      result: res,
    });
  }

  render() {
    const { x, y, res, temperature } = this.state;
    return (
      <div>
        <h3>Calculator (at {temperature} °C)</h3>
        <div><input value={x} onChange={this.changeX} /></div>
        <div>+</div>
        <div><input value={y} onChange={this.changeY} /></div>
        <div>=</div>
        <div><output>{res.toString()}</output></div>
        <div><Link to="/calculator/settings">Calculator settings</Link></div>
      </div>
    );
  }
}
