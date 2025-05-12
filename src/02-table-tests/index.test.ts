import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 5, b: 3, action: Action.Subtract, expected: 2 },
  { a: 4, b: 3, action: Action.Multiply, expected: 12 },
  { a: 6, b: 3, action: Action.Divide, expected: 2 },
  { a: 2, b: 3, action: Action.Exponentiate, expected: 8 },
  { a: '2', b: 3, action: Action.Add, expected: null },
  { a: 2, b: 3, action: 'invalid', expected: null },
];

describe('simpleCalculator table tests', () => {
  test.each(testCases)(
    'should return $expected for inputs $a, $b and action $action',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
