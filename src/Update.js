import * as R from 'ramda';
import {
    SHOW_FORM,
    MEAL_INPUT,
    CALORIES_INPUT,
    SAVE_MEAL,
    DELETE_MEAL,
    EDIT_MEAL
} from './types';


function update(msg, model) {
    switch (msg.type) {
        case SHOW_FORM: {
            const { showForm } = msg;
            return { ...model, showForm, description: '', calories: 0 }
        }
        case MEAL_INPUT: {
            const { description } = msg;
            return { ...model, description }
        }
        case CALORIES_INPUT: {
            const calories = R.pipe(
                parseInt,
                R.defaultTo(0)
            )(msg.calories);
            return { ...model, calories }
        }
        case SAVE_MEAL: {
            const { editId } = model;
            const updatedModel = editId !== null ? edit(msg, model) : add(msg, model);
            return updatedModel;
        }
        case DELETE_MEAL: {
            const { id } = msg;
            const meals = R.filter(meal => meal.id !== id, model.meals);
            return { ...model, meals }
        }
        case EDIT_MEAL: {
            const { editId } = msg;
            const meal = R.find(meal => meal.id === editId, model.meals);
            const { description, calories } = meal;
            return { ...model, description, calories, editId, showForm: true }
        }
        default:
            return model;
    }
}

function add(msg, model) {
    const { description, calories, nextId } = model;
    const meal = { id: nextId, description, calories };
    const meals = [...model.meals, meal];
    return { ...model, meals, description: '', calories: 0, nextId: nextId + 1, showForm: false }
}

function edit(msg, model) {
    const { description, calories, editId } = model;
    const meals = R.map(meal => {
        if (meal.id === editId) {
            return { ...meal, description, calories };
        }
        return meal;
    }, model.meals);

    return { ...model, meals, description: '', calories: 0, editId: null, showForm: false }
}

export default update;