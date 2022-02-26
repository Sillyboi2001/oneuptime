import { OPEN_MODAL, CLOSE_MODAL } from '../constants/modal';

const initialState = {
    modals: [],
    feedbackModalVisble: false,
};

export default (state = initialState, action: $TSFixMe) => {
    switch (action.type) {
        case OPEN_MODAL:
            return Object.assign({}, state, {
                modals: state.modals.concat(action.payload),
            });

        case CLOSE_MODAL:
            return Object.assign({}, state, {
                modals: state.modals.filter(
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'never'.
                    item => item.id !== action.payload.id
                ),
            });

        default:
            return state;
    }
};
