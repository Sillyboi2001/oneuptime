/**
 *
 * Copyright HackerBay, Inc.
 *
 */
const getApi = require('../utils/api').getApi;
const ApiMonitors = require('./apiMonitors');
const UrlMonitors = require('./urlMonitors');
const DeviceMonitors = require('./deviceMonitors');
const ScriptMonitors = require('./scriptMonitors');
const ErrorService = require('../utils/errorService');
const ApplicationSecurity = require('./applicationSecurity');
const ContainerSecurity = require('./containerSecurity');

module.exports = {
    runJob: async function () {
        try {
            let monitors = await getApi('probe/monitors');
            monitors = monitors.data;
            await Promise.all(
                monitors.map(monitor => {
                    if (monitor.type === 'api') {
                        return ApiMonitors.ping(monitor);
                    } else if (monitor.type === 'url') {
                        return UrlMonitors.ping(monitor);
                    } else if (monitor.type === 'device') {
                        return DeviceMonitors.ping(monitor);
                    } else if (monitor.type === 'script') {
                        return ScriptMonitors.run(monitor);
                    }

                    return null;
                })
            );
        } catch (error) {
            ErrorService.log('getApi', error);
        }
    },
    runApplicationScan: async function () {
        try {
            const securities = await getApi('probe/applicationSecurities');
            if (securities && securities.length > 0) {
                await Promise.all(
                    securities.map(security => {
                        return ApplicationSecurity.scan(security);
                    })
                );
            }

            return;
        } catch (error) {
            ErrorService.log('runApplicationScan.getApi', error);
        }
    },
    runContainerScan: async function () {
        try {
            const securities = await getApi('probe/containerSecurities');
            if (securities && securities.length > 0) {
                await Promise.all(
                    securities.map(security => {
                        return ContainerSecurity.scan(security);
                    })
                );
            }

            return;
        } catch (error) {
            ErrorService.log('runContainerScan.getApi', error);
        }
    },
};
