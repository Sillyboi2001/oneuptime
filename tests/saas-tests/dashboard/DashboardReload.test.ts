// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'puppeteer' or its correspondin... Remove this comment to see the full error message
import puppeteer from 'puppeteer'
import utils from '../../test-utils'
import init from '../../test-init'

let browser: $TSFixMe, page: $TSFixMe;
const user = {
    email: utils.generateRandomBusinessEmail(),
    password: '1234567890',
};

/** This is a test to check:
 * No errors on page reload
 * It stays on the same page on reload
 */

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('OneUptime Page Reload', () => {
    const operationTimeOut = init.timeout;

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'beforeAll'.
    beforeAll(async (done: $TSFixMe) => {
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'jest'.
        jest.setTimeout(init.timeout);

        browser = await puppeteer.launch(utils.puppeteerLaunchConfig);
        page = await browser.newPage();
        await page.setUserAgent(utils.agent);

        await init.registerUser(user, page); // This automatically routes to dashboard page
        done();
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'afterAll'.
    afterAll(async (done: $TSFixMe) => {
        await browser.close();
        done();
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the dashboard page and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbHome', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the components page and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#components', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#components');
            await init.pageWaitForSelector(page, '#cbComponents', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbComponents', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the incidents page and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#incidents', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#incidents');
            await init.pageWaitForSelector(page, '#cbIncidents', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbIncidents', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the status-pages and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#statusPages', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#statusPages');
            await init.pageWaitForSelector(page, '#cbStatusPages', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbStatusPages', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the onCall Duty and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#onCallDuty', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#onCallDuty');
            await init.pageWaitForSelector(page, '#cbOn-CallDuty', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbOn-CallDuty', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the Scheduled Maintenance and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#scheduledMaintenance', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#scheduledMaintenance');
            await init.pageWaitForSelector(
                page,
                '#cbScheduledMaintenanceEvent',
                {
                    visible: true,
                    timeout: init.timeout,
                }
            );
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(
                page,
                '#cbScheduledMaintenanceEvent',
                {
                    visible: true,
                    timeout: init.timeout,
                }
            );
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the Reports page and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#reports', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#reports');
            await init.pageWaitForSelector(page, '#cbReports', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbReports', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the Team members and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#teamMembers', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#teamMembers');
            await init.pageWaitForSelector(page, '#cbTeamMembers', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbTeamMembers', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the Project settings and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#projectSettings', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#projectSettings');
            await init.pageWaitForSelector(page, '#cbProjectSettings', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#cbProjectSettings', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'test'. Do you need to install ty... Remove this comment to see the full error message
    test(
        'Should reload the Consulting and Services and confirm there are no errors',
        async (done: $TSFixMe) => {
            await page.goto(utils.DASHBOARD_URL, {
                waitUntil: ['networkidle2'],
            });
            await init.pageWaitForSelector(page, '#consultingServices', {
                visible: true,
                timeout: init.timeout,
            });
            // @ts-expect-error ts-migrate(2554) FIXME: Expected 3 arguments, but got 2.
            await init.pageClick(page, '#consultingServices');
            await init.pageWaitForSelector(page, '#consultingServicesPage', {
                visible: true,
                timeout: init.timeout,
            });
            // To confirm no errors and stays on the same page on reload
            await page.reload({ waitUntil: 'networkidle2' });
            await init.pageWaitForSelector(page, '#consultingServicesPage', {
                visible: true,
                timeout: init.timeout,
            });
            done();
        },
        operationTimeOut
    );
});
