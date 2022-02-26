import { getApi } from '../api';
import * as types from '../constants/probe';
import errors from '../errors';

// Fetch Project Probes list
export function getProbes(projectId: $TSFixMe, skip: $TSFixMe, limit: $TSFixMe) {
    skip = parseInt(skip);
    limit = parseInt(limit);

    return function(dispatch: $TSFixMe) {
        let promise = null;
        if (skip >= 0 && limit >= 0) {
            promise = getApi(
                `status-page/${projectId}/probes?skip=${skip}&limit=${limit}`
            );
        } else {
            promise = getApi(`status-page/${projectId}/probes`);
        }
        dispatch(probeRequest(promise));

        promise.then(
            function(probes) {
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                probes.data.skip = skip || 0;
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                probes.data.limit = limit || 10;
                // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                dispatch(probeSuccess(probes.data));
            },
            function(error) {
                if (error && error.response && error.response.data)
                    error = error.response.data;
                if (error && error.data) {
                    error = error.data;
                }
                if (error && error.message) {
                    error = error.message;
                } else {
                    error = 'Network Error';
                }
                dispatch(probeError(errors(error)));
            }
        );

        return promise;
    };
}

export function probeRequest(promise: $TSFixMe) {
    return {
        type: types.PROBE_REQUEST,
        payload: promise,
    };
}

export function probeError(error: $TSFixMe) {
    return {
        type: types.PROBE_FAILED,
        payload: error,
    };
}

export function probeSuccess(probes: $TSFixMe) {
    return {
        type: types.PROBE_SUCCESS,
        payload: probes,
    };
}

export const resetProbe = () => {
    return {
        type: types.PROBE_RESET,
    };
};
