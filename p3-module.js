// p3-module.js

// Function to generate all valid coin combinations for a given amount
function coinCombo(amount) {
  const coins = [
    { name: 'dollars', value: 100 },
    { name: 'halves', value: 50 },
    { name: 'quarters', value: 25 },
    { name: 'dimes', value: 10 },
    { name: 'nickels', value: 5 },
    { name: 'pennies', value: 1 }
  ];

  const combinations = [];

  function findCombos(remaining, index, currentCombo) {
    if (remaining === 0) {
      combinations.push({ ...currentCombo });
      return;
    }
    if (index >= coins.length) return;

    const { name, value } = coins[index];
    for (let count = 0; count <= Math.floor(remaining / value); count++) {
      currentCombo[name] = count;
      findCombos(remaining - count * value, index + 1, currentCombo);
    }
  }

  if (amount <= 0) {
    return {
      amount,
      combinations: [
        {
          pennies: 0, nickels: 0, dimes: 0, quarters: 0, halves: 0, dollars: 0
        }
      ],
      totalCombinations: 1
    };
  }

  findCombos(amount, 0, {});
  return {
    amount,
    combinations,
    totalCombinations: combinations.length
  };
}

// Function to calculate total value from coin counts
function coinValue(coinCounts) {
  const {
    pennies = 0,
    nickels = 0,
    dimes = 0,
    quarters = 0,
    halves = 0,
    dollars = 0
  } = coinCounts;

  const totalCents =
    Number(pennies) * 1 +
    Number(nickels) * 5 +
    Number(dimes) * 10 +
    Number(quarters) * 25 +
    Number(halves) * 50 +
    Number(dollars) * 100;

  const totalDollars = (totalCents / 100).toFixed(2);

  return {
    coins: {
      pennies,
      nickels,
      dimes,
      quarters,
      halves,
      dollars
    },
    totalCents,
    totalDollars
  };
}

// Export the functions
module.exports = {
  coinCombo,
  coinValue
};

// Manual tests
if (require.main === module) {
  console.log('\n===== Manual Tests for coinCombo() =====');
  const testCombo1 = coinCombo(5);
  console.log('Test 1 - coinCombo(5):', testCombo1);
  const testCombo2 = coinCombo(0);
  console.log('Test 2 - coinCombo(0):', testCombo2);
  const testCombo3 = coinCombo(-5);
  console.log('Test 3 - coinCombo(-5):', testCombo3);

  console.log('\n===== Manual Tests for coinValue() =====');
  const testValue1 = coinValue({ pennies: 4, nickels: 2, dimes: 1, quarters: 1, halves: 0, dollars: 1 });
  console.log('Test 1:', testValue1);
  const testValue2 = coinValue({});
  console.log('Test 2:', testValue2);
  const testValue3 = coinValue({ pennies: '10', nickels: '2', dollars: '1' });
  console.log('Test 3:', testValue3);
}
