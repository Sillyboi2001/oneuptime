const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const domainVerificationTokenSchema = new Schema({
    domain: String, // the main or base domain eg fyipe.com
    createdAt: Date,
    verificationToken: String,
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: Date,
    deleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: Date,
});

module.exports = mongoose.model(
    'DomainVerificationToken',
    domainVerificationTokenSchema
);
