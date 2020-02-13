import React from 'react';
import {CprButton} from 'canopy-styleguide!sofe';

export default function decorateOptions(opts) {
  if (typeof opts !== 'object' || typeof opts.featureName !== 'string') {
    throw new Error("canopy-react-error-boundary decorator should be called with an opts object that has a featureName string. e.g. @ErrorBoundary({featureName: 'life'})");
  }

  return function decorateComponent(Comp) {
    return class CanopyReactErrorBoundary extends React.Component {
      static displayName = `CanopyReactErrorBoundary(${opts.featureName})`
      state = {
        caughtError: null,
        caughtErrorInfo: null,
        dismissed: false,
      }
      render() {
        if (!this.state.caughtError) {
          if (opts.noStrictMode || !React.StrictMode) {
            return <Comp {...this.props} />
          } else {
            return (
              <React.StrictMode>
                <Comp {...this.props} />
              </React.StrictMode>
            )
          }
        } else if (document.getElementById('canopy-react-error-boundary-modal')) {
          // Only show one application's error modal at a time
          return null;
        } else if (this.state.dismissed) {
          // Maybe they want to click on the navbar underneath the modal?
          return null;
        } else {
          return (
            <div className="cps-modal" id="canopy-react-error-boundary-modal" style={{whiteSpace: "normal"}}>
              <div className="cps-modal__screen" />
              <div className="cps-modal__dialog cps-card__height-3" style={{maxWidth: '100vw', transform: "translateX(-50%)", left: "50%"}}>
                <div className="cps-card__header cps-subheader-sm">
                  <span>
                    The {opts.featureName} feature is having problems
                  </span>
                  <a className="cps-modal__dialog__close cps-icon cps-icon-close" onClick={() => this.setState({dismissed: false})} />
                </div>
                <div className="cps-card__body" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <img src="https://cdn.canopytax.com/images/ErrorState.svg" style={{width: '25%', padding: '16px 0'}} />
                  <div style={{fontSize: '20px', fontWeight: 'bold', textAlign: 'center'}}>
                    Looks like there was a problem
                  </div>
                  <div style={{textAlign: 'center'}}>
                    If the error continues, chat with support via the help center or call <a href="tel:855-558-8407">855-558-8407</a>
                  </div>
                </div>
                <div className="cps-modal__dialog__actions">
                  <CprButton actionType="primary" onClick={() => window.history.back()}>
                    Go back
                  </CprButton>
                  <CprButton actionType="flat" onClick={() => window.location.reload()}>
                    Reload page
                  </CprButton>
                </div>
              </div>
            </div>
          );
        }
      }
      componentDidCatch(err, info) {
        if (info && info.componentStack) {
          err.extra =  Object.assign(err.extra || {}, {
            componentStack: info.componentStack
          });
        }

        setTimeout(() => {
          throw err;
        });

        this.setState({
          caughtError: err,
          caughtErrorInfo: info,
        });
      }
    }
  }
}
