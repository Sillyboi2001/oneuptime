import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ClickOutside from 'react-click-outside';

class ConfirmNumberDeleteModal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyBoard);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyBoard);
    }

    handleKeyBoard = (e: $TSFixMe) => {
        switch (e.key) {
            case 'Escape':
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeThisDialog' does not exist on type ... Remove this comment to see the full error message
                return this.props.closeThisDialog();
            case 'Enter':
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmThisDialog' does not exist on typ... Remove this comment to see the full error message
                return this.props.confirmThisDialog();
            default:
                return false;
        }
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeThisDialog' does not exist on type ... Remove this comment to see the full error message
        const { closeThisDialog } = this.props;

        return (
            <div className="ModalLayer-wash Box-root Flex-flex Flex-alignItems--flexStart Flex-justifyContent--center">
                <div
                    className="ModalLayer-contents"
                    tabIndex={-1}
                    style={{ marginTop: 40 }}
                >
                    <div className="bs-BIM">
                        <div className="bs-Modal bs-Modal--medium">
                            <ClickOutside onClickOutside={closeThisDialog}>
                                <div className="bs-Modal-header">
                                    <div className="bs-Modal-header-copy">
                                        <span className="Text-color--inherit Text-display--inline Text-fontSize--20 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                            <span>Confirm Removal</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="bs-Modal-content">
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        Are you sure you want to remove this
                                        number ?
                                    </span>
                                </div>
                                <div className="bs-Modal-footer">
                                    <div className="bs-Modal-footer-actions">
                                        <button
                                            className="bs-Button bs-DeprecatedButton bs-Button--grey btn__modal"
                                            type="button"
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeThisDialog' does not exist on type ... Remove this comment to see the full error message
                                            onClick={this.props.closeThisDialog}
                                        >
                                            <span>Cancel</span>
                                            <span className="cancel-btn__keycode">
                                                Esc
                                            </span>
                                        </button>
                                        <button
                                            id="deleteMonitor"
                                            className="bs-Button bs-DeprecatedButton bs-Button--red btn__modal"
                                            type="button"
                                            onClick={
                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'confirmThisDialog' does not exist on typ... Remove this comment to see the full error message
                                                this.props.confirmThisDialog
                                            }
                                            autoFocus={true}
                                        >
                                            <span>Remove</span>
                                            <span className="delete-btn__keycode">
                                                <span className="keycode__icon keycode__icon--enter" />
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </ClickOutside>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
ConfirmNumberDeleteModal.displayName = 'ConfirmNumberDeleteModal';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ConfirmNumberDeleteModal.propTypes = {
    confirmThisDialog: PropTypes.func.isRequired,
    closeThisDialog: PropTypes.func.isRequired,
};

const mapStateToProps = () => {
    return {};
};

const mapDispatchToProps = () => {
    return {};
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ConfirmNumberDeleteModal);
