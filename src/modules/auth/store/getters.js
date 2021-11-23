export const userRole = ( state ) => {
    return state.user.role
}

export const userAbilities = ( { user } ) => {
    return user.abilities
}