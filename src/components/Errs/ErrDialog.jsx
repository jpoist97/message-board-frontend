import React, { PureComponent } from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class ErrDialog extends PureComponent {
   close = () => {
      this.props.onClose();
   }

   render() {
      return (
         <Modal show={true} onHide={() => this.close()}>
            <Modal.Header closeButton>
               <Modal.Title>Error Notice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
               {this.props.body}
            </Modal.Body>
            <Modal.Footer>
               <Button onClick={() => this.close()}>OK</Button>
            </Modal.Footer>
         </Modal>
      )
   }
}
