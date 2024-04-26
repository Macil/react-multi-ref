# react-multi-ref

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Macil/react-multi-ref/blob/master/LICENSE.txt) [![npm version](https://img.shields.io/npm/v/react-multi-ref.svg?style=flat)](https://www.npmjs.com/package/react-multi-ref)

This is a small utility to make it easy for React components to deal with refs
on multiple dynamically created elements.

```js
import { useState } from "react";
import MultiRef from "react-multi-ref";

function Foo(props) {
  const [itemRefs] = useState(() => new MultiRef());

  // Make a 5-item array of divs with keys 0,1,2,3,4
  const items = new Array(5).fill(null).map((n, i) => (
    <div key={i}>
      <input type="text" ref={itemRefs.ref(i)} />
    </div>
  ));

  function onClick() {
    const parts = [];
    itemRefs.map.forEach((input) => {
      parts.push(input.value);
    });
    alert("all input values: " + parts.join(", "));
  }

  return (
    <div>
      <button onClick={onClick}>Alert</button>
      {items}
    </div>
  );
}
```

The `multiRef.map` property is a Map object containing entries where the key is
the parameter passed to `multiRef.ref(key)` and the value is the ref element
given by React. You can retrieve a specific element by key from the map by using
`multiRef.map.get(key)`.

Subsequent calls to `multiRef.ref(key)` in later renders with the same key
will return the same value so that React knows that it doesn't need to
update the ref.

## Class Component Example

MultiRef is usable as long as you can create an instance of it and persist the
instance for the lifetime of a component. In a function component, you can do this with `useState` (_not_ `useMemo`, because React is allowed to reset its memory at any time), and in a class component, you can do this by keeping the instance as a property on the class.

```js
import React from "react";
import MultiRef from "react-multi-ref";

class Foo extends React.Component {
  #itemRefs = new MultiRef();

  render() {
    // Make a 5-item array of divs with keys 0,1,2,3,4
    const items = new Array(5).fill(null).map((n, i) => (
      <div key={i}>
        <input type="text" ref={this.#itemRefs.ref(i)} />
      </div>
    ));
    return (
      <div>
        <button onClick={this.#onClick}>Alert</button>
        {items}
      </div>
    );
  }

  #onClick = () => {
    const parts = [];
    this.#itemRefs.map.forEach((input) => {
      parts.push(input.value);
    });
    alert("all input values: " + parts.join(", "));
  };
}
```

## Types

Both [TypeScript](https://www.typescriptlang.org/) and
[Flow](https://flowtype.org/) type definitions for this module are included!
The type definitions won't require any configuration to use.
