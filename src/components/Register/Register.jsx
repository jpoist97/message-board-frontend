import React, {useState} from 'react';
import {ConfDialog} from '../components';
import {Form, FormGroup, FormControl, Button, Alert} from 'react-bootstrap';

import './Register.css';

function FieldGroup({id, label, help, ...props }) {
   return (
       <FormGroup controlId={id}>
          <Form.Label>{label}</Form.Label>
          <FormControl {...props} />
          {help && <Form.Text className="text-muted">{help}</Form.Text>}
       </FormGroup>
   );
}

export default props => {
   console.log('Rendering Register');
   const [state, setState] = useState({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      passwordTwo: '',
      termsAccepted: false,
      role: 0,
      offerSignIn: false
   });

   const submit = () => {
      let { 
         firstName,
         lastName,
         email,
         password,
         termsAccepted,
         role
      } = state;

      const user = {
         firstName,
         lastName,
         email,
         password,
         termsAccepted,
         role
      };

      props.register(user, () => {setState({...user, passwordTwo: user.password,
       offerSignIn: true})});
   }

   const handleChange = (ev) => {
      let newState = {...state};

      switch (ev.target.type) {
      case 'checkbox':
         newState[ev.target.id] = ev.target.checked;
         break;
      default:
         newState[ev.target.id] = ev.target.value;
      }
      setState(newState);
   }

   const formValid = () => {
      let s = state;

      return s.email && s.lastName && s.password && s.password === s.passwordTwo
       && s.termsAccepted;
   }


return (
        <div className="container">
           <form>
              <FieldGroup id="email" type="email" label="Email Address"
               placeholder="Enter email" value={state.email || ''}
               onChange={handleChange} required={true}
               />

              <FieldGroup id="firstName" type="text" label="First Name"
               placeholder="Enter first name" value={state.firstName || ''}
               onChange={handleChange}
               />

              <FieldGroup id="lastName" type="text" label="Last Name"
               placeholder="Enter last name" value={state.lastName || ''}
               onChange={handleChange} required={true}
               />

              <FieldGroup id="password" type="password" label="Password"
               value={state.password || ''}
               onChange={handleChange} required={true}
               />

              <FieldGroup id="passwordTwo" type="password" 
               label="Repeat Password"
               value={state.passwordTwo || ''}
               onChange={handleChange} required={true}
               help="Repeat your password"
              />

              <Form.Check  id="termsAccepted"
               value={state.termsAccepted} onChange={handleChange}
               label="Do you accept the terms and conditions?"/>
           </form>

           {state.password !== state.passwordTwo ?
            <Alert variant="warning">
               Passwords don't match
            </Alert> : ''}

           <Button variant="primary" onClick={() => submit()}
            disabled={!formValid()}>
              Submit
           </Button>

           <ConfDialog
              show={state.offerSignIn}
              title="Registration Success"
              body={`Would you like to log in as ${state.email}?`}
              buttons={['YES', 'NO']}
              onClose={answer => {
                 setState({offerSignIn: false});
                 if (answer === 'YES') {
                    props.signIn(
                     {email: state.email, password: state.password},
                     () => props.history.push("/"));
                 }
              }}
           />
        </div>
      )

}
