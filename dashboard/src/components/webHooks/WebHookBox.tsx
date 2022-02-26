import React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import WebHookList from './WebHookList';
import WebHookButton from './WebHookButton';
import RenderIfAdmin from '../basic/RenderIfAdmin';

class WebHookBox extends React.Component {
    render() {
        return (
            <div className="Box-root Margin-vertical--12">
                <div className="db-RadarRulesLists-page">
                    <div className="Box-root Margin-bottom--12">
                        <div className="bs-ContentSection Card-root Card-shadow--medium">
                            <div className="Box-root">
                                <div className="ContentHeader Box-root Box-background--white Box-divider--surface-bottom-1 Flex-flex Flex-direction--column Padding-horizontal--20 Padding-vertical--16">
                                    <div className="Box-root Flex-flex Flex-direction--row Flex-justifyContent--spaceBetween">
                                        <div className="ContentHeader-center Box-root Flex-flex Flex-direction--column Flex-justifyContent--center">
                                            <span className="ContentHeader-title Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--28 Text-typeface--base Text-wrap--wrap">
                                                <span>
                                                    Webhooks Integration
                                                </span>
                                            </span>
                                            <span className="ContentHeader-description Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-typeface--base Text-wrap--wrap">
                                                <span>
                                                    Integrate OneUptime with
                                                    your webhooks.
                                                </span>
                                            </span>
                                        </div>
                                        <div className="ContentHeader-end Box-root Flex-flex Flex-alignItems--center Margin-left--16">
                                            <div className="Box-root">
                                                <RenderIfAdmin>
                                                    <WebHookButton
                                                        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ monitorId: any; }' is not assignable to ty... Remove this comment to see the full error message
                                                        monitorId={
                                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'monitorId' does not exist on type 'Reado... Remove this comment to see the full error message
                                                            this.props.monitorId
                                                        }
                                                    />
                                                </RenderIfAdmin>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ monitorId: any; }' is not assignable to ty... Remove this comment to see the full error message
                                <WebHookList monitorId={this.props.monitorId} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
WebHookBox.displayName = 'WebHookBox';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
WebHookBox.propTypes = {
    monitorId: PropTypes.string,
};

export default withRouter(WebHookBox);
