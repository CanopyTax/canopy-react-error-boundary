# canopy-react-error-boundary
A higher order component / decorator for creating error boundaries in React code at Canopy. The decorator implements
[componentDidCatch](https://reactjs.org/docs/react-component.html#componentdidcatch) and will render a modal
explaining to the user that a Canopy feature is having problems.

#### When to use this
***All*** single-spa applications should implement componentDidCatch in the root component. So this decorator should at least
be applied to the top-level component for each single-spa application.

In addition to the top level component, you can add error boundaries wherever you'd like.

#### Usage
```bash
yarn add canopy-react-error-boundary
```

```js
import ErrorBoundary from 'canopy-react-error-boundary';

@ErrorBoundary({featureName: 'calendar'})
class Root extends React.Component {
}
```
