import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponents';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';

const mapStatetoProps=state=>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders:state.leaders


    };
}



const mapDispatchtoProps = dispatch =>({
   addComment: (dishId,rating,author,comment) =>dispatch(addComment(dishId,rating,author,comment)),
   fetchDishes: ()=>{dispatch(fetchDishes())},
   resetFeedbackForm: ()=>{dispatch(actions.reset('feedback'))} 
});




class Main extends Component{

constructor(props){
  super(props);
}

componentDidMount(){
  this.props.fetchDishes();
}


  render(){
  
  const HomePage= ()=>{
    return(

      <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
        dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={this.props.promotions.filter((promo)=>promo.featured)[0]}
          leader={this.props.leaders.filter((lead)=>lead.featured)[0]}
          
           />
          
          

      );
  }

  const DishWithId=({match})=>{
    return(

        <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]} 
          comment={this.props.comments.filter((comm)=> comm.dishId === parseInt(match.params.dishId,10))} 
          addComment={this.props.addComment} 
          isLoading={this.props.dishes.isLoading}
          errmess={this.props.dishes.errMess}/>

      );
  }


  return (
    <div>
         <Header />
         <Switch>
         <Route path="/home" component={HomePage} />
         <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes} />} />
         <Route path="/menu/:dishId" component={DishWithId} />
         <Route exact path="/contactus" component={()=><Contact resetFeedbackForm={this.props.resetFeedbackForm} />} />
         <Route path="/aboutus" component={()=> <About leaders={this.props.leaders} />}/>
         <Redirect to="/home" />
         </Switch>
         <Footer />
      </div>
  );
}
}

export default (connect(mapStatetoProps,mapDispatchtoProps)(Main));
