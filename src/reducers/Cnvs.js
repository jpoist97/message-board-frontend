export default function Cnvs(state = [], action) {
   switch (action.type) {
      case 'UPDATE_CNVS':
         if(state.length !== action.cnvs.length)
            return action.cnvs;
         const newMsgs = state.filter((cnv, idx) => cnv.lastMessage !== 
          action.cnvs[idx].lastMessage);
         if(newMsgs.length)
            return action.cnvs;
         return state;
      case 'UPDATE_CNV':
         const temp = state.map(val => val.id !== action.data.cnvId ?
            val : Object.assign({}, val, { title: action.data.title }));
         return temp;
      case 'ADD_CNV':
         return state.concat([action.cnv]);
      case 'DEL_CNV':
         return state.filter((cnv) => cnv.id !== action.cnv);
      default:
         return state;
   }
}
