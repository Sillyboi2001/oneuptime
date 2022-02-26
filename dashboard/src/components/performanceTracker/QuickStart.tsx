import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import { Field, reduxForm } from 'redux-form';
import { metricsQuickStart } from '../../config';
import AceCodeEditor from '../basic/AceCodeEditor';
import { RenderSelect } from '../basic/RenderSelect';

function renderLibraries() {
    const list = metricsQuickStart.getLibraries().map(library => {
        return (
            <a
                target="_blank"
                key={library.id}
                href={library.link}
                rel="noreferrer noopener"
            >
                <img
                    style={{
                        width: '30px',
                        height: '30px',
                        margin: '10px',
                    }}
                    src={library.icon}
                    alt={library.iconText}
                />
            </a>
        );
    });
    return list;
}

const QuickStart = ({
    appId,
    appKey,
    close,
    library
}: $TSFixMe) => {
    const guide = metricsQuickStart
        .getQuickStarts(appId, appKey)
        .filter(quickStart => quickStart.id === library)[0];
    return (
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'number | ... Remove this comment to see the full error message
        <div tabIndex="0" className="Box-root Margin-vertical--12">
            <div className="db-Trends bs-ContentSection Card-root Card-shadow--medium">
                <div
                    className="Box-root"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-direction--column Padding-horizontal--20 Padding-vertical--16">
                        <div className="Box-root">
                            <span className="ContentHeader-title Text-color--inherit Text-fontSize--16 Text-fontWeight--medium Text-typeface--base Text-lineHeight--28">
                                <span>Performance Tracker Libraries</span>
                            </span>
                            <span className="ContentHeader-description Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-typeface--base Text-wrap--wrap"></span>
                        </div>
                        <div>{renderLibraries()}</div>
                    </div>
                    <div className="bs-ContentSection-content Box-root Padding-horizontal--20 Padding-vertical--16">
                        <span
                            className="incident-close-button"
                            onClick={close}
                        ></span>
                    </div>
                </div>
                <div className="Box-root">
                    <div
                        className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-direction--column Padding-vertical--16"
                        style={{ paddingTop: 0 }}
                    >
                        <div className="Box-root" style={{ paddingLeft: 20 }}>
                            <span className="ContentHeader-title Text-color--inherit Text-fontSize--16 Text-fontWeight--medium Text-typeface--base Text-lineHeight--28">
                                <span> Quick Start </span>
                            </span>
                            <span className="ContentHeader-description Text-color--inherit Text-display--inline Text-fontSize--14 Text-fontWeight--regular Text-lineHeight--20 Text-typeface--base Text-wrap--wrap"></span>
                        </div>
                        <form id="form-quick-start">
                            <div
                                className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-vertical--2"
                                style={{ boxShadow: 'none' }}
                            >
                                <div>
                                    <div className="bs-Fieldset-wrapper Box-root Margin-bottom--2">
                                        <fieldset className="bs-Fieldset">
                                            <div className="bs-Fieldset-rows">
                                                <div className="bs-Fieldset-row">
                                                    <label className="bs-Fieldset-label">
                                                        Available Libraries
                                                    </label>
                                                    <div className="bs-Fieldset-fields">
                                                        <Field
                                                            className="db-select-nw"
                                                            component={
                                                                RenderSelect
                                                            }
                                                            name="library"
                                                            id="library"
                                                            placeholder="Choose Library"
                                                            options={[
                                                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
                                                                ...(metricsQuickStart.getQuickStarts() &&
                                                                // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
                                                                metricsQuickStart.getQuickStarts()
                                                                    .length > 0
                                                                    ? metricsQuickStart
                                                                          // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 0.
                                                                          .getQuickStarts()
                                                                          .map(
                                                                              library => ({
                                                                                  value:
                                                                                      library.id,
                                                                                  label:
                                                                                      library.language,
                                                                              })
                                                                          )
                                                                    : []),
                                                            ]}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="Box-root">
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'installation' does not exist on type 'st... Remove this comment to see the full error message
                    {guide && guide.performanceTracker.installation ? (
                        <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-direction--column ">
                            <div>
                                <span className="ContentHeader-title Text-color--inherit Text-fontSize--16 Text-fontWeight--medium Text-typeface--base Text-lineHeight--28 Padding-horizontal--20">
                                    <span>
                                        {' '}
                                        {guide &&
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'installation' does not exist on type 'st... Remove this comment to see the full error message
                                        guide.performanceTracker.installation
                                            ? guide.performanceTracker
                                                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'installation' does not exist on type 'st... Remove this comment to see the full error message
                                                  .installation.package
                                            : ''}
                                    </span>
                                </span>

                                <div>
                                    <AceCodeEditor
                                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                        value={
                                            guide &&
                                            guide.performanceTracker
                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'installation' does not exist on type 'st... Remove this comment to see the full error message
                                                .installation
                                                ? guide.performanceTracker
                                                      // @ts-expect-error ts-migrate(2339) FIXME: Property 'installation' does not exist on type 'st... Remove this comment to see the full error message
                                                      .installation.command
                                                : ''
                                        }
                                        name={`quickstart-command`}
                                        readOnly={true}
                                        language={'markdown'}
                                        height={guide && guide.height.install}
                                    />
                                </div>
                                <span className="ContentHeader-title Text-color--inherit Text-fontSize--16 Text-fontWeight--medium Text-typeface--base Text-lineHeight--28 Padding-horizontal--20">
                                    <span>{'Usage'}</span>
                                </span>
                                <div>
                                    <AceCodeEditor
                                        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
                                        value={
                                            guide &&
                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'usage' does not exist on type 'string | ... Remove this comment to see the full error message
                                            guide.performanceTracker.usage
                                                ? guide &&
                                                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'usage' does not exist on type 'string | ... Remove this comment to see the full error message
                                                  guide.performanceTracker.usage
                                                : ''
                                        }
                                        name={`quickstart`}
                                        readOnly={true}
                                        mode="javascript"
                                        height={guide && guide.height.usage}
                                    />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div
                            className="Padding-all--20"
                            style={{ paddingTop: 0 }}
                        >
                            {' '}
                            {guide && guide.performanceTracker}{' '}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

QuickStart.displayName = 'QuickStart';
QuickStart.propTypes = {
    close: PropTypes.func,
    appId: PropTypes.string,
    appKey: PropTypes.string,
    library: PropTypes.string,
};

const mapStateToProps = (state: $TSFixMe) => {
    const initialValues = {
        library: 'js',
    };
    return {
        initialValues,
        library:
            state.form.QuickStartForm &&
            state.form.QuickStartForm.values &&
            state.form.QuickStartForm.values.library,
    };
};

const QuickStartForm = new reduxForm({
    form: 'QuickStartForm',
    destroyOnUnmount: true,
    enableReinitialize: true,
})(QuickStart);

export default connect(mapStateToProps)(QuickStartForm);
