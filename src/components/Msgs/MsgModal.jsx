import React, {useState} from 'react';
import {
    Modal, Button, Form, FormControl, FormGroup
} from 'react-bootstrap';

export default props => {
   const [msg, setMsg] = useState({
      body: ''
   });

   const handleChange = event => {
      setMsg({body: event.target.value});
   }

   const close = (result) => {
      props.onDismiss && props.onDismiss({
         status: result,
         body: msg.body
      });
      setMsg({body: ''});
   }

   return (
      <Modal show={props.show} onHide={() => close("Cancel")}>
         <Modal.Header closeButton>
            <Modal.Title>Enter New Message</Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <form onSubmit={(e) =>
               e.preventDefault() || msg.body.length ?
                  close("Ok") :close("Cancel")}>
               <FormGroup controlId="formBasicText">
                  <FormControl
                     as="textarea"
                     rows={4}
                     value={msg.body}
                     onChange={handleChange}
                  />
                  <FormControl.Feedback />
                  <Form.Text className="text-muted">
                     Body is required
                  </Form.Text>
               </FormGroup>
            </form>
         </Modal.Body>
         <Modal.Footer>
            <Button disabled={!msg.body} 
             onClick={() => close("OK")}>Ok</Button>
            <Button onClick={() => close("Cancel")}>Cancel</Button>
         </Modal.Footer>
      </Modal>)

}
