import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ListLoader } from '../basic/Loader';
import EscalationSummarySingle from './EscalationSummarySingle';

export class EscalationSummary extends Component {
    constructor(props: $TSFixMe) {
        super(props);
        this.state = {};
    }

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'onEditClicked' does not exist on type 'R... Remove this comment to see the full error message
        const { onEditClicked, escalations, teamMembers, groups } = this.props;

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'isLoading' does not exist on type 'Reado... Remove this comment to see the full error message
        const { isLoading, error } = this.state;
        return (
            <div className="Box-root Margin-bottom--12">
                <div className="bs-ContentSection Card-root Card-shadow--medium">
                    <div className="Box-root">
                        <div className="ContentHeader Box-root Box-background--white Box-divider--surface-bottom-1 Flex-flex Flex-direction--column Padding-horizontal--20 Padding-vertical--16">
                            <div className="Box-root Flex-flex Flex-direction--row Flex-justifyContent--spaceBetween">
                                <div className="ContentHeader-center Box-root Flex-flex Flex-direction--column Flex-justifyContent--center">
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        <span>
                                            {' '}
                                            Call Schedule and Escalation Policy
                                            Summary
                                        </span>
                                    </span>
                                    <p>
                                        Define your call schedule here. Alert
                                        your backup on-call team if your primary
                                        on-call team does not respond to alerts.
                                    </p>
                                </div>
                                <div className="ContentHeader-end Box-root Flex-flex Flex-alignItems--center Margin-left--16">
                                    <div className="Box-root">
                                        <button
                                            type="button"
                                            className="bs-Button bs-FileUploadButton bs-Button--icon bs-Button--edit"
                                            onClick={() => {
                                                return onEditClicked
                                                    ? onEditClicked()
                                                    : null;
                                            }}
                                        >
                                            Edit Call Schedule
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {!isLoading &&
                            !error &&
                            escalations &&
                            escalations.length > 0 &&
                            escalations.map((escalation: $TSFixMe, i: $TSFixMe) => {
                                return (
                                    <div
                                        key={escalation.id}
                                        className="bs-ContentSection-content Box-root"
                                    >
                                        {i !== 0 && (
                                            <div
                                                className="Card-root"
                                                style={{
                                                    backgroundColor: '#ffffff',
                                                }}
                                            >
                                                <div className="Box-root">
                                                    <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--16">
                                                        <div className="Box-root">
                                                            <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                                                <span>
                                                                    Escalation
                                                                    Policy {i}{' '}
                                                                </span>
                                                            </span>
                                                            <p>
                                                                <span></span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-horizontal--8 Padding-vertical--2"
                                            style={{
                                                backgroundColor: '#f7f7f7',
                                            }}
                                        >
                                            <div>
                                                {escalation &&
                                                    escalation.activeTeam && (
                                                        // @ts-expect-error ts-migrate(2741) FIXME: Property 'isNextActiveTeam' is missing in type '{ ... Remove this comment to see the full error message
                                                        <EscalationSummarySingle
                                                            isActiveTeam={true}
                                                            teamMemberList={
                                                                teamMembers
                                                            }
                                                            escalation={
                                                                escalation
                                                            }
                                                            hasNextEscalationPolicy={
                                                                !!escalations[
                                                                    i + 1
                                                                ]
                                                            }
                                                            currentEscalationPolicyCount={
                                                                i + 1
                                                            }
                                                            groups={groups}
                                                        />
                                                    )}

                                                <div className="bs-Fieldset-row"></div>

                                                {escalation &&
                                                    escalation.nextActiveTeam && (
                                                        // @ts-expect-error ts-migrate(2741) FIXME: Property 'isActiveTeam' is missing in type '{ isNe... Remove this comment to see the full error message
                                                        <EscalationSummarySingle
                                                            isNextActiveTeam={
                                                                true
                                                            }
                                                            teamMemberList={
                                                                teamMembers
                                                            }
                                                            escalation={
                                                                escalation
                                                            }
                                                            hasNextEscalationPolicy={
                                                                !!escalations[
                                                                    i + 1
                                                                ]
                                                            }
                                                            currentEscalationPolicyCount={
                                                                i + 1
                                                            }
                                                            groups={groups}
                                                        />
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                        {error && (
                            <div className="bs-ContentSection-content Box-root">
                                <div
                                    className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-horizontal--8 Padding-vertical--2"
                                    style={{ backgroundColor: '#f7f7f7' }}
                                >
                                    <div>
                                        <div className="bs-Fieldset-row flex-center">
                                            Network Error. Please try again.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {isLoading && (
                            <div className="bs-ContentSection-content Box-root">
                                <div
                                    className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-horizontal--8 Padding-vertical--2"
                                    style={{ backgroundColor: '#f7f7f7' }}
                                >
                                    <div>
                                        <div className="bs-Fieldset-row flex-center">
                                            <ListLoader />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="bs-ContentSection-footer bs-ContentSection-content Box-root Box-background--white Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--12">
                            <div className="bs-Tail-copy">
                                <div
                                    className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--row Flex-justifyContent--flexStart"
                                    style={{ marginTop: '10px' }}
                                ></div>
                            </div>

                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
EscalationSummary.displayName = 'EscalationSummary';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
EscalationSummary.propTypes = {
    onEditClicked: PropTypes.func.isRequired,
    escalations: PropTypes.array.isRequired,
    teamMembers: PropTypes.array.isRequired,
    groups: PropTypes.array,
};

const mapDispatchToProps = (dispatch: $TSFixMe) => bindActionCreators({}, dispatch);

const mapStateToProps = () => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(EscalationSummary);
