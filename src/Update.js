import * as R from 'ramda';
import { SHOW_FORM, TITLE_INPUT, PRICE_INPUT, SAVE_BOOK, DELETE_BOOK, EDIT_BOOK } from './types';


function update(msg, model) {
    switch (msg.type) {
        case SHOW_FORM: {
            const { showForm } = msg;
            return { ...model, showForm, title: '', price: 0 }
        }
        case TITLE_INPUT: {
            const { title } = msg;
            return { ...model, title }
        }
        case PRICE_INPUT: {
            const price = R.pipe(parseInt, R.defaultTo(0))(msg.price);
            return { ...model, price }
        }
        case SAVE_BOOK: {
            const { editId } = model;
            const updatedModel = editId !== null ? edit(msg, model) : add(msg, model);
            return updatedModel;
        }
        case DELETE_BOOK: {
            const { id } = msg;
            const books = R.filter(book => book.id !== id, model.books);
            return { ...model, books }
        }
        case EDIT_BOOK: {
            const { editId } = msg;
            const book = R.find(book => book.id === editId, model.books);
            const { title, price } = book;
            return { ...model, title, price, editId, showForm: true }
        }
        default:
            return model;
    }
}

function add(msg, model) {
    const { title, price, nextId } = model;
    const book = { id: nextId, title, price };
    const books = [...model.books, book];
    return { ...model, books, title: '', price: 0, nextId: nextId + 1, showForm: false }
}

function edit(msg, model) {
    const { title, price, editId } = model;
    const books = R.map(book => {
        if (book.id === editId) {
            return { ...book, title, price };
        }
        return book;
    }, model.books);

    return { ...model, books, title: '', price: 0, editId: null, showForm: false }
}

export default update;