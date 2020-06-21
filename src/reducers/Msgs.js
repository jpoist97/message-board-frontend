export default function Msgs(state = [], action) {
   switch (action.type) {
      case 'ADD_CNV':
         const newState = [...state];
         newState[action.cnv.id] = [];
         return newState;
      case 'UPDATE_CNVS':
         const anotherState = [...state]
         if(action.cnvs.length !== state.length){
            action.cnvs.forEach((cnv) => {
               if(!anotherState[cnv.id])
                  anotherState[cnv.id] = [];
            });
         }
         return action.cnvs.length === state.length ? state : anotherState;
      case 'UPDATE_MSGS':
         const updateState = [...state];
         if(updateState[action.cnvId] && updateState[action.cnvId].length !==
          action.msgs.length){
            updateState[action.cnvId] = action.msgs;
            return updateState;
         }
         return state;
      case 'ADD_MSG':
         const addState = [...state];
         if(!addState[action.msg.id])
            addState[action.msg.id] = [];
         addState[action.msg.id].push(action.msg);
         return addState;
      default:
         return state;
   }
}
