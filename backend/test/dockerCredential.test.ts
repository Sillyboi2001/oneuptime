// @ts-expect-error ts-migrate(2322) FIXME: Type '3020' is not assignable to type 'string | un... Remove this comment to see the full error message
process.env.PORT = 3020;
// @ts-expect-error ts-migrate(2322) FIXME: Type 'true' is not assignable to type 'string | un... Remove this comment to see the full error message
process.env.IS_SAAS_SERVICE = true;
import chai from 'chai'
const expect = require('chai').expect;
import userData from './data/user'
import dockerCredential from './data/dockerCredential'
import app from '../server'
chai.use(require('chai-http'));
// @ts-expect-error ts-migrate(2339) FIXME: Property 'request' does not exist on type 'ChaiSta... Remove this comment to see the full error message
const request = chai.request.agent(app);
import GlobalConfig from './utils/globalConfig'
// @ts-expect-error ts-migrate(2614) FIXME: Module '"./utils/userSignUp"' has no exported memb... Remove this comment to see the full error message
import { createUser } from './utils/userSignUp'
import VerificationTokenModel from '../backend/models/verificationToken'
import UserService from '../backend/services/userService'
import ProjectService from '../backend/services/projectService'
import DockerCredentialService from '../backend/services/dockerCredentialService'
import AirtableService from '../backend/services/airtableService'

// @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'describe'. Do you need to instal... Remove this comment to see the full error message
describe('Docker Credential API', function(this: $TSFixMe) {
    const timeout = 30000;
    let projectId: $TSFixMe, userId, token: $TSFixMe, credentialId: $TSFixMe;
    const dockerRegistryUrl = dockerCredential.dockerRegistryUrl;
    const dockerUsername = dockerCredential.dockerUsername;
    const dockerPassword = dockerCredential.dockerPassword;

    this.timeout(timeout);
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'before'.
    before(async function() {
        await GlobalConfig.initTestConfig();
        const res = await createUser(request, userData.user);
        const project = res.body.project;
        projectId = project._id;
        userId = res.body.id;
        const verificationToken = await VerificationTokenModel.findOne({
            userId,
        });
        await request
            .get(`/user/confirmation/${verificationToken.token}`)
            .redirects(0);
        const res1 = await request.post('/user/login').send({
            email: userData.user.email,
            password: userData.user.password,
        });
        token = res1.body.tokens.jwtAccessToken;
    });

    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'after'.
    after(async function() {
        await GlobalConfig.removeTestConfig();
        await ProjectService.hardDeleteBy({ _id: projectId });
        await UserService.hardDeleteBy({
            email: userData.user.email,
        });
        await DockerCredentialService.hardDeleteBy({
            projectId,
        });
        await AirtableService.deleteAll({ tableName: 'User' });
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should add docker credential', async function() {
        const authorization = `Basic ${token}`;
        const res = await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername,
                dockerPassword,
            });
        credentialId = res.body._id;
        expect(res).to.have.status(200);
        expect(res.body.dockerRegistryUrl).to.be.equal(dockerRegistryUrl);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should update a docker credential', async function() {
        const authorization = `Basic ${token}`;
        const dockerUsername = 'username';
        const dockerPassword = 'hello1234567890';

        const res = await request
            .put(`/credential/${projectId}/dockerCredential/${credentialId}`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername,
                dockerPassword,
            });
        expect(res).to.have.status(200);
        expect(res.body.dockerUsername).to.be.equal(dockerUsername);
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not update docker credential with invalid username or password', async function() {
        const authorization = `Basic ${token}`;
        const dockerUsername = 'randomUsername';
        const dockerPassword = 'randomPassword';
        const res = await request
            .put(`/credential/${projectId}/dockerCredential/${credentialId}`)
            .set('Authorization', authorization)
            .send({ dockerRegistryUrl, dockerUsername, dockerPassword });
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal('Invalid docker credential');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not add docker credential if username or password is invalid', async function() {
        const authorization = `Basic ${token}`;
        const res = await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername: 'randomusername',
                dockerPassword: 'invalidpassword',
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal('Invalid docker credential');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should remove a docker credential', async function() {
        const authorization = `Basic ${token}`;
        const res = await request
            .delete(`/credential/${projectId}/dockerCredential/${credentialId}`)
            .set('Authorization', authorization);
        expect(res).to.have.status(200);
        expect(res.body._id).to.be.equal(credentialId);
        expect(res.body.deleted).to.be.true;
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should get all the docker credentials in a project', async function() {
        const authorization = `Basic ${token}`;
        await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername,
                dockerPassword,
            });
        const res = await request
            .get(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization);
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('array');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not create docker credential with an existing docker registry url and docker username in a project', async function() {
        const authorization = `Basic ${token}`;

        const res = await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername,
                dockerPassword,
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal(
            'Docker Credential already exist in this project'
        );
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not create docker credential if docker registry url is missing', async function() {
        const authorization = `Basic ${token}`;
        const res = await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl: '',
                dockerUsername,
                dockerPassword,
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal('Docker Registry URL is required');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not create docker credential if docker username is missing', async function() {
        const authorization = `Basic ${token}`;
        const res = await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername: '',
                dockerPassword,
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal('Docker Username is required');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not create docker credential if docker password is missing', async function() {
        const authorization = `Basic ${token}`;
        const res = await request
            .post(`/credential/${projectId}/dockerCredential`)
            .set('Authorization', authorization)
            .send({
                dockerRegistryUrl,
                dockerUsername: 'username',
            });
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal('Docker Password is required');
    });

    // @ts-expect-error ts-migrate(2582) FIXME: Cannot find name 'it'. Do you need to install type... Remove this comment to see the full error message
    it('should not remove a non-existing docker credential', async function() {
        const authorization = `Basic ${token}`;
        const newCredentialId = '5e8db97b2cc46e3a229ebc62'; // non-existing credential id
        const res = await request
            .delete(
                `/credential/${projectId}/dockerCredential/${newCredentialId}`
            )
            .set('Authorization', authorization);
        expect(res).to.have.status(400);
        expect(res.body.message).to.be.equal(
            'Docker Credential not found or does not exist'
        );
    });
});
