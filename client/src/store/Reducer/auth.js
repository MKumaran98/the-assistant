import * as actionTypes from '../Actions/actionTypes';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:"/",
    expiresIn:null
}

const reducer=(state=initialState,action)=>{
    switch (action.type) {
        case actionTypes.AUTHSTART:
            return{
                ...state,
                error:null,
                loading:true,
            }
        
        case actionTypes.AUTHSUCCESS:
            return{
                ...state,
                loading:false,
                error:null,
                token:action.idToken,
                userId:action.userId,
                expiresIn:action.expiresIn
            }
        case actionTypes.AUTHFAIL:
            return{
                ...state,
                loading:false,
                error:action.error
            }
    
        case actionTypes.AUTHLOGOUT:
            return{
                ...state,
                userId:null,
                token:null
            }    
        
        case actionTypes.SETAUTHREDIRECTPATH:
            return{
                ...state,
                authRedirectPath:action.path
            }
        
        default:
            return state
    }
}


export default reducer;