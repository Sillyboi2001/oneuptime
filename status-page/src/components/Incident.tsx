import React, { Component } from 'react';
import { connect } from 'react-redux';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Link } from 'react-router-dom';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Translate } from 'react-auto-translate';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import moment from 'moment';
import Markdown from 'markdown-to-jsx';
import ShouldRender from './ShouldRender';
import {
    getStatusPage,
    fetchIncident,
    fetchIncidentNotes,
    moreIncidentNotes,
    fetchLastIncidentTimeline,
} from '../actions/status';
import { ACCOUNTS_URL } from '../config';
import { ListLoader } from './basic/Loader';

class Incident extends Component {
    handleIncidentStatus: $TSFixMe;
    componentDidMount() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match: { params },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            statusData,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchIncident' does not exist on type 'R... Remove this comment to see the full error message
            fetchIncident,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchIncidentNotes' does not exist on ty... Remove this comment to see the full error message
            fetchIncidentNotes,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchLastIncidentTimeline' does not exis... Remove this comment to see the full error message
            fetchLastIncidentTimeline,
        } = this.props;
        const { incidentSlug } = params;

        if (
            window.location.search.substring(1) &&
            window.location.search.substring(1) === 'embedded=true'
        ) {
            document.getElementsByTagName('html')[0].style.background =
                'none transparent';
        }

        let url, statusPageSlug;

        if (
            window.location.pathname.includes('/status-page/') &&
            window.location.pathname.split('/').length >= 3
        ) {
            statusPageSlug = window.location.pathname.split('/')[2];
            url = 'null';
        } else if (
            window.location.href.indexOf('localhost') > -1 ||
            window.location.href.indexOf('oneuptimeapp.com') > 0
        ) {
            statusPageSlug = window.location.host.split('.')[0];
            url = 'null';
        } else {
            statusPageSlug = 'null';
            url = window.location.host;
        }

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'getStatusPage' does not exist on type 'R... Remove this comment to see the full error message
        this.props.getStatusPage(statusPageSlug, url).catch((err: $TSFixMe) => {
            if (err.message === 'Request failed with status code 401') {
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'login' does not exist on type 'Readonly<... Remove this comment to see the full error message
                const { loginRequired } = this.props.login;
                if (loginRequired) {
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Location'... Remove this comment to see the full error message
                    window.location = `${ACCOUNTS_URL}/login?statusPage=true&statusPageURL=${window.location.href}`;
                }
            }
        });

        if (statusData && statusData._id) {
            fetchLastIncidentTimeline(statusData.projectId._id, incidentSlug);
            fetchIncident(statusData.projectId._id, incidentSlug);
            fetchIncidentNotes(statusData.projectId._id, incidentSlug, true);
        }
    }

    componentDidUpdate(prevProps: $TSFixMe) {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match: { params },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            statusData,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchIncident' does not exist on type 'R... Remove this comment to see the full error message
            fetchIncident,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchIncidentNotes' does not exist on ty... Remove this comment to see the full error message
            fetchIncidentNotes,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchLastIncidentTimeline' does not exis... Remove this comment to see the full error message
            fetchLastIncidentTimeline,
        } = this.props;
        const { incidentSlug } = params;

        if (prevProps.statusData._id !== statusData._id) {
            fetchLastIncidentTimeline(statusData.projectId._id, incidentSlug);
            fetchIncident(statusData.projectId._id, incidentSlug);
            fetchIncidentNotes(statusData.projectId._id, incidentSlug, true);
        }
    }

    more() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            statusData,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'match' does not exist on type 'Readonly<... Remove this comment to see the full error message
            match: { params },
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'skip' does not exist on type 'Readonly<{... Remove this comment to see the full error message
            skip,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'moreIncidentNotes' does not exist on typ... Remove this comment to see the full error message
            moreIncidentNotes,
        } = this.props;
        const { incidentSlug } = params;

        moreIncidentNotes(
            statusData.projectId._id,
            incidentSlug,
            true,
            skip + 1
        );
    }

    renderError = () => {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'status' does not exist on type 'Readonly... Remove this comment to see the full error message
        const { error } = this.props.status;
        if (error === 'Input data schema mismatch.') {
            return 'Page Not Found';
        } else if (error === 'Project Not present') {
            return 'Invalid Project.';
        } else return error;
    };

    handleMonitorList = (monitors: $TSFixMe) => {
        if (monitors) {
            if (monitors.length === 1) {
                return monitors[0].monitorId.name;
            }
            if (monitors.length === 2) {
                return `${monitors[0].monitorId.name} and ${monitors[1].monitorId.name}`;
            }
            if (monitors.length === 3) {
                return `${monitors[0].monitorId.name}, ${monitors[1].monitorId.name} and ${monitors[2].monitorId.name}`;
            }
            if (monitors.length > 3) {
                return `${monitors[0].monitorId.name}, ${
                    monitors[1].monitorId.name
                } and ${monitors.length - 2} others`;
            }
        }
    };

    render() {
        const {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'count' does not exist on type 'Readonly<... Remove this comment to see the full error message
            count,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'history' does not exist on type 'Readonl... Remove this comment to see the full error message
            history,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingIncidentNotes' does not exist on... Remove this comment to see the full error message
            fetchingIncidentNotes,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'fetchingIncident' does not exist on type... Remove this comment to see the full error message
            fetchingIncident,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incident' does not exist on type 'Readon... Remove this comment to see the full error message
            incident,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'incidentNotes' does not exist on type 'R... Remove this comment to see the full error message
            incidentNotes,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'lastIncidentTimeline' does not exist on ... Remove this comment to see the full error message
            lastIncidentTimeline,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            statusData,
        } = this.props;
        const error = this.renderError();

        let downtimeColor, uptimeColor, degradedColor;
        if (
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'requestingStatus' does not exist on type... Remove this comment to see the full error message
            !this.props.requestingStatus &&
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            this.props.statusData &&
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            this.props.statusData.colors
        ) {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
            const colors = this.props.statusData.colors;
            downtimeColor = {
                backgroundColor: `rgba(${colors.downtime.r}, ${colors.downtime.g}, ${colors.downtime.b})`,
            };
            uptimeColor = {
                backgroundColor: `rgba(${colors.uptime.r}, ${colors.uptime.g}, ${colors.uptime.b})`,
            };
            degradedColor = {
                backgroundColor: `rgba(${colors.degraded.r}, ${colors.degraded.g}, ${colors.degraded.b})`,
            };
        }

        return (
            <div
                className="page-main-wrapper"
                style={{ background: 'rgb(247, 247, 247)' }}
            >
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
                {this.props.statusData.theme === 'Clean Theme' && (
                    <div
                        className="new-main-container"
                        style={{
                            maxWidth: 600,
                            margin: 'auto',
                            marginTop: 70,
                            marginBottom: 70,
                        }}
                    >
                        <div style={{ marginBottom: 50 }}>
                            <header
                                className="feed-title"
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: 30,
                                    textAlign: 'center',
                                    // textTransform: 'unset',
                                }}
                            >
                                {incident.title}
                            </header>
                            <p
                                style={{
                                    textAlign: 'center',
                                    fontWeight: '500',
                                    marginBottom: 10,
                                    color: 'rgba(0, 0, 0, 0.6)',
                                    fontSize: 25,
                                }}
                            >
                                Incident Report for{' '}
                                <Link
                                    style={{ color: 'rgba(0, 0, 0, 0.6)' }}
                                    to={`/status-page/${statusData.slug}`}
                                >
                                    {statusData.name}
                                </Link>
                            </p>
                            <ShouldRender if={fetchingIncident}>
                                <ListLoader />
                            </ShouldRender>
                            {!fetchingIncidentNotes &&
                                !fetchingIncident &&
                                incident.createdAt && (
                                    <span
                                        style={{
                                            fontSize: 14,
                                            color: '#AAA',
                                            paddingTop: 7,
                                            display: 'block',
                                        }}
                                    >
                                        <span>
                                            This incident was created on
                                        </span>{' '}
                                        <span className="time">
                                            {moment(incident.createdAt).format(
                                                'MMMM Do YYYY, h:mm a'
                                            )}
                                        </span>
                                    </span>
                                )}
                        </div>
                        <div>
                            <ShouldRender if={fetchingIncidentNotes}>
                                <ListLoader />
                            </ShouldRender>
                            {!fetchingIncidentNotes &&
                                incidentNotes &&
                                incidentNotes.length > 0 &&
                                incidentNotes
                                    .sort((a: $TSFixMe, b: $TSFixMe) => {
                                        (a = moment(a.createdAt)),
                                            (b = moment(b.createdAt));
                                        // order in ascending order
                                        if (b.diff(a) > 0) {
                                            return -1;
                                        } else if (b.diff(a) < 0) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    })
                                    .map((note: $TSFixMe) => <div
                                    key={note._id}
                                    style={{
                                        width: '100%',
                                        display: 'grid',
                                        gridTemplateColumns: '1fr 3fr',
                                        gridColumnGap: 10,
                                        marginTop: 20,
                                    }}
                                >
                                    <div>
                                        <span
                                            style={{
                                                display: 'block',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {note.incident_state}
                                        </span>
                                    </div>
                                    <div>
                                        <span
                                            style={{
                                                color:
                                                    'rgba(0, 0, 0, 0.6)',
                                                fontSize: 14,
                                                display: 'block',
                                                textAlign: 'justify',
                                            }}
                                        >
                                            {note.content && (
                                                <div
                                                    style={{
                                                        whiteSpace:
                                                            'pre-wrap',
                                                    }}
                                                >
                                                    {note.content
                                                        .split('\n')
                                                        .map(
                                                            (
                                                                elem: $TSFixMe,
                                                                index: $TSFixMe
                                                            ) => (
                                                                <Markdown
                                                                    key={`${elem}-${index}`}
                                                                    options={{
                                                                        forceBlock: true,
                                                                    }}
                                                                >
                                                                    {
                                                                        elem
                                                                    }
                                                                </Markdown>
                                                            )
                                                        )}
                                                </div>
                                            )}
                                        </span>
                                        {note.incident_state ===
                                            'Identified' && (
                                            <span
                                                style={{
                                                    display: 'block',
                                                    marginTop: 10,
                                                    color: '#AAA',
                                                    fontSize: 12,
                                                }}
                                            >
                                                <span
                                                    style={{
                                                        fontWeight: 600,
                                                    }}
                                                >
                                                    <Translate>
                                                        Resource
                                                        Affected -
                                                    </Translate>
                                                </span>{' '}
                                                <span>
                                                    {this.handleMonitorList(
                                                        incident.monitors
                                                    )}
                                                </span>
                                            </span>
                                        )}
                                        <span
                                            style={{
                                                display: 'flex',
                                                marginTop: 5,
                                                alignItems: 'center',
                                            }}
                                        >
                                            <span
                                                style={{
                                                    color: '#AAA',
                                                    fontSize: 12,
                                                    display: 'block',
                                                }}
                                            >
                                                Posted on{' '}
                                                {moment(
                                                    note.createdAt
                                                ).format(
                                                    'MMMM Do YYYY, h:mm a'
                                                )}
                                            </span>
                                        </span>
                                    </div>
                                </div>)}

                            {!fetchingIncidentNotes &&
                                incidentNotes &&
                                incidentNotes.length === 0 && (
                                    <div
                                        className="feed-item clearfix"
                                        style={{
                                            minHeight: '5px',
                                            marginBottom: '10px',
                                            display: 'flex',
                                            flexDirection: 'row',
                                            flexWrap: 'nowrap',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <span
                                            className="time"
                                            style={{
                                                fontSize: '0.8em',
                                                marginLeft: '0px',
                                                color: 'rgb(76, 76, 76)',
                                            }}
                                        >
                                            <Translate>
                                                No incident updates yet.
                                            </Translate>
                                        </span>
                                    </div>
                                )}
                        </div>
                    </div>
                )}
                <div className="innernew">
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'statusData' does not exist on type 'Read... Remove this comment to see the full error message
                    {this.props.statusData.theme === 'Classic Theme' && (
                        <>
                            <div
                                id="incident"
                                className="twitter-feed white box"
                                style={{ overflow: 'visible' }}
                            >
                                <div
                                    className="messages"
                                    style={{
                                        position: 'relative',
                                    }}
                                >
                                    <div
                                        className="box-inner"
                                        style={{
                                            paddingTop: 20,
                                            paddingBottom: 20,
                                        }}
                                    >
                                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'requestingStatus' does not exist on type... Remove this comment to see the full error message
                                        {!this.props.requestingStatus &&
                                            !fetchingIncident &&
                                            incident.incidentType && (
                                                <div
                                                    className="incident-bubble"
                                                    style={{
                                                        backgroundColor:
                                                            incident.incidentType ===
                                                            'online'
                                                                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                                                                ? uptimeColor.backgroundColor
                                                                : incident.incidentType ===
                                                                  'offline'
                                                                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                                                                ? downtimeColor.backgroundColor
                                                                // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                                                                : degradedColor.backgroundColor,
                                                    }}
                                                ></div>
                                            )}
                                        <span
                                            style={{
                                                color: 'rgba(76, 76, 76, 0.52)',
                                                textTransform: 'uppercase',
                                                fontWeight: '700',
                                                display: 'inline-block',
                                                marginBottom: 20,
                                                fontSize: 14,
                                                marginLeft: 25,
                                            }}
                                        >
                                            <Translate>Incident</Translate>
                                        </span>
                                        {!fetchingIncident && incident.title && (
                                            <>
                                                <div
                                                    className="individual-header"
                                                    style={{
                                                        marginBottom: incident.description
                                                            ? 25
                                                            : 10,
                                                    }}
                                                >
                                                    <span
                                                        className="feed-title"
                                                        style={{
                                                            color:
                                                                'rgba(76, 76, 76, 0.8)',
                                                            fontWeight: 'bold',
                                                            marginBottom: 10,
                                                            textTransform:
                                                                'unset',
                                                        }}
                                                    >
                                                        {incident.title}
                                                    </span>
                                                    <span
                                                        style={{
                                                            color:
                                                                'rgba(0, 0, 0, 0.5)',
                                                        }}
                                                    >
                                                        {incident.description}
                                                    </span>
                                                </div>
                                                <div
                                                    className="ongoing__affectedmonitor"
                                                    style={{ marginTop: 0 }}
                                                >
                                                    <span
                                                        className="ongoing__affectedmonitor--title"
                                                        style={{
                                                            color:
                                                                'rgba(76, 76, 76, 0.8)',
                                                        }}
                                                    >
                                                        <Translate>
                                                            Resource Affected:
                                                        </Translate>
                                                    </span>{' '}
                                                    <span
                                                        className="ongoing__affectedmonitor--content"
                                                        style={{
                                                            color:
                                                                'rgba(0, 0, 0, 0.5)',
                                                        }}
                                                    >
                                                        {this.handleMonitorList(
                                                            incident.monitors
                                                        )}
                                                    </span>
                                                </div>
                                            </>
                                        )}
                                        {!fetchingIncident &&
                                            lastIncidentTimeline &&
                                            lastIncidentTimeline.status &&
                                            this.handleIncidentStatus()}
                                        <ShouldRender if={fetchingIncident}>
                                            <ListLoader />
                                        </ShouldRender>
                                        {!fetchingIncidentNotes &&
                                            !fetchingIncident &&
                                            incident.createdAt && (
                                                <span
                                                    style={{
                                                        fontSize: 14,
                                                        color:
                                                            'rgba(0, 0, 0, 0.5)',
                                                        paddingTop: 7,
                                                        display: 'block',
                                                    }}
                                                >
                                                    <span>
                                                        <Translate>
                                                            {' '}
                                                            This incident was
                                                            created on
                                                        </Translate>
                                                    </span>{' '}
                                                    <span className="time">
                                                        {moment(
                                                            incident.createdAt
                                                        ).format(
                                                            'MMMM Do YYYY, h:mm a'
                                                        )}
                                                    </span>
                                                </span>
                                            )}
                                    </div>
                                </div>
                            </div>

                            <div
                                id="incidentNotes"
                                className="twitter-feed white box"
                                style={{ overflow: 'visible' }}
                            >
                                <div
                                    className="messages"
                                    style={{ position: 'relative' }}
                                >
                                    <div className="box-inner">
                                        <ShouldRender
                                            if={!fetchingIncidentNotes}
                                        >
                                            <div
                                                className="individual-header"
                                                style={{
                                                    flexDirection: 'row',
                                                    flexWrap: 'nowrap',
                                                }}
                                            >
                                                <span
                                                    className="feed-title"
                                                    style={{
                                                        color:
                                                            'rgba(76, 76, 76, 0.8)',
                                                        fontWeight: 'bold',
                                                    }}
                                                >
                                                    <Translate>
                                                        Incident Updates
                                                    </Translate>
                                                </span>
                                            </div>
                                        </ShouldRender>
                                        <ShouldRender
                                            if={fetchingIncidentNotes}
                                        >
                                            <ListLoader />
                                        </ShouldRender>
                                        <ul className="feed-contents plain">
                                            {!fetchingIncidentNotes &&
                                                incidentNotes &&
                                                incidentNotes.length > 0 &&
                                                incidentNotes.map((note: $TSFixMe) => <li
                                                    key={note._id}
                                                    className="feed-item clearfix"
                                                >
                                                    <div
                                                        className="message"
                                                        style={{
                                                            width: '100%',
                                                            marginLeft: 0,
                                                            background:
                                                                'rgb(247, 247, 247)',
                                                        }}
                                                    >
                                                        <div className="note__wrapper">
                                                            <span
                                                                style={{
                                                                    color:
                                                                        'rgba(0, 0, 0, 0.5)',
                                                                    fontSize: 14,
                                                                    display:
                                                                        'block',
                                                                    textAlign:
                                                                        'justify',
                                                                    whiteSpace:
                                                                        'pre-wrap',
                                                                }}
                                                            >
                                                                {note.content
                                                                    .split(
                                                                        '\n'
                                                                    )
                                                                    .map(
                                                                        (
                                                                            elem: $TSFixMe,
                                                                            index: $TSFixMe
                                                                        ) => (
                                                                            <Markdown
                                                                                key={`${elem}-${index}`}
                                                                                options={{
                                                                                    forceBlock: true,
                                                                                }}
                                                                            >
                                                                                {
                                                                                    elem
                                                                                }
                                                                            </Markdown>
                                                                        )
                                                                    )}
                                                            </span>
                                                            <span
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    marginTop: 15,
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <span
                                                                    style={{
                                                                        color:
                                                                            'rgba(0, 0, 0, 0.5)',
                                                                        fontSize: 12,
                                                                        display:
                                                                            'block',
                                                                    }}
                                                                >
                                                                    Posted
                                                                    on{' '}
                                                                    {moment(
                                                                        note.createdAt
                                                                    ).format(
                                                                        'MMMM Do YYYY, h:mm a'
                                                                    )}
                                                                </span>
                                                                <span
                                                                    style={{
                                                                        marginLeft: 15,
                                                                    }}
                                                                    className="note-badge badge badge__color--green"
                                                                >
                                                                    {
                                                                        note.incident_state
                                                                    }
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </li>)}

                                            {!fetchingIncidentNotes &&
                                                incidentNotes &&
                                                incidentNotes.length === 0 && (
                                                    <li
                                                        className="feed-item clearfix"
                                                        style={{
                                                            minHeight: '5px',
                                                            marginBottom:
                                                                '10px',
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            flexWrap: 'nowrap',
                                                            justifyContent:
                                                                'center',
                                                        }}
                                                    >
                                                        <span
                                                            className="time"
                                                            style={{
                                                                fontSize:
                                                                    '0.8em',
                                                                marginLeft:
                                                                    '0px',
                                                                color:
                                                                    'rgb(76, 76, 76)',
                                                            }}
                                                        >
                                                            <Translate>
                                                                No incident
                                                                updates
                                                            </Translate>
                                                            yet.
                                                        </span>
                                                    </li>
                                                )}
                                        </ul>
                                    </div>
                                    <ShouldRender
                                        if={
                                            incidentNotes.length &&
                                            count > incidentNotes.length &&
                                            !fetchingIncidentNotes
                                        }
                                    >
                                        <button
                                            className="more button-as-anchor anchor-centered"
                                            onClick={() => this.more()}
                                        >
                                            <Translate>More</Translate>
                                        </button>
                                    </ShouldRender>
                                </div>
                            </div>
                        </>
                    )}

                    <ShouldRender if={fetchingIncident}>
                        <div
                            id="app-loading"
                            style={{
                                position: 'fixed',
                                top: '0',
                                bottom: '0',
                                left: '0',
                                right: '0',
                                backgroundColor: '#fdfdfd',
                                zIndex: '999',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <div style={{ transform: 'scale(2)' }}>
                                <svg
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="bs-Spinner-svg"
                                >
                                    <ellipse
                                        cx="12"
                                        cy="12"
                                        rx="10"
                                        ry="10"
                                        className="bs-Spinner-ellipse"
                                    ></ellipse>
                                </svg>
                            </div>
                        </div>
                    </ShouldRender>
                    <div
                        id="footer"
                        style={{ display: 'flex', alignItems: 'center' }}
                    >
                        <span
                            onClick={() => history.goBack()}
                            className="sp__icon sp__icon--back"
                            style={{
                                color: 'rgb(76, 76, 76)',
                                cursor: 'pointer',
                                width: '100%',
                            }}
                        >
                            <Translate>Back to status page</Translate>
                        </span>
                        <p>
                            <a
                                href="https://oneuptime.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: 'rgb(76, 76, 76)' }}
                            >
                                <Translate>Powered by</Translate> OneUptime
                            </a>
                        </p>
                    </div>
                    <ShouldRender if={error}>
                        <div id="app-loading">
                            <div>{error}</div>
                        </div>
                    </ShouldRender>
                </div>
            </div>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
Incident.displayName = 'Incident';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
Incident.propTypes = {
    match: PropTypes.object,
    statusData: PropTypes.object,
    getStatusPage: PropTypes.func,
    login: PropTypes.object.isRequired,
    history: PropTypes.object,
    fetchIncident: PropTypes.func,
    fetchIncidentNotes: PropTypes.func,
    moreIncidentNotes: PropTypes.func,
    count: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    skip: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    fetchingIncidentNotes: PropTypes.bool,
    fetchingIncident: PropTypes.bool,
    incident: PropTypes.object,
    incidentNotes: PropTypes.array,
    requestingStatus: PropTypes.bool,
    fetchLastIncidentTimeline: PropTypes.func,
    lastIncidentTimeline: PropTypes.object,
    status: PropTypes.object,
};

const mapStateToProps = (state: $TSFixMe) => {
    return {
        statusData: state.status.statusPage,
        login: state.login,
        skip: state.status.incidentNotes.skip,
        count: state.status.incidentNotes.count,
        fetchingIncidentNotes: state.status.incidentNotes.requesting,
        fetchingIncident: state.status.incident.requesting,
        incident: state.status.incident.incident,
        incidentNotes: state.status.incidentNotes.notes,
        requestingStatus: state.status.requesting,
        requestingTimeline: state.status.lastIncidentTimeline.requesting,
        lastIncidentTimeline: state.status.lastIncidentTimeline.timeline,
        status: state.status,
    };
};

const mapDispatchToProps = (dispatch: $TSFixMe) => bindActionCreators(
    {
        getStatusPage,
        fetchIncident,
        fetchIncidentNotes,
        moreIncidentNotes,
        fetchLastIncidentTimeline,
    },
    dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Incident);
