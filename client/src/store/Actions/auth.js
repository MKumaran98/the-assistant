import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart=()=>{
    return{
        type:actionTypes.AUTHSTART
    }
}

export const onReload=()=>{

    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logoutUser())
        }else{
            const expirationTime=new Date(localStorage.getItem('expirationTime'));
            if(expirationTime<=new Date()){
                dispatch(logoutUser())
            }
            else{
                const userId=localStorage.getItem('userId');
                dispatch(authSuccess(token,userId,(expirationTime.getTime()-new Date().getTime())/1000))

            }
        }
    }
}

export const logInAsync=(data)=>{
    return dispatch=>{
        axios.post('/api/api-session-creation',data)
        .then(response=>{
            // console.log(response);
            localStorage.setItem('token',response.data.data.token);
            const expirationTime=new Date(new Date().getTime()+3600000);
            localStorage.setItem('expirationTime',expirationTime);
            localStorage.setItem('userId',response.data.data.userId);
            dispatch(authSuccess(response.data.data.token,response.data.data.userId));
            dispatch(checkAuthTimeout(3600));
        })
        .catch(err=>{
            dispatch(authFail(err.message));
        })
    }
}


export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTHSUCCESS,
        idToken:token,
        userId:userId
    }
}

export const authFail=(error)=>{
    return{
        type:actionTypes.AUTHFAIL,
        error:error
    }
}


export const checkAuthTimeout=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logoutUser())
        },
        expirationTime*1000
        )
    }
}

export const logoutUser=()=>{
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    return{
        type:actionTypes.AUTHLOGOUT
    }
}
