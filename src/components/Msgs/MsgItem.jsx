import React, {useState} from 'react';
import {ListGroup,ListGroupItem, Col, Row} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import Popup from 'reactjs-popup';

export default props => {
   const [showBody, setShowBody] = useState({
      show: false
   });

   const likes = useSelector(state => state.Likes);
   const msgId = parseInt(props.msg.id);

   const likeItems = []
   likes[msgId].forEach(like => {
      likeItems.push(<ListGroupItem key={like.id}>
       {`${like.firstName} ${like.lastName}`}
       </ListGroupItem>)
   })

   const toggleBody = () => {
      setShowBody({ show: !showBody.show });
   }

   const addLike = () => {
      props.addLike(props.msg.id);
   }

   const open = () => {
      if(!likes[msgId].length)
         props.updateLikes(props.msg.id);
   }

   return (
      <ListGroupItem>
         <Row> 
            <Col sm={4} onClick={toggleBody}>
               {props.msg.email}
            </Col>
            <Col onClick={toggleBody} sm={4}>
             {props.msg ? new Intl.DateTimeFormat('us',
               {
                  year: "numeric", month: "short", day: "numeric",
                  hour: "2-digit", minute: "2-digit", second: "2-digit"
               })
               .format(new Date(props.msg.whenMade)): 'N/A'}
            </Col>
            <Col sm={4} onClick={addLike}>
               <Popup on='hover' onOpen={open}
                trigger={
                <span>
                  {likes[msgId].length ? likes[msgId].length : 
                   props.msg.numLikes} Likes
                </span>} 
                position="right center">
                  <div>
                     Liked By:
                     <ListGroup>
                        {likeItems}
                     </ListGroup>
                  </div>
               </Popup>
            </Col>
         </Row>
         {showBody.show ? 
         <Row>
            <Col>
               {props.msg.content}
            </Col>
         </Row> : ''}

      </ListGroupItem>
   )
}

