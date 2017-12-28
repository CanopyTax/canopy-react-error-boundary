import React from 'react';
import {CprButton} from 'canopy-styleguide!sofe';

export default function decorateOptions(opts) {
  if (typeof opts !== 'object' || typeof opts.featureName !== 'string') {
    throw new Error("canopy-react-error-boundary decorator should be called with an opts object that has a featureName string. e.g. @ErrorBoundary({featureName: 'life'})");
  }

  return function decorateComponent(Comp) {
    return class CanopyReactErrorBoundary extends React.Component {
      state = {
        caughtError: null,
        caughtErrorInfo: null,
        dismissed: false,
      }
      render() {
        if (!this.state.caughtError) {
          return <Comp {...this.props} caughtError={this.state.caughtError} caughtErrorInfo={this.state.caughtErrorInfo} />
        } else if (document.getElementById('canopy-react-error-boundary-modal')) {
          // Only show one application's error modal at a time
          return null;
        } else if (this.state.dismissed) {
          // Maybe they want to click on the navbar underneath the modal?
          return null;
        } else {
          return (
            <div className="cps-modal" id="canopy-react-error-boundary-modal">
              <div className="cps-modal__screen" />
              <div className="cps-modal__dialog cps-card__height-3">
                <div className="cps-card__header cps-subheader-sm">
                  <span>
                    The {opts.featureName} feature is having problems
                  </span>
                  <a className="cps-modal__dialog__close cps-icon cps-icon-close" onClick={() => this.setState({dismissed: false})} />
                </div>
                <div className="cps-card__body" style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                  <img src="https://cdn.canopytax.com/images/NoFilter.svg" class="errorImg" style={{width: '50%', padding: '16px 0'}} />
                  <div style={{padding: '0 64px', textAlign: 'center'}}>
                    If this error continues, click on the support bubble or call 855-558-8407.
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
        this.setState({
          caughtError: err,
          caughtErrorInfo: info,
        });
      }
    }
  }
}
