// export const myMutation = ( state ) => {

// }

export const setUserId = ( state, { id } ) => {
    state.user.id = id
}

export const setUserRoleAbilities = ( state, { role, abilities } ) => {

    state.user.role = role
    state.user.abilities = [ ...abilities ]

}

export const setError = ( state, { error, message } ) => {
    state.error = error
    state.errorMessage = message
}