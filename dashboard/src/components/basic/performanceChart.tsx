import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Spinner } from '../basic/Loader';
import {
    ResponsiveContainer,
    AreaChart as Chart,
    Area,
    CartesianGrid,
    Tooltip,
    YAxis,
    XAxis,
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'rech... Remove this comment to see the full error message
} from 'recharts';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'loda... Remove this comment to see the full error message
import * as _ from 'lodash';
import moment from 'moment';

const noDataStyle = {
    textAlign: 'center',
    flexBasis: 1,
};

const CustomTooltip = ({
    active,
    payload
}: $TSFixMe) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                {payload[0].payload.name ? (
                    <>
                        <h3>{payload[0].payload.name}</h3>
                        <p className="label">{`${payload[0].name} : ${payload[0].payload.display}`}</p>
                    </>
                ) : (
                    <h3>No data available</h3>
                )}
            </div>
        );
    }

    return null;
};

CustomTooltip.displayName = 'CustomTooltip';

CustomTooltip.propTypes = {
    active: PropTypes.bool,
    payload: PropTypes.array,
};

class PerformanceChart extends Component {
    calcPercent = (val: $TSFixMe, total: $TSFixMe) => {
        val = parseFloat(val);
        total = parseFloat(total);

        if (isNaN(val) || isNaN(total)) {
            return 0;
        }
        if (!total || total === 0) {
            return 0;
        }
        if (!val || val === 0) {
            return 0;
        }

        return (val / total) * 100;
    };

    parseDate(a: $TSFixMe) {
        if (moment(a).isValid()) {
            return new Date(a).toLocaleString();
        }
        return '';
    }
    getTime(a: $TSFixMe) {
        if (moment(a).isValid()) {
            return moment(a).format('LT');
        }
        return '';
    }
    render() {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'Readonly<{... Remove this comment to see the full error message
        const { data, name, symbol, requesting, type } = this.props;
        let processedData = [{ display: '', name: '', v: '' }];
        if (requesting) {
            return (
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ textAlign: string; flexBasis: number; }' i... Remove this comment to see the full error message
                <div style={noDataStyle}>
                    <div
                        className="Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            fontSize: 14,
                            fontWeight: '500',
                            margin: 0,
                            color: '#4c4c4c',
                            lineHeight: 1.6,
                        }}
                    >
                        <Spinner style={{ stroke: '#8898aa' }} />{' '}
                        <span style={{ width: 10 }} />
                        We&apos;re currently in the process of collecting data
                        for this monitor. <br />
                        More info will be available in few minutes
                    </div>
                </div>
            );
        }
        if (data && data.length > 0) {
            processedData = data.map((a: $TSFixMe) => {
                return {
                    name: a.intervalDate || this.parseDate(a.createdAt),
                    v: a.value,
                    display: `${a.value || 0} ${symbol || ''}`,
                    xData: a.createdAt,
                };
            });
        } else {
            return (
                // @ts-expect-error ts-migrate(2322) FIXME: Type '{ textAlign: string; flexBasis: number; }' i... Remove this comment to see the full error message
                <div style={noDataStyle}>
                    <div
                        className="Box-root Flex-flex Flex-alignItems--center Flex-justifyContent--center"
                        style={{
                            textAlign: 'center',
                            width: '100%',
                            fontSize: 14,
                            fontWeight: '500',
                            margin: 0,
                            color: '#4c4c4c',
                            lineHeight: 1.6,
                        }}
                    >
                        No{' '}
                        {type === 'transactionTime'
                            ? 'web transaction time'
                            : type === 'errorRate'
                            ? 'error rate'
                            : 'throughput'}{' '}
                        metric data at the moment, please make sure you&apos;ve
                        setup the performance tracker with the appropriate quick
                        start guide
                    </div>
                </div>
            );
        }
        return (
            <ResponsiveContainer width="100%" height={200}>
                <Chart data={processedData}>
                    <Tooltip content={<CustomTooltip />} />
                    <CartesianGrid vertical={false} strokeDasharray="3 3" />
                    <YAxis
                        type="number"
                        domain={[0, 'dataMax']}
                        allowDecimals={false}
                        axisLine={false}
                        tickLine={false}
                        mirror={true}
                        tickMargin={-10}
                    />
                    <XAxis
                        axisLine={false}
                        tickLine={false}
                        padding={{ left: 30 }}
                        dataKey={'xData'}
                        tickFormatter={this.getTime}
                        tickMargin={10}
                    />
                    <Area
                        type="linear"
                        isAnimationActive={false}
                        name={_.startCase(_.toLower(`${name}`))}
                        dataKey="v"
                        stroke="#000000"
                        strokeWidth={1.5}
                        fill="#e2e1f2"
                    />
                </Chart>
            </ResponsiveContainer>
        );
    }
}

// @ts-expect-error ts-migrate(2339) FIXME: Property 'displayName' does not exist on type 'typ... Remove this comment to see the full error message
PerformanceChart.displayName = 'PerformanceChart';

// @ts-expect-error ts-migrate(2339) FIXME: Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
PerformanceChart.propTypes = {
    data: PropTypes.array,
    name: PropTypes.string,
    symbol: PropTypes.string,
    requesting: PropTypes.bool,
    type: PropTypes.string,
};

export default connect(null)(PerformanceChart);
