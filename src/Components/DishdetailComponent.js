import React, { Component } from 'react';
import { Card, CardImg, CardText, CardTitle, CardBody, Breadcrumb, BreadcrumbItem, Row, Col, Button, Modal, ModalHeader, ModalBody, Label } from 'reactstrap';
import { Link } from 'react-router-dom';
import { LocalForm, Errors, Control } from 'react-redux-form';


const maxLength=(len)=>(val)=> !(val) || (val.length<=len);
const minLength=(len)=>(val)=> val && (val.length>len);

    class  CommentForm extends Component{

      constructor(props){
        super(props);
        this.state={
          isModalOpen: false
        };

        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);

      }

      toggleModal(){
            this.setState({
                isModalOpen:!this.state.isModalOpen
            });
      }

      handleSubmit(values){
          this.toggleModal();
          this.props.addComment(this.props.dishId, values.rate, values.author, values.com);
      }


      render(){
        return(
          <React.Fragment>
                    <Button outline onClick={this.toggleModal}>
              <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
         
          
          <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}> Submit Comment </ModalHeader>
          <ModalBody>
          <div className="m-2">
            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
              <Row className="form-group">
                 
                <Label htmlFor="rate"> Rating</Label>
                
                <Control.select model=".rate" id="rate" name="rate" className="form-control">
                 <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Control.select>
                
              </Row>

              <Row className="form-group">
              
                <Label htmlFor="author">Your Name</Label>                
                <Control.text model=".author" id="author" name="author" className="form-control"
                validators={{maxLength:maxLength(15), minLength:minLength(2)}}  />
                <Errors 
                className="text-danger"
                model=".author"
                show="touched"
                messages={{
                  maxLength:'Must be 15 characters or less',
                  minLength:'Must be greater than 2 characters'
                }} />
               
              </Row>

              <Row className="form-group">
              
                <Label htmlFor="com"> Comment</Label>                
                <Control.textarea model=".com" id="com" name="comm" rows="6" className="form-control"/>
                
              </Row>
              
              <Row className="form-group">
                           
                <Button type="submit" color="primary">Submit</Button>
                           
              </Row>
            </LocalForm>
            </div>

          </ModalBody>
          </Modal>
          
          </React.Fragment>

          );
      }


      }




    function RenderDish({dish}){


        if( dish!= null)
          return(
            <Card>
              <CardImg top src={dish.image} alt={dish.name}/>
              <CardBody>
                 <CardTitle>{dish.name}</CardTitle>
                 <CardText>{dish.description}</CardText>
              </CardBody>
              </Card>
          ); 
        else return (
          <div></div>
          );

      }



   function RenderComments({comm, addComment, dishId }){
     const comment= comm.map((select)=>{return(
        
                  <ul className="list-unstyled">                
                    <div className="mt-3">
                     <li> {select.comment} </li>
                     </div>
                     <div className="mt-3">
                     <li> -- {select.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(select.date)))}</li>

                    </div>            
                  </ul>



              );
            });
      if(comm!=null){      
        
      
        return(
            <div className="container">
              <div className="row">
             
                 {comment}
           

            </div>
            <div className="row mt-1">
            <CommentForm addComment={addComment} dishId={dishId} />
            </div>

</div>

            );}   

             else return (
            
            <div></div>        

        );       

    }


    const DishDetail=(props) => {

      return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                <BreadcrumbItem>DishDetail</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
            <div className="col-12 col-md-5 mt-1">
                   <RenderDish dish={props.dish} />
              </div>
              <div className="col-12 col-md-5 mt-1">  
                  <h4>Comments</h4>            
                  <RenderComments comm={props.comment} addComment={props.addComment} dishId={props.dish.id} />
              </div>
            </div>
               
            </div>
      	);


    }
    



export default DishDetail;


