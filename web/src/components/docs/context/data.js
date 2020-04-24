import React from 'react';
import { Pink , Purple , Green , Yellow } from './colors';

const data = {
  expressions : {
    title: `Expressions`,

    description: <>
      Expression statements are at the root of the ZAP interpreter. 
      These statements are defined by arithmetic or logical expressions 
      not followed or trailed by ZAP keywords. The value of these statements 
      are calculated by the Evaluator class.
      The supported operators are: 
      <br/><br/> 
      '+', '-', '*', '/', '%', '>', '&lt;', '&gt;=', '&lt;=', '==' & '!='
      <br/><br/>
      The order of execution follows 'PEMDAS'.
    </>,

    terminal: <>
      <Purple>1</Purple>&nbsp;
      <Pink>+</Pink>&nbsp;
      <Purple>2</Purple>&nbsp;
      <Pink>/</Pink>
      &nbsp;(
      <Purple>3</Purple>&nbsp;
      <Pink>-</Pink>&nbsp;
      <Purple>4</Purple>
      )&nbsp;
      <Pink>*</Pink>&nbsp;
      <Purple>5</Purple>&nbsp;
      <Pink>%</Pink>&nbsp;
      <Purple>6</Purple>&nbsp;
      <Pink>!=</Pink>&nbsp;
      <Purple>8</Purple>
      ;
    </>,
  },

  declarations : {
    title: `Declarations`,

    description: <>
      Declaration statements are used to define variables (or functions, as we`ll see soon) in ZAP.
      This allows us to store values and data to be used further in the code.
      Variable declarations in ZAP start with an '@', followed by its name. 
      This initializes tha variable, however does not hand it any value. 
      To do so, we must add an equals '=', and specify the value.
    </>,

    terminal: <>
      <Pink>@</Pink>
      <Green>variable</Green>&nbsp;
      <Pink>=</Pink>&nbsp;
      <Yellow>'I am a string'</Yellow>
      ;
    </>,
  },

  conditionals : {
    title: `Conditionals`,

    description: <>
      Conditional statements is where ZAP begins to behave more like a programming language,
      and less like an arithmetic calcultor. If statements make it possible to control what
      gets executed by the program depending on the current program state. In Zap, we define 
      If statements by adding the 'if' keyword, followed by an expression. This expression
      is what defines if the code in the body of the statement will be executed.
    </>,
    
    terminal: <>
      <Pink>@</Pink>
      <Green>x</Green>&nbsp;
      <Pink>=</Pink>&nbsp;
      <Purple>5</Purple>; 
      <br/><br/>
      <Pink>if</Pink>
      &nbsp;(
      <Green>x</Green>&nbsp;
      <Pink>==</Pink>&nbsp;
      <Purple>5</Purple>
      ) &#123; 
      <br/>
      &emsp; <Green>show</Green>&nbsp;
      <Yellow>'x'</Yellow>; 
      <br/>
      &#125;;
      <br/><br/>
      * shows x *
    </>,
  },

  loops : {
    title: `Loops`,

    description: <>
      Loops allow our program to execute statements more times than the specified in the source code.
      This is where our program complexity stops being directly proportional to the size of the code.
      The only type of loop supported in ZAP is the 'While loop'. The code in the body of the statement
      will be executed while the expression specified is true.
    </>,
    
    terminal: <>
      <Pink>@</Pink>
      <Green>counter</Green>&nbsp;
      <Pink>=</Pink>&nbsp;
      <Purple>0</Purple>;
      <br/><br/>
      <Pink>while</Pink>
      &nbsp;(
      <Green>counter</Green>&nbsp;
      <Pink>&lt;</Pink>&nbsp;
      <Purple>10</Purple>
      ) &#123;
      <br/>
      &emsp; <Green>show</Green>&nbsp;
      <Green>counter</Green>&nbsp;
      <Pink>=</Pink>&nbsp;
      <Green>counter</Green>&nbsp;
      <Pink>+</Pink>&nbsp;
      <Purple>1</Purple>;
      <br/>
      &#125;; <br/><br/>
      * counts to 10 *

    </>,
  },

  functions : {
    title: `Functions`,

    description: <>
      We have reached the statement with the highest complexity within ZAP.
      Using functions, we can reuse pieces of code written earlier in the source.
      To define functions in ZAP, we use th 'fn' keyword, followed by the name of our function.
      We follow with a '|' key and begin the list of arguments. After closing the list 
      of arguments with another '|', we add a '=>' token and an opening brace. the body of our 
      function goes here.<br/><br/>
      To call our function, we must write its name, and list the arguments we want to use.
    </>,
    
    terminal: <>
      <Green>fn</Green>&nbsp;
      <Green>sayHi</Green>
      <Pink>|</Pink>
      <Green>name</Green>
      ,&nbsp;
      <Green>greeting</Green>
      <Pink>|</Pink>&nbsp;
      => &#123; <br/>
      &emsp; <Green>show</Green> &nbsp;
      <Green>greeting</Green>&nbsp;
      <Pink>+</Pink>&nbsp;
      <Yellow>' '</Yellow>&nbsp;
      <Pink>+</Pink>&nbsp;
      <Green>name</Green>; <br/>
      &#125;;<br/><br/>

      <Green>sayHi</Green>
      <Pink>|</Pink>
      <Yellow>'John'</Yellow>
      ,
      <Yellow>'Hello'</Yellow>
      <Pink>|</Pink>;<br/><br/>

      * shows 'Hello John' *
    </>,
  },
};

export default data;