export const getProfileData = ( state ) => {
    return { ...state }
}

export const profileHasData = ( { name, lastname, phone, address } ) => {
    return ( name !== null ) && ( lastname !== null ) && ( phone !== null ) && ( address !== null )
}