import * as React from 'react';

export interface CalculatorSettingsProps {
  portal: any;
  match: any;
}

export class CalculatorSettings extends React.Component<CalculatorSettingsProps> {
  render() {
    return (
      <div>
        <h3>Calculator Settings</h3>
        <div>Some page dedicated to the calculator settings.</div>
      </div>
    );
  }
}
