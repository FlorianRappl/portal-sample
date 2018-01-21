import * as React from 'react';

export interface CalculatorTileProps {
  rows: number;
  columns: number;
  portal: any;
}

export interface CalculatorTileState {
  x: string;
  y: string;
  res: number;
}

export class CalculatorTile extends React.Component<CalculatorTileProps, CalculatorTileState> {
  constructor(props: CalculatorTileProps) {
    super(props);
    this.state = {
      x: '0',
      y: '0',
      res: 0,
    };
  }

  private changeX = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.calc(e.target.value, this.state.y);
  };

  private changeY = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.calc(this.state.x, e.target.value);
  };

  private calc(x: string, y: string) {
    this.setState({
      x,
      y,
      res: (+x || 0) + (+y || 0),
    });
  }

  render() {
    const { x, y, res } = this.state;
    return (
      <div>
        <h3>Calculator</h3>
        <div><input value={x} onChange={this.changeX} /></div>
        <div>+</div>
        <div><input value={y} onChange={this.changeY} /></div>
        <div>=</div>
        <div><output>{res.toString()}</output></div>
      </div>
    );
  }
}
