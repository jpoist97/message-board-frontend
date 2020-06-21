export default function Likes(state = [], action) {
   switch (action.type) {
      case 'UPDATE_MSGS':
         const newState = [...state];
         var update = false;
         action.msgs.forEach(msg => {
            if(!newState[msg.id]) {
               newState[msg.id] = [];
               update = true;
            }
         });
         return update ? newState : state;
      case 'UPDATE_LIKES':
         if(state[action.msgId] && 
          state[action.msgId].length === action.likes.length)
            return state;
         const updState = [...state];
         updState[action.msgId] = action.likes;
         return updState;
      case 'ADD_LIKE':
         if(!state[action.msgId].filter(like => 
          like.id === action.like.id).length) {
            const addState = [...state];
            addState[action.msgId].push(action.like);
            return addState;
         }
         return state;
      default:
         return state;
   }
}
