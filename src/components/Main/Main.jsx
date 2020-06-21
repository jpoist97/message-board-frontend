import React, { Component } from 'react';
import {Register, SignIn, CnvOverview, CnvDetail} from '../components'
import {Route, Redirect, Switch } from 'react-router-dom';
import {Navbar, Nav, Row, Col} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import './Main.css';
import ErrDialog from '../Errs/ErrDialog';

var ProtectedRoute = ({component: Cmp, path, ...rest }) => {
   return (<Route path={path} render={(props) => {
      return Object.keys(rest.Prss).length !== 0 ?
      <Cmp {...rest}/> : <Redirect to='/signin'/>;}}/>);
};
   
class Main extends Component {
   
   signedIn() {
      return Object.keys(this.props.Prss).length !== 0;
   }

   render() {
      return (
         <div>
            <div>
               <Navbar expand='md'>
                  <Navbar.Toggle/>
                  <Navbar.Collapse>
                     <Nav variant="pills">
                        {this.signedIn() ?
                           [
                              <LinkContainer to='/allCnvs' key={0}>
                                 <Nav.Link> All Conversations</Nav.Link>
                              </LinkContainer>,
                              <LinkContainer to='/myCnvs' key={1}>
                                 <Nav.Link>My Conversations</Nav.Link>
                              </LinkContainer>
                           ]
                           :
                           [
                              <LinkContainer to='/signin' key={0}>
                                 <Nav.Link>Sign In</Nav.Link>
                              </LinkContainer>,
                              <LinkContainer to='/register' key={1}>
                                 <Nav.Link>Register</Nav.Link>
                              </LinkContainer>
                           ]
                        }
                     </Nav>
                  </Navbar.Collapse>
                  {this.signedIn() ?
                     [
                        <Nav.Item key={0} onClick={() => this.props.signOut()}>
                           Sign out
                        </Nav.Item>
                     ]
                     :
                     ''
                  }
               </Navbar>
            </div>

            {this.signedIn() ?
               <Row>
                  <Col xs={{span: 4, offset: 8}} sm={{span: 4, offset: 8}} 
                   md={{span: 4, offset: 8}} 
                   lg={{span: 4, offset: 8}}
                   className='usr'>
                     {`Logged in as: ${this.props.Prss.firstName} 
                      ${this.props.Prss.lastName}`}
                  </Col>
               </Row>
               :
               ''
            }

            <Switch>
               <Route exact path='/'
                  component={() => this.props.Prss ? <Redirect to="/allCnvs" />
                   : <Redirect to="/signin" />} />
               <Route path='/signin' 
                render={() => <SignIn {...this.props} />} />
               <Route path='/register'
                render={() => <Register {...this.props} />} />
               <ProtectedRoute path='/allCnvs' component={CnvOverview}
                {...this.props}/>
               <ProtectedRoute path='/myCnvs' component={CnvOverview}
                userOnly={true} {...this.props}/>}/>
               <ProtectedRoute path='/CnvDetail/:id' component={CnvDetail}
                {...this.props}/>}/>
            />
            </Switch>

            {this.props.Errs.length ? 
            <ErrDialog onClose={this.props.clearErrs} 
             body={this.props.Errs[0]} /> 
             : ''}
         </div>
      )
   }
}

export default Main
