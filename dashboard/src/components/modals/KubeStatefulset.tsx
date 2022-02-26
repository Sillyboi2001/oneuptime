import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import ClickOutside from 'react-click-outside';
import { closeModal, openModal } from '../../actions/modal';
import ShouldRender from '../basic/ShouldRender';
import KubeIndicator from '../monitor/KubeIndicator';
import DataPathHoC from '../DataPathHoC';
import KubeStatefulsetData from './KubeStatefulsetData';

class KubeStatefulset extends React.Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyBoard);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyBoard);
    }

    handleKeyBoard = (e: $TSFixMe) => {
        switch (e.key) {
            case 'Enter':
            case 'Escape':
                return this.handleCloseModal();
            default:
                return false;
        }
    };

    handleCloseModal = () => {
        /**
         * NORMAL BEHAVIOR:
         * 1. when a user clicks within the modal, the modal should not close
         * 2. when a user clicks outside the modal, the last modal on the stack should close (the currently viewed modal)
         *
         * BUG FIX:
         * a tiny hack to fix issue with closing stacked modals
         * when a user clicks on the modal
         */
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'modals' does not exist on type 'Readonly... Remove this comment to see the full error message
        if (this.props.modals.length === 1) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'closeModal' does not exist on type 'Read... Remove this comment to see the full error message
            this.props.closeModal();
        }
    };

    handleStatefulsetData = (data: $TSFixMe) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'openModal' does not exist on type 'Reado... Remove this comment to see the full error message
        this.props.openModal({
            content: DataPathHoC(KubeStatefulsetData, { data }),
        });
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { data } = this.props;
        const statefulsetData = data.data;
        const logTitle = data.title;

        return (
            <div
                className="ModalLayer-contents"
                // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
                tabIndex="-1"
                style={{ marginTop: '40px' }}
            >
                <div className="bs-BIM">
                    <div
                        className="bs-Modal"
                        style={{ width: '100%', maxWidth: 600 }}
                    >
                        <ClickOutside onClickOutside={this.handleCloseModal}>
                            <div className="bs-Modal-header">
                                <div
                                    className="bs-Modal-header-copy"
                                    style={{
                                        marginBottom: '10px',
                                        marginTop: '10px',
                                    }}
                                >
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--20 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        <span>{logTitle}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="bs-Modal-content">
                                <div className="bs-ObjectList db-UserList">
                                    <div
                                        style={{
                                            overflow: 'hidden',
                                            overflowX: 'auto',
                                        }}
                                    >
                                        <div
                                            id="scheduledEventsList"
                                            className="bs-ObjectList-rows"
                                        >
                                            <ShouldRender
                                                if={
                                                    statefulsetData &&
                                                    statefulsetData.length > 0
                                                }
                                            >
                                                <header
                                                    className="bs-ObjectList-row bs-ObjectList-row--header"
                                                    style={{
                                                        display: 'flex',
                                                        justifyContent:
                                                            'space-between',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <div className="bs-ObjectList-cell">
                                                        Statefulset Name
                                                    </div>
                                                    <div
                                                        className="bs-ObjectList-cell"
                                                        style={{
                                                            textAlign: 'right',
                                                        }}
                                                    >
                                                        Ready
                                                    </div>
                                                </header>
                                            </ShouldRender>
                                            {statefulsetData &&
                                                statefulsetData.map(
                                                    (data: $TSFixMe, index: $TSFixMe) => (
                                                        <div
                                                            key={data._id}
                                                            className="scheduled-event-list-item bs-ObjectList-row db-UserListRow"
                                                            style={{
                                                                backgroundColor:
                                                                    'white',
                                                                height: 60,
                                                                display: 'flex',
                                                                borderBottom:
                                                                    '1px solid #cfd7df80',
                                                                justifyContent:
                                                                    'space-between',
                                                                alignItems:
                                                                    'center',
                                                                cursor:
                                                                    'pointer',
                                                            }}
                                                            id={`statefulsetData_${index}`}
                                                            onClick={() =>
                                                                this.handleStatefulsetData(
                                                                    data
                                                                )
                                                            }
                                                        >
                                                            <div className="bs-ObjectList-cell bs-u-v-middle">
                                                                <div className="bs-ObjectList-cell-row">
                                                                    <KubeIndicator
                                                                        status={
                                                                            data.readyStatefulsets ===
                                                                            data.desiredStatefulsets
                                                                                ? 'healthy'
                                                                                : 'unhealthy'
                                                                        }
                                                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ status: string; index: any; }' is not assi... Remove this comment to see the full error message
                                                                        index={
                                                                            index
                                                                        }
                                                                    />
                                                                    {
                                                                        data.statefulsetName
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="bs-ObjectList-cell bs-u-v-middle">
                                                                <div
                                                                    className="bs-ObjectList-cell-row"
                                                                    style={{
                                                                        textAlign:
                                                                            'right',
                                                                        whiteSpace:
                                                                            'normal',
                                                                    }}
                                                                >
                                                                    {
                                                                        data.readyStatefulsets
                                                                    }
                                                                    /
                                                                    {
                                                                        data.desiredStatefulsets
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )
                                                )}
                                        </div>
                                    </div>
                                    <ShouldRender
                                        if={
                                            !statefulsetData ||
                                            statefulsetData.length === 0
                                        }
                                    >
                                        <div
                                            className="Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"
                                            style={{
                                                textAlign: 'center',
                                                backgroundColor: 'white',
                                                padding: '20px 10px',
                                            }}
                                            id="noprojectDomains"
                                        >
                                            <span>
                                                {!statefulsetData ||
                                                statefulsetData.length === 0
                                                    ? 'Sorry no Statefulset data at this time'
                                                    : null}
                                            </span>
                                        </div>
                                    </ShouldRender>
                                </div>
                            </div>
                            <div className="bs-Modal-footer">
                                <div className="bs-Modal-footer-actions">
                                    <button
                                        id="okBtn"
                                        className="bs-Button bs-DeprecatedButton bs-Button--blue btn__modal"
                                        type="submit"
                                        onClick={this.handleCloseModal}
                                    >
                                        <>
                                            <span>Ok</span>
                                            <span className="create-btn__keycode">
                                                <span className="keycode__icon keycode__icon--enter" />
                                            </span>
                                        </>
                                    </button>
                                </div>
                            </div>
                        </ClickOutside>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
KubeStatefulset.displayName = 'KubeStatefulset';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
KubeStatefulset.propTypes = {
    closeModal: PropTypes.func.isRequired,
    data: PropTypes.object,
    openModal: PropTypes.func,
    modals: PropTypes.array,
};

const mapDispatchToProps = (dispatch: $TSFixMe) => bindActionCreators(
    {
        closeModal,
        openModal,
    },
    dispatch
);

const mapStateToProps = (state: $TSFixMe) => ({
    modals: state.modal.modals
});

export default connect(mapStateToProps, mapDispatchToProps)(KubeStatefulset);
