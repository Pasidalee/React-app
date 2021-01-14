import React, { Component } from 'react';
import { Navbar, NavbarToggler, Nav, Collapse, NavItem, NavbarBrand, Jumbotron, FormGroup, Form, Col, Input, Modal, ModalBody, ModalHeader, Label, Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';

class Header extends Component{


	constructor(props){
		super(props);
		this.state={
			isNavOpen:false,
            isModalOpen:false
		};
		this.toggleNav=this.toggleNav.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
        this.handleLogin=this.handleLogin.bind(this);
	}

	toggleNav(){
		this.setState({
			isNavOpen:!this.state.isNavOpen
		});
	}

    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }

    handleLogin(event){
        this.toggleModal();
        alert("UserName:"+this.username.value+ " Password:" + this.password.value + " Remember:"+this.confirm.checked);
        event.preventDefault();
    }

	render(){

		return(
          
          <React.Fragment>
          		<Navbar dark expand="md">
          			<div className="container">
          				<NavbarToggler onClick={this.toggleNav} />
            			<NavbarBrand className="mr-auto" href="/">
            			<img src="./dine.jpg" height="30" width="41" alt="restaurant confusion" />
            			</NavbarBrand>
            			<Collapse isOpen={this.state.isNavOpen} navbar>
            			<Nav navbar>
            				<NavItem>
            				<NavLink className="nav-link" to="/home">
            				<span className="fa fa-home fa-lg" ></span>Home
            				</NavLink>
            				</NavItem>

            				<NavItem>
            				<NavLink className="nav-link" to="/aboutus">
            				<span className="fa fa-info fa-lg" ></span>About Us
            				</NavLink>
            				</NavItem>

            				<NavItem>
            				<NavLink className="nav-link" to="/menu">
            				<span className="fa fa-list fa-lg" ></span>Menu
            				</NavLink>
            				</NavItem>

            				<NavItem>
            				<NavLink className="nav-link" to="/contactus">
            				<span className="fa fa-phone fa-lg" ></span>Contact Us
            				</NavLink>
            				</NavItem>
            			</Nav>
                        <Nav className="ml-auto" navbar>
                            <Button outline onClick={this.toggleModal}>
                                <span className="fa fa-sign-in fa-lg"></span>Login
                            </Button>
                        </Nav>
            			</Collapse>
          			</div>
        		</Navbar>

        		<Jumbotron>
        		 	<div className="container">
        		 		<div className="row row-header">
        		 			<div className="col-12 col-sm-6">
        		 				<h1>Restaurant Confusion</h1>
        		 				<p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
        		 			</div>
        		 		</div>
        		 	</div>
        		</Jumbotron>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Login
                    </ModalHeader>
                    <ModalBody>

                        <Form onSubmit={this.handleLogin}>
                        <FormGroup>
                            <Label htmlFor="username">UserName</Label>
                            <Input type="text" name="username" innerRef={(input)=> this.username=input} />
                        </FormGroup>

                         <FormGroup>
                            <Label htmlFor="pwd">Password</Label>
                            <Input type="password" name="pwd" innerRef={(input)=> this.password=input}/>
                        </FormGroup>

                        <FormGroup check>
                            <Label check>
                                <Input type="checkbox" name="confirm" innerRef={(input)=> this.confirm=input} />{''} Remember me
                            </Label>
                        </FormGroup>

                        <FormGroup>
                            <Button type="submit" color="primary">Login</Button>
                        </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
          </React.Fragment>
  
		);
	}
}

export default Header;