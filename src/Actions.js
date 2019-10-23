import { SHOW_FORM, MEAL_INPUT, CALORIES_INPUT, SAVE_MEAL, DELETE_MEAL, EDIT_MEAL } from './types';

export function showFormMsg(showForm) {
    return {
        type: SHOW_FORM,
        showForm
    }
}

export function mealInputMsg(description) {
    return {
        type: MEAL_INPUT,
        description
    }
}

export function caloriesInputMsg(calories) {
    return {
        type: CALORIES_INPUT,
        calories
    }
}

export const saveMealMsg = {
    type: SAVE_MEAL
}

export function deleteMealMsg(id) {
    return {
        type: DELETE_MEAL,
        id
    }
}

export function editMealMsg(editId) {
    return {
        type: EDIT_MEAL,
        editId
    }
}