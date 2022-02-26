import * as types from '../constants/monitorCustomField';

const initialState = {
    monitorCustomField: {
        requesting: false,
        success: false,
        error: null,
        field: null,
    },
    monitorCustomFields: {
        requesting: false,
        success: false,
        error: null,
        fields: [],
        count: 0,
        skip: 0,
        limit: 10,
    },
};

export default function monitorCustomField(state = initialState, action: $TSFixMe) {
    switch (action.type) {
        case types.CREATE_CUSTOM_FIELD_REQUEST:
            return {
                ...state,
                monitorCustomField: {
                    ...state.monitorCustomField,
                    requesting: true,
                    success: false,
                    error: null,
                },
            };

        case types.CREATE_CUSTOM_FIELD_SUCCESS:
            return {
                ...state,
                monitorCustomField: {
                    requesting: false,
                    success: true,
                    error: null,
                    field: action.payload,
                },
            };

        case types.CREATE_CUSTOM_FIELD_FAILURE:
            return {
                ...state,
                monitorCustomField: {
                    ...state.monitorCustomField,
                    requesting: false,
                    success: false,
                    error: action.payload,
                },
            };

        case types.DELETE_CUSTOM_FIELD_REQUEST:
            return {
                ...state,
                monitorCustomField: {
                    ...state.monitorCustomField,
                    requesting: true,
                    success: false,
                    error: null,
                },
            };

        case types.DELETE_CUSTOM_FIELD_SUCCESS: {
            const fields = state.monitorCustomFields.fields.filter(
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'never'.
                field => String(field._id) !== String(action.payload._id)
            );
            return {
                ...state,
                monitorCustomFields: {
                    ...state.monitorCustomFields,
                    fields,
                    count: state.monitorCustomFields.count - 1,
                },
                monitorCustomField: {
                    ...state.monitorCustomField,
                    requesting: false,
                    success: true,
                    error: null,
                },
            };
        }

        case types.DELETE_CUSTOM_FIELD_FAILURE:
            return {
                ...state,
                monitorCustomField: {
                    ...state.monitorCustomField,
                    requesting: false,
                    success: false,
                    error: action.payload,
                },
            };

        case types.FETCH_CUSTOM_FIELDS_REQUEST:
            return {
                ...state,
                monitorCustomFields: {
                    ...state.monitorCustomFields,
                    requesting: true,
                    success: false,
                    error: null,
                },
            };

        case types.FETCH_CUSTOM_FIELDS_SUCCESS:
            return {
                ...state,
                monitorCustomFields: {
                    requesting: false,
                    success: true,
                    error: null,
                    fields: action.payload.data,
                    count: action.payload.count,
                    limit: action.payload.limit,
                    skip: action.payload.skip,
                },
            };

        case types.FETCH_CUSTOM_FIELDS_FAILURE:
            return {
                ...state,
                monitorCustomFields: {
                    ...state.monitorCustomFields,
                    requesting: false,
                    success: false,
                    error: action.payload,
                },
            };

        case types.UPDATE_CUSTOM_FIELD_REQUEST:
            return {
                ...state,
                monitorCustomFields: {
                    ...state.monitorCustomFields,
                    requesting: true,
                    success: false,
                    error: null,
                },
            };

        case types.UPDATE_CUSTOM_FIELD_SUCCESS: {
            const fields = state.monitorCustomFields.fields.map(field => {
                // @ts-expect-error ts-migrate(2339) FIXME: Property '_id' does not exist on type 'never'.
                if (String(field._id) === String(action.payload._id)) {
                    // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
                    field = action.payload;
                }

                return field;
            });
            return {
                ...state,
                monitorCustomFields: {
                    ...state.monitorCustomFields,
                    requesting: false,
                    success: true,
                    error: null,
                    fields,
                },
            };
        }

        case types.UPDATE_CUSTOM_FIELD_FAILURE:
            return {
                ...state,
                monitorCustomFields: {
                    ...state.monitorCustomFields,
                    requesting: false,
                    success: false,
                    error: action.payload,
                },
            };

        default:
            return state;
    }
}
