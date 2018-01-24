import { PortalApi } from '../../../src/app';
import { CalculatorTile } from './calculatorTile';
import { CalculatorSettings } from './calculatorSettings';

export function setup(portal: PortalApi) {
  console.log('Hi from the calculator');

  portal.registerTile('calculator', CalculatorTile);
  portal.registerPage('/calculator/settings', CalculatorSettings);
}
