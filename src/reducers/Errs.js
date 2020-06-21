export default function Errs(state = [], action) {
   switch(action.type) {
   case 'LOGIN_ERR':
   case 'LOGOUT_ERR':
   case 'REGISTER_ERR':
   case 'MOD_CNV_ERR':
   case 'LOAD_CNVS_ERR':
   case 'ADD_CNV_ERR':
   case 'DEL_CNV_ERR':
   case 'LOAD_MSGS_ERR':
   case 'ADD_MSG_ERR':
   case 'LOAD_LIKES_ERR':
   case 'ADD_LIKE_ERR':
      return state.concat(action.details);
   case 'CLEAR_ERRS':
      return [];
   default:
      return state;
   }
}
