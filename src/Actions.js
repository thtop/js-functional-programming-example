import { SHOW_FORM, TITLE_INPUT, PRICE_INPUT, SAVE_BOOK, DELETE_BOOK, EDIT_BOOK } from './types';

export function showFormMsg(showForm) {
    return {
        type: SHOW_FORM,
        showForm
    }
}

export function titleInputMsg(title) {
    return {
        type: TITLE_INPUT,
        title
    }
}

export function priceInputMsg(price) {
    return {
        type: PRICE_INPUT,
        price
    }
}

export const saveBookMsg = {
    type: SAVE_BOOK
}

export function deleteBookMsg(id) {
    return {
        type: DELETE_BOOK,
        id
    }
}

export function editBookMsg(editId) {
    return {
        type: EDIT_BOOK,
        editId
    }
}