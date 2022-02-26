export default {
    findBy: async function({
        query,
        skip,
        limit,
        sort,
        populate,
        select
    }: $TSFixMe) {
        if (!skip) skip = 0;

        if (!limit) limit = 10;

        if (!sort) sort = -1;

        if (typeof skip === 'string') {
            skip = parseInt(skip);
        }

        if (typeof limit === 'string') {
            limit = parseInt(limit);
        }

        if (typeof sort === 'string') {
            sort = parseInt(sort);
        }

        if (!query) {
            query = {};
        }

        if (!query.deleted) query.deleted = false;
        let itemsQuery = OnCallScheduleStatusModel.find(query)
            .lean()
            .limit(limit)
            .skip(skip);

        itemsQuery = handleSelect(select, itemsQuery);
        itemsQuery = handlePopulate(populate, itemsQuery);

        const items = await itemsQuery;

        return items;
    },

    create: async function({
        project,
        incident,
        activeEscalation,
        schedule,
        escalations,
        incidentAcknowledged
    }: $TSFixMe) {
        let item = new OnCallScheduleStatusModel();

        // @ts-expect-error ts-migrate(2339) FIXME: Property 'project' does not exist on type 'Documen... Remove this comment to see the full error message
        item.project = project;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'activeEscalation' does not exist on type... Remove this comment to see the full error message
        item.activeEscalation = activeEscalation;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'schedule' does not exist on type 'Docume... Remove this comment to see the full error message
        item.schedule = schedule;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'incidentAcknowledged' does not exist on ... Remove this comment to see the full error message
        item.incidentAcknowledged = incidentAcknowledged;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'incident' does not exist on type 'Docume... Remove this comment to see the full error message
        item.incident = incident;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'escalations' does not exist on type 'Doc... Remove this comment to see the full error message
        item.escalations = escalations;

        item = await item.save();
        return item;
    },

    countBy: async function({
        query
    }: $TSFixMe) {
        if (!query) {
            query = {};
        }

        if (!query.deleted) query.deleted = false;
        const count = await OnCallScheduleStatusModel.countDocuments(query);
        return count;
    },

    updateOneBy: async function({
        query,
        data
    }: $TSFixMe) {
        if (!query) {
            query = {};
        }

        if (!query.deleted) query.deleted = false;
        const item = await OnCallScheduleStatusModel.findOneAndUpdate(
            query,
            {
                $set: data,
            },
            {
                new: true,
            }
        );
        return item;
    },

    updateBy: async function({
        query,
        data
    }: $TSFixMe) {
        if (!query) {
            query = {};
        }

        if (!query.deleted) query.deleted = false;
        await OnCallScheduleStatusModel.updateMany(query, {
            $set: data,
        });

        const selectOnCallScheduleStatus =
            'escalations createdAt project schedule activeEscalation activeEscalation incident incidentAcknowledged alertedEveryone isOnDuty deleted deletedAt deletedById';

        const populateOnCallScheduleStatus = [
            { path: 'incidentId', select: 'name slug' },
            { path: 'project', select: 'name slug' },
            { path: 'scheduleId', select: 'name slug' },
            { path: 'schedule', select: '_id name slug' },
            {
                path: 'activeEscalationId',
                select: 'projectId teams scheduleId',
            },
        ];
        const items = await this.findBy({
            query,
            select: selectOnCallScheduleStatus,
            populate: populateOnCallScheduleStatus,
        });
        return items;
    },

    deleteBy: async function({
        query,
        userId
    }: $TSFixMe) {
        if (!query) {
            query = {};
        }

        query.deleted = false;
        const items = await OnCallScheduleStatusModel.findOneAndUpdate(
            query,
            {
                $set: {
                    deleted: true,
                    deletedAt: Date.now(),
                    deletedById: userId,
                },
            },
            {
                new: true,
            }
        );
        return items;
    },

    hardDeleteBy: async function({
        query
    }: $TSFixMe) {
        await OnCallScheduleStatusModel.deleteMany(query);
    },
};

import OnCallScheduleStatusModel from '../models/onCallScheduleStatus'
import handleSelect from '../utils/select'
import handlePopulate from '../utils/populate'
