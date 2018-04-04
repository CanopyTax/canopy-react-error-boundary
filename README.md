# canopy-react-error-boundary
A higher order component / decorator for creating error boundaries in React code at Canopy.  The decorator implements [componentDidCatch](https://reactjs.org/docs/react-component.html#componentdidcatch) and will render a modal
explaining to the user that a Canopy feature is having problems.

Note that using the decorator will also, by default, put your react component tree and single-spa application into [React Strict Mode](https://reactjs.org/docs/strict-mode.html).
You can disable this behavior if you so wish by setting the `noStrictMode` opt.

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

#### Opts
- `featureName` (required): A string name for the feature. This is shown to the user when componentDidCatch is called, so it should be user friendly.
- `noStrictMode` (optional): A boolean that defaults to false. When true, this turns of react strict mode. Note that canopy-react-error-boundary is compatible with react@<=15 and will
  not try to use `React.StrictMode` if it is not available.
