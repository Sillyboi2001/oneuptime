import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ShouldRender from '../basic/ShouldRender';
class CallLogsErrorViewModal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyboard);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyboard);
    }

    handleKeyboard = (e: $TSFixMe) => {
        switch (e.key) {
            case 'Escape':
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeThisDialog' does not exist on type ... Remove this comment to see the full error message
                return this.props.closeThisDialog();
            default:
                return false;
        }
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isRequesting' does not exist on type 'Re... Remove this comment to see the full error message
        const { isRequesting, error, closeThisDialog, content } = this.props;
        return (
            <div className="db-CallLogsContentViewModal ModalLayer-wash Box-root Flex-flex Flex-alignItems--flexStart Flex-justifyContent--center">
                <div
                    className="ModalLayer-contents"
                    tabIndex={-1}
                    style={{ marginTop: 40 }}
                >
                    <div className="bs-BIM">
                        <div className="ds-Modal">
                            <div className="bs-Modal-header">
                                <div className="bs-Modal-header-copy">
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--20 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        <span>Error</span>
                                    </span>
                                </div>
                            </div>
                            <div className="bs-Modal-content">
                                <div className="db-CallLogsContentViewModal-ContentViewerWrapper">
                                    <div className="db-CallLogsContentViewModal-ContentViewerContainer">
                                        <span>{content}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="bs-Modal-footer">
                                <div className="bs-Modal-footer-actions">
                                    <ShouldRender if={error}>
                                        <div className="bs-Tail-copy">
                                            <div
                                                className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--row Flex-justifyContent--flexStart"
                                                style={{ marginTop: '10px' }}
                                            >
                                                <div className="Box-root Margin-right--8">
                                                    <div
                                                        className="Icon Icon--info Icon--color--red Icon--size--14 Box-root Flex-flex"
                                                        style={{
                                                            marginTop: '2px',
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="Box-root">
                                                    <span
                                                        style={{ color: 'red' }}
                                                    >
                                                        {error}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </ShouldRender>
                                    <button
                                        className={`bs-Button btn__modal ${isRequesting &&
                                            'bs-is-disabled'}`}
                                        type="button"
                                        onClick={closeThisDialog}
                                        disabled={isRequesting}
                                        autoFocus={true}
                                    >
                                        <span>Close</span>
                                        <span className="cancel-btn__keycode">
                                            Esc
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
CallLogsErrorViewModal.displayName = 'CallLogsErrorViewModal';

const mapStateToProps = (state: $TSFixMe) => {
    return {
        isRequesting:
            state.callLogs &&
            state.callLogs.callLogs &&
            state.callLogs.callLogs.requesting,
        error:
            state.callLogs &&
            state.callLogs.callLogs &&
            state.callLogs.callLogs.error,
    };
};

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
CallLogsErrorViewModal.propTypes = {
    isRequesting: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.oneOf([null, undefined]),
    ]),
    closeThisDialog: PropTypes.func,
    content: PropTypes.string,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null, undefined]),
    ]),
};

export default connect(mapStateToProps)(CallLogsErrorViewModal);
