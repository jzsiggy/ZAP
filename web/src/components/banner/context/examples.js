const examples = {
  prime: 
`@a = 2;

while (a < 100) {
  @b = 2;
  @notprime = 0;
  while (b <= (a / 2)) {
    if (!(a % b == 0)) {
      b = b+1;
    } else {
      b = a;
      notprime = 1;
    };
  };
  if (!notprime) {
    show a + ' is prime';
    show;
  };
  a = a + 1;
};
`,

  function:
`fn sayHi|name| => {
  show 'hello ' + name;
};

sayHi|'Johnny'|;
`,

  while:
`@counter = 0;

while (counter < 10) {
  show counter;
  counter = counter + 1;
};
`,

  variable:
`@name = 'Patricia';

show name;
`,

  pumpkin:
`fn eatPumpkin|| => {
  show 'eating a pumpkin';
  numberOfPumpkins = numberOfPumpkins - 1;
  show 'there are ' + numberOfPumpkins + ' left';
  show;
};

@numberOfPumpkins = 20;

while (numberOfPumpkins > 5) {
  eatPumpkin||;
};
`
}

export {
  examples,
};