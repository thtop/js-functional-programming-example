import * as R from 'ramda';
import hh from 'hyperscript-helpers';
import { h } from 'virtual-dom';
import { showFormMsg, mealInputMsg, caloriesInputMsg, saveMealMsg, deleteMealMsg, editMealMsg } from './Actions';

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

function mealRow(dispatch, className, meal) {
    const { description, calories } = meal;

    return tr({ className }, [
        cell(td, 'pa2', description),
        cell(td, 'pa2 tr', calories),
        cell(td, 'pa2 tr', [
            i({
                className: 'ph1 fa fa-trash-o pointer',
                onclick: () => dispatch(deleteMealMsg(meal.id))
            }),
            i({
                className: 'ph1 fa fa-pencil-square-o pointer',
                onclick: () => dispatch(editMealMsg(meal.id))
            })
        ])
    ]);
}

function totalRow(meals) {
    const total = R.pipe(
        R.map(meal => meal.calories),
        R.sum
    )(meals);

    return tr({ className: 'bt b' }, [
        cell(td, 'pa2 tr', 'รวม'),
        cell(td, 'pa2 tr', total),
        cell(td, '', '')
    ]);
}

function tableBody(dispatch, className, meals) {
    const rows = R.map(R.partial(mealRow, [dispatch, 'stripe-dark']), meals);
    const rowsWithTotal = [...rows, totalRow(meals)];

    return tbody({ className }, rowsWithTotal)
}

function tableView(dispatch, meals) {
    if (meals.length === 0) {
        return div({
            className: 'mv2 i black-30 f4 pv3'
        }, 'ไม่มีรายการหนังสือที่จะแสดง...')
    }

    return table({ className: 'mv2 w-100 collapse' }, [
        tableHeader,
        tableBody(dispatch, '', meals)
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
                dispatch(saveMealMsg);
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
    const { description, calories, showForm } = model;

    if (showForm) {
        return form({ className: 'w-100 mv2' }, [
            fieldSet('ชื่อหนังสือ', description, e => dispatch(mealInputMsg(e.target.value))),
            fieldSet('ราคา', calories || '', e => dispatch(caloriesInputMsg(e.target.value))),
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
        tableView(dispatch, model.meals),
        pre(JSON.stringify(model, null, 2))
    ]);
}

export default view;