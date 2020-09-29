import React from 'react';
import { CpButton, CpModal, CpEmptyState } from 'canopy-styleguide!sofe';

export default function decorateOptions(opts) {
  if (typeof opts !== "object" || typeof opts.featureName !== "string") {
    throw new Error(
      "canopy-react-error-boundary decorator should be called with an opts object that has a featureName string. e.g. @ErrorBoundary({featureName: 'life'})"
    );
  }

  return function decorateComponent(Comp) {
    return class CanopyReactErrorBoundary extends React.Component {
      static displayName = `CanopyReactErrorBoundary(${opts.featureName})`
      static getDerivedStateFromError(error) {    
        return { caughtError: true };  
      }
      state = {
        caughtError: null,
        caughtErrorInfo: null,
        dismissed: false,
      }
      render() {
        return (
          <>
            <CpModal
              show={this.state.caughtError && !this.state.dismissed}
              onClose={() => this.setState({ dismissed: false })}
              width={500}
            >
              <CpModal.Header
                title={`The ${opts.featureName} feature is having problems`}
              />
              <CpModal.Body>
                <CpEmptyState
                  img='es_caution'
                  text='Looks like there was a problem'
                  subText='If the error continues, chat with support via the help center or call 855-558-8407'
                />
              </CpModal.Body>
              <CpModal.Footer>
                <CpButton
                  btnType="primary"
                  onClick={() => window.history.back()}
                >
                  Go back
                </CpButton>
                <CpButton
                  btnType="flat"
                  onClick={() => window.location.reload()}
                >
                  Reload page
                </CpButton>
              </CpModal.Footer>
            </CpModal>

            {!this.state.caughtError &&
              (opts.noStrictMode || !React.StrictMode ? (
                <Comp {...this.props} />
              ) : (
                <React.StrictMode>
                  <Comp {...this.props} />
                </React.StrictMode>
              ))}
          </>
        );
      }
      componentDidCatch(err, info) {
        if (info && info.componentStack) {
          err.extra = Object.assign(err.extra || {}, {
            componentStack: info.componentStack,
          });
        }

        setTimeout(() => {
          throw err;
        });
      }
    };
  };
}
