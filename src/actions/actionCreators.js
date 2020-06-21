import * as api from '../api';

export function signIn(credentials, cb) {
   return (dispatch, prevState) => {
      api.signIn(credentials)
      .then((userInfo) => dispatch({type: "SIGN_IN", user: userInfo}))
      .catch(error => {
         return dispatch({type: 'LOGIN_ERR', details: error})})
      .then(() => {if (cb) cb();})
   };
}

export function signOut(cb) {
   return (dispatch, prevState) => {
      api.signOut()
      .then(() => dispatch({type: 'SIGN_OUT'}))
      .catch(error => dispatch({type: 'LOGOUT_ERR', details: error}))
      .then(() => {if (cb) cb();});
   };
}

export function register(data, cb) {
   return (dispatch, prevState) => {
      api.register(data)
      .then(() => {if (cb) cb();})
      .catch(error => dispatch({type: 'REGISTER_ERR', details: error}));
   };
}

export function updateCnvs(userId, cb) {
   return (dispatch, prevState) => {
      api.getCnvs(userId)
      .then((cnvs) => dispatch({type: 'UPDATE_CNVS', cnvs}))
      .catch(error => dispatch({type: 'LOAD_CNVS_ERR', details: error}))
      .then(() => {if (cb) cb();});
   };
}

export function addCnv(newCnv, cb) {
   return (dispatch, prevState) => {
      api.postCnv(newCnv)
      .then(cnvRsp => dispatch({type: 'ADD_CNV', cnv: cnvRsp}))
      .catch(error => dispatch({type: 'ADD_CNV_ERR', details: error}))
      .then(() => {if (cb) cb();});
   };
}

export function modCnv(cnvId, title, cb) {
   return (dispatch, prevState) => {
      api.putCnv(cnvId, {title})
      .then(() => dispatch({type: 'UPDATE_CNV', data: {cnvId, title}}))
      .catch(error => dispatch({type: 'MOD_CNV_ERR', details: error}))
      .then(() => {if (cb) cb();});
   };
}

export function delCnv(delCnv, cb) {
   return (dispatch, prevState) => {
      api.delCnv(delCnv)
      .then(cnvRsp => dispatch({type: 'DEL_CNV', cnv: delCnv}))
      .catch(error => dispatch({type: 'DEL_CNV_ERR', details: error}))
      .then(() => {if (cb) cb();});
   };
}

export function updateMsgs(cnvId, cb) {
   return (dispatch, prevState) => {
      api.getMsgs(cnvId)
      .then((msgs) => dispatch({type: 'UPDATE_MSGS', msgs, cnvId}))
      .catch(error => {
         if(error[0] === 'Entity not present in DB'){
            return;
         }
         return dispatch({type: 'LOAD_MSGS_ERR', details: error})
         }
      )
      .then(() => {if (cb) cb();});
   };
}

export function addMsg(msgBody, cnvId, cb) {
   return (dispatch, prevState) => {
      api.postMsg(msgBody, cnvId)
      .then(msgRsp => dispatch({type: 'ADD_MSG', msg: msgRsp}))
      .catch(error => dispatch({type: 'ADD_MSG_ERR', details: error}))
      .then(() => {if (cb) cb();})
   }
}

export function updateLikes(msgId, cb) {
   return (dispatch, prevState) => {
      api.getLikes(msgId)
      .then((likes) => dispatch({type: 'UPDATE_LIKES', likes, msgId}))
      .catch(error => dispatch({type: 'LOAD_LIKES_ERR', details: error}))
      .then(() => {if (cb) cb();});
   }
}

export function addLike(msgId, cb) {
   return (dispatch, prevState) => {
      api.postLike(msgId)
      .then(likeRsp => dispatch({type: 'ADD_LIKE', like: likeRsp, msgId}))
      .catch(error => dispatch({type: 'ADD_LIKE_ERR', details: error}))
      .then(() => {if (cb) cb();})
   }
}

export function clearErrs() {
   return (dispatch, prevState) => {
      dispatch({type: 'CLEAR_ERRS'});
   }
}