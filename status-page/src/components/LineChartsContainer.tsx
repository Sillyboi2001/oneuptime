import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { fetchMonitorLogs } from '../actions/status';
import AreaChart from './areachart';

const ChartContainer = ({
    label,
    name,
    data
}: $TSFixMe) => (
    <Fragment>
        <span style={{ fontSize: '13px', display: 'block', marginTop: '10px' }}>
            {label}
        </span>
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: any; data: any; }' is not assignable... Remove this comment to see the full error message
        <AreaChart name={name} data={data} />
    </Fragment>
);

ChartContainer.displayName = 'ChartContainer';

ChartContainer.propTypes = {
    label: PropTypes.string,
    name: PropTypes.string,
    data: PropTypes.array.isRequired,
};

class LineChartsContainer extends React.Component {
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'monitor' does not exist on type 'Readonl... Remove this comment to see the full error message
        const { _id: monitorId } = this.props.monitor;
        let requesting = true;
        let data = [];
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'logs' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        for (const log of this.props.logs) {
            if (log.monitorId === monitorId) {
                requesting = log.requesting;
                data = log.logs;
                break;
            }
        }

        if (requesting) return null;

        let earliestDate =
            data.length === 0 ? Date.now() : data[data.length - 1].createdAt;
        while (data.length < 90) {
            earliestDate = moment(earliestDate)
                .subtract(1, 'day')
                .format();
            data.push({
                createdAt: earliestDate,
                cpuLoad: 0,
                memoryUsed: 0,
                storageUsed: 0,
                mainTemp: 0,
                responseTime: 0,
            });
        }

        return (
            <Fragment>
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCharts' does not exist on type '... Remove this comment to see the full error message
                {this.props.selectedCharts.memory && (
                    <ChartContainer label="Memory" name="memory" data={data} />
                )}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCharts' does not exist on type '... Remove this comment to see the full error message
                {this.props.selectedCharts.cpu && (
                    <ChartContainer label="CPU" name="load" data={data} />
                )}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCharts' does not exist on type '... Remove this comment to see the full error message
                {this.props.selectedCharts.storage && (
                    <ChartContainer label="Storage" name="disk" data={data} />
                )}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCharts' does not exist on type '... Remove this comment to see the full error message
                {this.props.selectedCharts.responseTime && (
                    <ChartContainer
                        label="Response time"
                        name="response time"
                        data={data}
                    />
                )}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCharts' does not exist on type '... Remove this comment to see the full error message
                {this.props.selectedCharts.temperature && (
                    <ChartContainer
                        label="Temperature"
                        name="temperature"
                        data={data}
                    />
                )}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'selectedCharts' does not exist on type '... Remove this comment to see the full error message
                {this.props.selectedCharts.runtime && (
                    <ChartContainer
                        label="Runtime"
                        name="runtime"
                        data={data}
                    />
                )}
            </Fragment>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
LineChartsContainer.displayName = 'LineChartsContainer';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
LineChartsContainer.propTypes = {
    monitor: PropTypes.object,
    selectedCharts: PropTypes.object.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchMonitorLogs: PropTypes.func.isRequired,
    logs: PropTypes.array.isRequired,
};

const mapStateToProps = (state: $TSFixMe) => {
    const {
        status: { logs },
    } = state;
    return { logs };
};
const mapDispatchToProps = (dispatch: $TSFixMe) => bindActionCreators(
    {
        fetchMonitorLogs,
    },
    dispatch
);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LineChartsContainer);
