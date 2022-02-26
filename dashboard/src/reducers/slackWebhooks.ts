import {
    GET_SLACK_WEBHOOK_REQUEST,
    GET_SLACK_WEBHOOK_FAILED,
    GET_SLACK_WEBHOOK_RESET,
    GET_SLACK_WEBHOOK_SUCCESS,
    DELETE_SLACK_WEBHOOK_FAILED,
    DELETE_SLACK_WEBHOOK_REQUEST,
    DELETE_SLACK_WEBHOOK_RESET,
    DELETE_SLACK_WEBHOOK_SUCCESS,
    CREATE_SLACK_WEBHOOK_FAILED,
    CREATE_SLACK_WEBHOOK_REQUEST,
    CREATE_SLACK_WEBHOOK_RESET,
    CREATE_SLACK_WEBHOOK_SUCCESS,
    UPDATE_SLACK_WEBHOOK_REQUEST,
    UPDATE_SLACK_WEBHOOK_FAILED,
    UPDATE_SLACK_WEBHOOK_SUCCESS,
    UPDATE_SLACK_WEBHOOK_RESET,
    PAGINATE_PREV,
    PAGINATE_NEXT,
    PAGINATE_RESET,
} from '../constants/slackWebhooks';

const initialState = {
    slacks: {
        error: null,
        requesting: false,
        success: false,
        slacks: [],
        count: null,
        limit: null,
        skip: null,
    },
    deleteSlack: {
        error: null,
        requesting: false,
        success: false,
    },
    createSlack: {
        error: null,
        requesting: false,
        success: false,
    },
    updateSlack: {
        error: null,
        requesting: false,
        success: false,
    },
    pages: {
        counter: 1,
    },
};

export default (state = initialState, action: $TSFixMe) => {
    let slacks, index, count;
    switch (action.type) {
        case GET_SLACK_WEBHOOK_FAILED:
            return Object.assign({}, state, {
                slacks: {
                    ...state.slacks,
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        case GET_SLACK_WEBHOOK_SUCCESS:
            return Object.assign({}, state, {
                slacks: {
                    requesting: false,
                    success: true,
                    error: null,
                    slacks: action.payload.data,
                    count: action.payload.count,
                    limit: action.payload.limit,
                    skip: action.payload.skip,
                },
            });

        case GET_SLACK_WEBHOOK_REQUEST:
            return Object.assign({}, state, {
                slacks: {
                    ...state.slacks,
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case GET_SLACK_WEBHOOK_RESET:
            return Object.assign({}, state, {
                slacks: {
                    error: null,
                    requesting: false,
                    success: false,
                    slacks: [],
                    count: null,
                    limit: null,
                    skip: null,
                },
            });

        case DELETE_SLACK_WEBHOOK_FAILED:
            return Object.assign({}, state, {
                deleteSlack: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        case DELETE_SLACK_WEBHOOK_SUCCESS:
            slacks = Object.assign([], state.slacks.slacks);
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'never'.
            index = slacks.findIndex(slack => slack._id === action.payload._id);
            slacks.splice(index, 1);
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            count = state.slacks.count - 1;
            return Object.assign({}, state, {
                deleteSlack: {
                    requesting: false,
                    success: true,
                    error: null,
                },
                slacks: {
                    requesting: false,
                    success: true,
                    error: null,
                    slacks,
                    skip: state.slacks.skip,
                    limit: state.slacks.limit,
                    count: count,
                },
            });

        case DELETE_SLACK_WEBHOOK_REQUEST:
            return Object.assign({}, state, {
                deleteSlack: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case DELETE_SLACK_WEBHOOK_RESET:
            return Object.assign({}, state, {
                deleteSlack: {
                    error: null,
                    requesting: false,
                    success: false,
                },
            });

        case CREATE_SLACK_WEBHOOK_FAILED:
            return Object.assign({}, state, {
                createSlack: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        case CREATE_SLACK_WEBHOOK_SUCCESS:
            slacks = Object.assign([], state.slacks.slacks);
            // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'any' is not assignable to parame... Remove this comment to see the full error message
            action.payload._id && slacks.push(action.payload);
            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            count = state.slacks.count + 1;

            return Object.assign({}, state, {
                createSlack: {
                    requesting: false,
                    success: true,
                    error: null,
                },
                slacks: {
                    requesting: false,
                    success: true,
                    error: null,
                    slacks,
                    skip: state.slacks.skip,
                    limit: state.slacks.limit,
                    count: count,
                },
            });

        case CREATE_SLACK_WEBHOOK_REQUEST:
            return Object.assign({}, state, {
                createSlack: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case CREATE_SLACK_WEBHOOK_RESET:
            return Object.assign({}, state, {
                createSlack: {
                    error: null,
                    requesting: false,
                    success: false,
                },
            });

        case UPDATE_SLACK_WEBHOOK_FAILED:
            return Object.assign({}, state, {
                updateSlack: {
                    requesting: false,
                    error: action.payload,
                    success: false,
                },
            });

        case UPDATE_SLACK_WEBHOOK_SUCCESS:
            slacks = Object.assign([], state.slacks.slacks);
            // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'never'.
            index = slacks.findIndex(hook => hook._id === action.payload._id);
            // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
            slacks[index] = action.payload;

            return Object.assign({}, state, {
                updateSlack: {
                    requesting: false,
                    success: true,
                    error: null,
                },
                slacks: {
                    requesting: false,
                    success: true,
                    error: null,
                    slacks,
                    skip: state.slacks.skip,
                    limit: state.slacks.limit,
                    count: state.slacks.count,
                },
            });

        case UPDATE_SLACK_WEBHOOK_REQUEST:
            return Object.assign({}, state, {
                updateSlack: {
                    requesting: true,
                    error: null,
                    success: false,
                },
            });

        case UPDATE_SLACK_WEBHOOK_RESET:
            return Object.assign({}, state, {
                createSlack: {
                    error: null,
                    requesting: false,
                    success: false,
                },
            });

        case PAGINATE_NEXT:
            return {
                ...state,
                pages: {
                    counter: state.pages.counter + 1,
                },
            };

        case PAGINATE_PREV:
            return {
                ...state,
                pages: {
                    counter: state.pages.counter - 1,
                },
            };

        case PAGINATE_RESET:
            return {
                ...state,
                pages: {
                    counter: 1,
                },
            };
        default:
            return state;
    }
};
