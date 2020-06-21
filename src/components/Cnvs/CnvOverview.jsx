import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {ListGroup, ListGroupItem, Col, Row, Button} from 'react-bootstrap';
import CnvModal from './CnvModal';
import {ConfDialog} from '../components';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import './CnvOverview.css';

export default props => {
   console.log('Rednering CNVOverview');
   const [state, setState] = useState({
      showModal: false,
      showConfirmation: false
   })

   const Cnvs = useSelector(state => state.Cnvs);

   props.updateCnvs();
   var cnvItems = [];

   Cnvs.forEach((cnv, idx) => {
      if (!props.userOnly || props.Prss.id === cnv.ownerId)
         cnvItems.push(<CnvItem
            key={idx} 
            showControls={cnv.ownerId === props.Prss.id}
            onDelete={() => openConfirmation(cnv)}
            onEdit={() => openModal(cnv)}
            cnv={cnv}/>);
   });


   const openModal = (cnv) => {
      const newState = {
         showModal: true,
         showConfirmation: false,
         editCnv: cnv,
         cnv
      }

      setState(newState);
   }

   const modalDismiss = (result) => {
      if (result.status === "OK") {
         if (state.editCnv) {
            modCnv(result);
         }
         else {
            newCnv(result);
         }
      }
      setState({showModal: false, editCnv: null});
   }

   const modCnv = (result) => {
      props.modCnv(result.cnvId, result.title);
   };

   const newCnv = (result) => {
      props.addCnv({title: result.title});
   }

   const openConfirmation = (cnv) => {
      setState({delCnv: cnv, showConfirmation: true})
   }

   const closeConfirmation = (res) => {
      if(res === 'Yes'){
         props.delCnv(state.delCnv.id);
      }
      setState({showConfirmation: false});
   }

   return (
      <section className="container">
         <h1>Cnv Overview</h1>
         <ListGroup>
            {cnvItems}
         </ListGroup>
         <Button className='new-button' variant="primary" onClick=
            {() => {openModal()}}>New Conversation</Button>
         <CnvModal
            showModal={state.showModal}
            title={state.editCnv ? "Edit title" : "New Conversation"}
            cnv={state.editCnv}
            onDismiss={modalDismiss} />
         <ConfDialog
            show={state.showConfirmation}
            title="Delete Conversation"
            body={`Are you sure you want to delete the Conversation
        '${state.delCnv ? state.delCnv.title : ''}'`}
            buttons={['Yes', 'Abort']}
            onClose={closeConfirmation} />
      </section>
   )

}

const CnvItem = function (props) {
   return (
      <ListGroupItem>
         <Row> 
            <Col sm={4}>
               <Link to={"/CnvDetail/" + props.cnv.id}>{props.cnv.title}</Link>
            </Col>
            <Col sm={4}>{props.cnv.lastMessage ? new Intl.DateTimeFormat('us',
               {
                  year: "numeric", month: "short", day: "numeric",
                  hour: "2-digit", minute: "2-digit", second: "2-digit"
               })
               .format(new Date(props.cnv.lastMessage)): 'N/A'}
            </Col>
            <Col sm={4}>
               {props.showControls ?
                  <div className="float-right">
                     <Button size="sm" onClick={props.onDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} className='right'/>
                     </Button>
                     <Button size="sm" onClick={props.onEdit}>
                        <FontAwesomeIcon icon={faEdit} className='right'/>
                     </Button>
                  </div>
                  : ''
               }
            </Col>
         </Row>
      </ListGroupItem>
   )
}
