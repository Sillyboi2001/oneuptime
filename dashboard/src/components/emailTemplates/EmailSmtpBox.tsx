import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Component } from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'redu... Remove this comment to see the full error message
import { reduxForm, Field } from 'redux-form';
import {
    setSmtpConfig,
    postSmtpConfig,
    deleteSmtpConfig,
    updateSmtpConfig,
    deleteSmtpConfigError,
} from '../../actions/emailTemplates';
import { RenderField } from '../basic/RenderField';
import { Validate } from '../../config';
import IsAdmin from '../basic/IsAdmin';
import IsOwner from '../basic/IsOwner';
import { FormLoader } from '../basic/Loader';
import ShouldRender from '../basic/ShouldRender';
import PropTypes from 'prop-types';

const validate = (values: $TSFixMe, props: $TSFixMe) => {
    const errors = {};
    if (props.showEmailSmtpConfiguration) {
        if (values.user) {
            if (!Validate.text(values.user)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.
                errors.user = 'Please input username in text format .';
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'user' does not exist on type '{}'.
            errors.user = 'Please input username this cannot be left blank.';
        }

        if (!values.pass || !values.pass.length) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'pass' does not exist on type '{}'.
            errors.pass = 'Please input password this cannot be left blank.';
        }

        if (values.port) {
            if (!Validate.number(values.port)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'port' does not exist on type '{}'.
                errors.port = 'Please input port in number format .';
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'port' does not exist on type '{}'.
            errors.port = 'Please input port this cannot be left blank.';
        }

        if (values.host) {
            if (!Validate.text(values.host)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'host' does not exist on type '{}'.
                errors.host = 'Please input host in proper format .';
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'host' does not exist on type '{}'.
            errors.host = 'Please input host this cannot be left blank.';
        }

        if (values.from) {
            if (!Validate.email(values.from)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'from' does not exist on type '{}'.
                errors.from = 'Please input valid email.';
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'from' does not exist on type '{}'.
            errors.from =
                'Please input from address this cannot be left blank.';
        }

        if (values.name) {
            if (!Validate.text(values.name)) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'from' does not exist on type '{}'.
                errors.from = 'Please input name in proper format .';
            }
        } else {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type '{}'.
            errors.name = 'Please input name this cannot be left blank.';
        }
    }
    return errors;
};

export class EmailSmtpBox extends Component {
    constructor(props: $TSFixMe) {
        super(props);
        this.changeValue = this.changeValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitForm = (values: $TSFixMe) => {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
            smtpConfigurations,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'updateSmtpConfig' does not exist on type... Remove this comment to see the full error message
            updateSmtpConfig,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'postSmtpConfig' does not exist on type '... Remove this comment to see the full error message
            postSmtpConfig,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentProject' does not exist on type '... Remove this comment to see the full error message
            currentProject,
        } = this.props;

        if (values.smtpswitch) {
            if (!values.secure) {
                values.secure = false;
            }
            if (smtpConfigurations.config && smtpConfigurations.config._id) {
                updateSmtpConfig(
                    currentProject._id,
                    smtpConfigurations.config._id,
                    values
                );
            } else {
                postSmtpConfig(currentProject._id, values);
            }
        } else {
            if (smtpConfigurations.config._id) {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'deleteSmtpConfig' does not exist on type... Remove this comment to see the full error message
                this.props.deleteSmtpConfig(
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentProject' does not exist on type '... Remove this comment to see the full error message
                    this.props.currentProject._id,
                    smtpConfigurations.config._id,
                    values
                );
            }
        }
    };

    changeValue = (e: $TSFixMe) => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'setSmtpConfig' does not exist on type 'R... Remove this comment to see the full error message
        this.props.setSmtpConfig(e.target.checked);
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'deleteSmtpConfigError' does not exist on... Remove this comment to see the full error message
        this.props.deleteSmtpConfigError('');
    };

    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'handleSubmit' does not exist on type 'Re... Remove this comment to see the full error message
        const { handleSubmit, change } = this.props;

        return (
            <div
                className="db-World-contentPane Box-root"
                style={{ paddingTop: 0 }}
            >
                <div className="db-RadarRulesLists-page">
                    <div className="bs-ContentSection Card-root Card-shadow--medium">
                        <div className="Box-root">
                            <div className="bs-ContentSection-content Box-root Box-divider--surface-bottom-1 Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--16">
                                <div className="Box-root">
                                    <span className="Text-color--inherit Text-display--inline Text-fontSize--16 Text-fontWeight--medium Text-lineHeight--24 Text-typeface--base Text-wrap--wrap">
                                        <span>Custom SMTP Settings</span>
                                    </span>
                                    <p>
                                        <span>
                                            Send emails via your SMTP server
                                            instead of OneUptime&#39;s default
                                            SMTP server.
                                        </span>
                                    </p>
                                </div>
                            </div>
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentProject' does not exist on type '... Remove this comment to see the full error message
                            {IsAdmin(this.props.currentProject) ||
                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentProject' does not exist on type '... Remove this comment to see the full error message
                            IsOwner(this.props.currentProject) ? (
                                <form onSubmit={handleSubmit(this.submitForm)}>
                                    <div className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-horizontal--8 Padding-vertical--2">
                                        <div>
                                            <div className="bs-Fieldset-wrapper Box-root Margin-bottom--2">
                                                <fieldset className="bs-Fieldset">
                                                    <div className="bs-Fieldset-rows">
                                                        <div className="bs-Fieldset-row email-smt-row">
                                                            <div className="Box-root Margin-bottom--12">
                                                                <div
                                                                    data-test="RetrySettings-failedPaymentsRow"
                                                                    className="Box-root"
                                                                >
                                                                    <label
                                                                        id="showsmtpForm"
                                                                        className="Checkbox responsive"
                                                                        htmlFor="smtpswitch"
                                                                        style={{
                                                                            width:
                                                                                '18.5rem',
                                                                        }}
                                                                    >
                                                                        <Field
                                                                            component="input"
                                                                            type="checkbox"
                                                                            name="smtpswitch"
                                                                            data-test="RetrySettings-failedPaymentsCheckbox"
                                                                            className="Checkbox-source"
                                                                            id="smtpswitch"
                                                                            onChange={
                                                                                this
                                                                                    .changeValue
                                                                            }
                                                                            disabled={
                                                                                !IsAdmin(
                                                                                    this
                                                                                        .props
                                                                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentProject' does not exist on type '... Remove this comment to see the full error message
                                                                                        .currentProject
                                                                                ) &&
                                                                                !IsOwner(
                                                                                    this
                                                                                        .props
                                                                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'currentProject' does not exist on type '... Remove this comment to see the full error message
                                                                                        .currentProject
                                                                                )
                                                                            }
                                                                        />
                                                                        <div className="Checkbox-box Box-root Margin-top--2 Margin-right--2">
                                                                            <div className="Checkbox-target Box-root">
                                                                                <div className="Checkbox-color Box-root"></div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="Checkbox-label Box-root Margin-left--8">
                                                                            <span className="Text-color--default Text-display--inline Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-typeface--base Text-wrap--wrap">
                                                                                <span>
                                                                                    Enable
                                                                                    SMTP
                                                                                    Configuration
                                                                                </span>
                                                                            </span>
                                                                        </div>
                                                                    </label>
                                                                    <div className="Box-root Padding-left--24">
                                                                        <div className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--column Flex-justifyContent--flexStart">
                                                                            <div className="Box-root">
                                                                                <div className="Box-root"></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ShouldRender
                                                            if={
                                                                this.props
                                                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'showEmailSmtpConfiguration' does not exi... Remove this comment to see the full error message
                                                                    .showEmailSmtpConfiguration
                                                            }
                                                        >
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <label className="bs-Fieldset-label">
                                                                    Email
                                                                </label>
                                                                <div className="bs-Fieldset-fields">
                                                                    <Field
                                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                                        component={
                                                                            RenderField
                                                                        }
                                                                        type="text"
                                                                        name="user"
                                                                        id="user"
                                                                        placeholder="SMTP Username"
                                                                        required="required"
                                                                        disabled={
                                                                            this
                                                                                .props
                                                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                .smtpConfigurations
                                                                                .requesting
                                                                        }
                                                                    />
                                                                    <p className="bs-Fieldset-explanation">
                                                                        <span>
                                                                            Username
                                                                            for
                                                                            SMTP
                                                                            server.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <label className="bs-Fieldset-label">
                                                                    Password
                                                                </label>
                                                                <div className="bs-Fieldset-fields">
                                                                    <Field
                                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                                        component={
                                                                            RenderField
                                                                        }
                                                                        type="password"
                                                                        name="pass"
                                                                        id="pass"
                                                                        placeholder="SMTP Password"
                                                                        required="required"
                                                                        disabled={
                                                                            this
                                                                                .props
                                                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                .smtpConfigurations
                                                                                .requesting
                                                                        }
                                                                    />
                                                                    <p className="bs-Fieldset-explanation">
                                                                        <span>
                                                                            Password
                                                                            for
                                                                            SMTP
                                                                            server.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <label className="bs-Fieldset-label">
                                                                    SMTP Host
                                                                </label>
                                                                <div className="bs-Fieldset-fields">
                                                                    <Field
                                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                                        component={
                                                                            RenderField
                                                                        }
                                                                        type="text"
                                                                        name="host"
                                                                        id="host"
                                                                        placeholder="smtp.yourcompany.com"
                                                                        required="required"
                                                                        disabled={
                                                                            this
                                                                                .props
                                                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                .smtpConfigurations
                                                                                .requesting
                                                                        }
                                                                    />
                                                                    <p className="bs-Fieldset-explanation">
                                                                        <span>
                                                                            SMTP
                                                                            Server
                                                                            address.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <label className="bs-Fieldset-label">
                                                                    SMTP Port
                                                                </label>
                                                                <div className="bs-Fieldset-fields">
                                                                    <Field
                                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                                        component={
                                                                            RenderField
                                                                        }
                                                                        type="text"
                                                                        name="port"
                                                                        id="port"
                                                                        placeholder="465"
                                                                        required="required"
                                                                        disabled={
                                                                            this
                                                                                .props
                                                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                .smtpConfigurations
                                                                                .requesting
                                                                        }
                                                                        onChange={(
                                                                            event: $TSFixMe,
                                                                            value: $TSFixMe
                                                                        ) => {
                                                                            if (
                                                                                value ===
                                                                                '465'
                                                                            ) {
                                                                                change(
                                                                                    'secure',
                                                                                    true
                                                                                );
                                                                            } else {
                                                                                change(
                                                                                    'secure',
                                                                                    false
                                                                                );
                                                                            }
                                                                        }}
                                                                    />
                                                                    <p className="bs-Fieldset-explanation">
                                                                        <span>
                                                                            Port
                                                                            SMTP
                                                                            is
                                                                            running
                                                                            on.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <label className="bs-Fieldset-label">
                                                                    From Email
                                                                </label>
                                                                <div className="bs-Fieldset-fields">
                                                                    <Field
                                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                                        component={
                                                                            RenderField
                                                                        }
                                                                        type="text"
                                                                        name="from"
                                                                        id="from"
                                                                        placeholder="email@mycompany.com"
                                                                        required="required"
                                                                        disabled={
                                                                            this
                                                                                .props
                                                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                .smtpConfigurations
                                                                                .requesting
                                                                        }
                                                                    />
                                                                    <p className="bs-Fieldset-explanation">
                                                                        <span>
                                                                            Email
                                                                            address
                                                                            where
                                                                            emails
                                                                            will
                                                                            be
                                                                            sent
                                                                            from.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <label className="bs-Fieldset-label">
                                                                    From Name
                                                                </label>
                                                                <div className="bs-Fieldset-fields">
                                                                    <Field
                                                                        className="db-BusinessSettings-input TextInput bs-TextInput"
                                                                        component={
                                                                            RenderField
                                                                        }
                                                                        type="text"
                                                                        name="name"
                                                                        id="name"
                                                                        placeholder="From Name"
                                                                        required="required"
                                                                        disabled={
                                                                            this
                                                                                .props
                                                                                // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                .smtpConfigurations
                                                                                .requesting
                                                                        }
                                                                    />
                                                                    <p className="bs-Fieldset-explanation">
                                                                        <span>
                                                                            Name
                                                                            that
                                                                            will
                                                                            be
                                                                            used
                                                                            in
                                                                            emails.
                                                                        </span>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div className="bs-Fieldset-row email-smt-row">
                                                                <div className="Box-root Margin-bottom--12">
                                                                    <div
                                                                        data-test="RetrySettings-failedPaymentsRow"
                                                                        className="Box-root"
                                                                    >
                                                                        <label
                                                                            id="enableSecureTransport"
                                                                            className="Checkbox responsive"
                                                                            htmlFor="secure"
                                                                            style={{
                                                                                marginLeft:
                                                                                    '11px',
                                                                            }}
                                                                        >
                                                                            <Field
                                                                                component="input"
                                                                                type="checkbox"
                                                                                name="secure"
                                                                                data-test="RetrySettings-failedPaymentsCheckbox"
                                                                                className="Checkbox-source"
                                                                                id="secure"
                                                                                disabled={
                                                                                    this
                                                                                        .props
                                                                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                                        .smtpConfigurations
                                                                                        .requesting
                                                                                }
                                                                            />
                                                                            <div className="Checkbox-box Box-root Margin-top--2 Margin-right--2">
                                                                                <div className="Checkbox-target Box-root">
                                                                                    <div className="Checkbox-color Box-root"></div>
                                                                                </div>
                                                                            </div>
                                                                            <div className="Checkbox-label Box-root Margin-left--8">
                                                                                <span className="Text-color--default Text-display--inline Text-fontSize--14 Text-fontWeight--medium Text-lineHeight--20 Text-typeface--base Text-wrap--wrap">
                                                                                    <span>
                                                                                        Enable
                                                                                        Secure
                                                                                        Transport
                                                                                    </span>
                                                                                </span>
                                                                                <label className="bs-Fieldset-explanation">
                                                                                    <span>
                                                                                        Enabled
                                                                                        for
                                                                                        port
                                                                                        465,
                                                                                        disabled
                                                                                        for
                                                                                        port
                                                                                        587
                                                                                    </span>
                                                                                </label>
                                                                            </div>
                                                                        </label>
                                                                        <div className="Box-root Padding-left--24">
                                                                            <div className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--column Flex-justifyContent--flexStart">
                                                                                <div className="Box-root">
                                                                                    <div className="Box-root"></div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </ShouldRender>
                                                    </div>
                                                </fieldset>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bs-ContentSection-footer bs-ContentSection-content Box-root Box-background--white Flex-flex Flex-alignItems--center Flex-justifyContent--spaceBetween Padding-horizontal--20 Padding-vertical--12">
                                        <span className="db-SettingsForm-footerMessage">
                                            <ShouldRender
                                                if={
                                                    this.props
                                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                        .smtpConfigurations
                                                        .error ||
                                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'emailSmtpDelete' does not exist on type ... Remove this comment to see the full error message
                                                    this.props.emailSmtpDelete
                                                        .error
                                                }
                                            >
                                                <div className="bs-Tail-copy">
                                                    <div
                                                        className="Box-root Flex-flex Flex-alignItems--stretch Flex-direction--row Flex-justifyContent--flexStart"
                                                        style={{
                                                            marginTop: '10px',
                                                        }}
                                                    >
                                                        <div className="Box-root Margin-right--8">
                                                            <div className="Icon Icon--info Icon--color--red Icon--size--14 Box-root Flex-flex"></div>
                                                        </div>
                                                        <div className="Box-root">
                                                            <span
                                                                style={{
                                                                    color:
                                                                        'red',
                                                                }}
                                                                id="errorInfo"
                                                            >
                                                                {this.props
                                                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                                    .smtpConfigurations
                                                                    .error ||
                                                                    this.props
                                                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'emailSmtpDelete' does not exist on type ... Remove this comment to see the full error message
                                                                        .emailSmtpDelete
                                                                        .error}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </ShouldRender>
                                        </span>

                                        <div>
                                            <button
                                                className="bs-Button bs-DeprecatedButton bs-Button--blue"
                                                disabled={
                                                    this.props
                                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                        .smtpConfigurations
                                                        .requesting ||
                                                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'emailSmtpDelete' does not exist on type ... Remove this comment to see the full error message
                                                    this.props.emailSmtpDelete
                                                        .requesting
                                                }
                                                type="submit"
                                                id="saveSmtp"
                                            >
                                                <ShouldRender
                                                    if={
                                                        !this.props
                                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                            .smtpConfigurations
                                                            .requesting &&
                                                        !this.props
                                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'emailSmtpDelete' does not exist on type ... Remove this comment to see the full error message
                                                            .emailSmtpDelete
                                                            .requesting
                                                    }
                                                >
                                                    <span>Save</span>
                                                </ShouldRender>

                                                <ShouldRender
                                                    if={
                                                        this.props
                                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'smtpConfigurations' does not exist on ty... Remove this comment to see the full error message
                                                            .smtpConfigurations
                                                            .requesting ||
                                                        this.props
                                                            // @ts-expect-error ts-migrate(2339) FIXME: Property 'emailSmtpDelete' does not exist on type ... Remove this comment to see the full error message
                                                            .emailSmtpDelete
                                                            .requesting
                                                    }
                                                >
                                                    <span id="saveSmtpLoading">
                                                        <FormLoader />
                                                    </span>
                                                </ShouldRender>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div
                                    className="bs-ContentSection-content Box-root Box-background--offset Box-divider--surface-bottom-1 Padding-vertical--2"
                                    style={{ boxShadow: 'none' }}
                                >
                                    <div
                                        className="bs-Fieldset-row"
                                        style={{ textAlign: 'center' }}
                                    >
                                        <label
                                            className="bs-Fieldset-label"
                                            style={{ flex: 'none' }}
                                        >
                                            Custom SMTP settings are available
                                            to only admins and owners.
                                        </label>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
EmailSmtpBox.displayName = 'EmailSmtpBox';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
EmailSmtpBox.propTypes = {
    smtpConfigurations: PropTypes.object,
    updateSmtpConfig: PropTypes.func,
    postSmtpConfig: PropTypes.func,
    currentProject: PropTypes.object,
    deleteSmtpConfig: PropTypes.func,
    setSmtpConfig: PropTypes.func,
    handleSubmit: PropTypes.func,
    showEmailSmtpConfiguration: PropTypes.bool,
    emailSmtpDelete: PropTypes.object,
    deleteSmtpConfigError: PropTypes.func,
    change: PropTypes.func, // redux-form action for changing value
};

const EmailSmtpBoxForm = reduxForm({
    form: 'EmailSmtpBox', // a unique identifier for this form
    enableReinitialize: true,
    validate, // <--- validation function given to redux-for
})(EmailSmtpBox);

const mapDispatchToProps = (dispatch: $TSFixMe) => {
    return bindActionCreators(
        {
            setSmtpConfig,
            postSmtpConfig,
            deleteSmtpConfig,
            updateSmtpConfig,
            deleteSmtpConfigError,
        },
        dispatch
    );
};

function mapStateToProps(state: $TSFixMe) {
    const smtpConfigurations =
        state.emailTemplates && state.emailTemplates.emailSmtpConfiguration;
    const showEmailSmtpConfiguration =
        state.emailTemplates && state.emailTemplates.showEmailSmtpConfiguration;
    let values = {
        smtpswitch: false,
        user: '',
        pass: '',
        host: '',
        port: '',
        from: '',
        name: '',
        secure: true,
    };
    if (showEmailSmtpConfiguration) {
        values = {
            smtpswitch: true,
            user: smtpConfigurations.config.user,
            pass: smtpConfigurations.config.pass,
            host: smtpConfigurations.config.host,
            port: smtpConfigurations.config.port,
            from: smtpConfigurations.config.from,
            name: smtpConfigurations.config.name,
            secure: smtpConfigurations.config.secure,
        };
    }
    return {
        currentProject: state.project.currentProject,
        smtpConfigurations,
        initialValues: values,
        emailSmtpDelete:
            state.emailTemplates && state.emailTemplates.emailSmtpDelete,
        showEmailSmtpConfiguration,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailSmtpBoxForm);
