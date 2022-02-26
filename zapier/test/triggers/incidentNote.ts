require('should');

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'zapier-platform-core' or its c... Remove this comment to see the full error message
import zapier from 'zapier-platform-core'

import App from '../../index'

const appTester = zapier.createAppTester(App);

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('incidentNote Trigger', () => {
    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('passes authentication and returns an incident Note', (done: $TSFixMe) => {
        zapier.tools.env.inject();

        const bundle = {
            authData: {
                apiKey: process.env.DEV_API_KEY,
            },
            cleanedRequest: [
                {
                    projectName: 'New Project',
                    projectId: '1',
                    incidentId: '1',
                    content: 'new incidentNote',
                    incident_state: 'update',
                    type: 'investigation',
                    createdAt: new Date().toISOString(),
                    createdBy: 'Nawaz',
                },
            ],
        };

        appTester(App.triggers.incident_note.operation.perform, bundle)
            .then((response: $TSFixMe) => {
                response.should.be.an.instanceOf(Array);
                response[0].should.have.property('projectName');
                response[0].should.have.property('content');
                response[0].should.have.property('type');
                done();
            })
            .catch(done);
    });
});
