import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {ListGroup, Button} from 'react-bootstrap';
import MsgModal from '../Msgs/MsgModal';
import MsgItem from '../Msgs/MsgItem';

export default props => {
   console.log('Rendering CnvDetail');
   const [modal, setModal] = useState({
      showModal: false,
   });

   var cnvId = parseInt(props.computedMatch.params.id);

   const msgs = useSelector(state => state.Msgs[cnvId]);
   const Cnvs = useSelector(state => state.Cnvs);

   var cnv = Cnvs.filter(cnv => cnv.id === cnvId)[0];
   var cnvTitle = cnv.title;

   var msgItems = [];

   props.updateMsgs(cnvId);

   msgs.forEach((msg, idx) => {
      msgItems.push(<MsgItem
         key={idx}
         msg={msg}
         {...props}
         />)
   });

   const openModal = () => {
      setModal({showModal: true});
   }

   const modalDismiss = (result) => {
      if (result.status === "OK") {
         postMsg(result.body, cnvId);
      }
      setModal({showModal: false});
   }

   const postMsg = (msgBody) => {
      props.addMsg(msgBody, cnvId);
   }

   return (
      <section className="container">
            <h1>{cnvTitle}</h1>
            <ListGroup>
               {msgItems}
            </ListGroup>
            <Button className='new-button' variant="primary" onClick=
               {() => {openModal()}}>New Message</Button>
            <MsgModal
               show={modal.showModal}
               onDismiss={modalDismiss} />
      </section>
   )
}
