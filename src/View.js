import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { showFormMsg, titleInputMsg, priceInputMsg, saveBookMsg, deleteBookMsg, editBookMsg } from './Actions';

const { div, h1, pre, button, form, input, label, table, thead, th, tbody, tr, td, i } = hh(h);

// table
function cell(tag, className, value) {
    return tag({ className }, value);
}

const tableHeader = thead([
    cell(th, 'pa2 tl', 'ชื่อหนังสือ'),
    cell(th, 'pa2 tr', 'ราคา'),
    cell(th, '', '')
]);

function bookRow(dispatch, className, book) {
    const { title, price } = book;

    return tr({ className }, [
        cell(td, 'pa2', title),
        cell(td, 'pa2 tr', price),
        cell(td, 'pa2 tr', [
            i({
                className: 'ph1 fa fa-trash-o pointer',
                onclick: () => dispatch(deleteBookMsg(book.id))
            }),
            i({
                className: 'ph1 fa fa-pencil-square-o pointer',
                onclick: () => dispatch(editBookMsg(book.id))
            })
        ])
    ]);
}

function totalRow(books) {
    const total = R.pipe(
        R.map(meal => meal.price),
        R.sum
    )(books);

    return tr({ className: 'bt b' }, [
        cell(td, 'pa2 tr', 'รวม'),
        cell(td, 'pa2 tr', total),
        cell(td, '', '')
    ]);
}

function tableBody(dispatch, className, books) {
    const rows = R.map(R.partial(bookRow, [dispatch, 'stripe-dark']), books);
    const rowsWithTotal = [...rows, totalRow(books)];

    return tbody({ className }, rowsWithTotal)
}

function tableView(dispatch, books) {
    if (books.length === 0) {
        return div({
            className: 'mv2 i black-30 f4 pv3'
        }, 'ไม่มีรายการหนังสือที่จะแสดง...')
    }

    return table({ className: 'mv2 w-100 collapse' }, [
        tableHeader,
        tableBody(dispatch, '', books)
    ])
}

// form
function fieldSet(labelText, inputValue, oninput) {
    return div([
        label({ className: 'db mb1' }, labelText),
        input({
            className: 'pa2 input-reset ba w-100 mb2',
            type: 'text',
            value: inputValue,
            oninput
        })
    ]);
}

function buttonSet(dispatch) {
    return div([
        button({
            className: 'f3 pv2 ph3 bg-blue white bn mr2 dim',
            type: 'submit',
            onclick: e => {
                e.preventDefault();
                dispatch(saveBookMsg);
            }
        },
            'บันทึก'),
        button({
            className: 'f3 pv2 ph3 bg-light-gray bn dim',
            type: 'button',
            onclick: () => dispatch(showFormMsg(false))
        }, 'ยกเลิก')
    ]);
}

function formView(dispatch, model) {
    const { title, price, showForm } = model;

    if (showForm) {
        return form({ className: 'w-100 mv2' }, [
            fieldSet('ชื่อหนังสือ', title, e => dispatch(titleInputMsg(e.target.value))),
            fieldSet('ราคา', price || '', e => dispatch(priceInputMsg(e.target.value))),
            buttonSet(dispatch)
        ]);
    }

    return button({
        className: 'f3 pv2 ph3 bg-dark-green white bn',
        onclick: () => dispatch(showFormMsg(true))
    }, 'เพิ่มหนังสือ');
}

function view(dispatch, model) {
    return div({ className: 'mw6 center' }, [
        h1({ className: 'f2 pv2 bb dark-blue' }, 'รายการหนังสือ'),
        formView(dispatch, model),
        tableView(dispatch, model.books),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;