import { PortalApi } from '../../../src/app';
import { CalculatorTile } from './calculatorTile';

export function setup(portal: PortalApi) {
  console.log('Hi from the calculator');

  portal.registerTile('calculator', CalculatorTile);
}
