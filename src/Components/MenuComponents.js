import React from 'react';
import { Card, CardImg, CardImgOverlay,  CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';



     function RenderMenuItem({dish, onClick}){
         return(
          
              <Card>
                  <Link to={`/menu/${dish.id}`}>
                      <CardImg width="100%" src={dish.image} alt={dish.name} />
                      <CardImgOverlay>
                        <CardTitle> {dish.name}</CardTitle>
                      </CardImgOverlay>
                  </Link>    
                      </Card>
              
          );
     }


   


    function Menu(props){
       
        const menu = props.dishes.dishes.map((dish) => {
                  return (
                    <div className="col-12 col-md-5 mt-5">
                     
                      <RenderMenuItem dish={dish}/>                      
                    </div>
                  );
              });
      
      if(props.dishes.isLoading){
        return(
          <Loading />
          );
      }
      else if(props.dishes.errMess){
        return(

          <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
        );
      }
    else
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                <BreadcrumbItem>Menu</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <div className="row">
             
                 {menu}
           

            </div>

            </div>
            )

    }



     
      
   




export default Menu;	