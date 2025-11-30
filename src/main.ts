import { getCalc } from "./lib/getCalc";
import { op } from "./lib/operators";

const Calc = getCalc();

Calc.setExpression({
  id: 'p1',
  type: 'expression',
  latex: 'P_1 = (0, 0)',
})
Calc.setExpression({
  id: 'p2',
  type: 'expression',
  latex: 'P_2 = (0, 2)'
})
Calc.setExpression({
  id: 'hello-world',
  type: 'expression',
  latex: op('segment', 'P_1', 'P_2'),
  color: '#000000'
})
