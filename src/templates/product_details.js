import React, {Component} from 'react';
import Layout from "../components/layout"
import Footer from "../components/common/Footer"
import BottomForm from "../components/common/BottomForm"
import {Container,Row,Col,Image,Button,Breadcrumb} from 'react-bootstrap'
import { Link } from 'gatsby'
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
class ProdDetails extends Component {
	constructor(props) {
        super(props);
        this.state = {
          clicks: 1,
          show: true
        };
        this.IncrementItem = this.IncrementItem.bind(this);
        this.DecreaseItem = this.DecreaseItem.bind(this);
      }
    
      IncrementItem() {
        this.setState({ clicks: this.state.clicks + 1 });
      }
      DecreaseItem(){
        this.setState({ clicks: this.state.clicks - 1 } );
      }

  
  
  render() {
	const prod = this.props.data.allWcProducts
	const id = this.props.data.allWcProducts.edges[0].node.wordpress_id;
      return (
          <Layout>
            <>
			<Helmet>
				<title>{prod.edges[0].node.name} - Australian Sports Camps</title>
			</Helmet>
              <section className="Banner-Section">
					<Container>
						<div className="Banner-Section-data">
							<Breadcrumb>
								<Breadcrumb.Item className="">
									<Link className="nav-link p-0" to="/">Home</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item className="">
									<Link className="nav-link p-0" to="/Shop">Shop</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item active href=""className="" dangerouslySetInnerHTML={{ __html: prod.edges[0].node.name}} />
							</Breadcrumb>
							<h2 className="heading-banner">
								{prod.edges[0].node.categories && prod.edges[0].node.categories.map( prop => {
									return (
										<>{ prop.name }</>
									)
								})}
							</h2>
						</div>
					</Container>
				</section>
				<section className="Product-details-Section-2">
                <Container>
                    <div className="Product-details-Section-2-data">
                        <Row>
                            <Col xl={6} lg={6} className="lg-mb-4">
                                <div className="gray-data text-center">
                                    <Image src={ prod.edges[0].node.images[0].src} alt="" fluid width="400" />
                                </div>
                            </Col>
                            <Col xl={6} lg={6}>
                                <div className="product-content text-left">
                                    <div className="title text-left mb-0">
                                        <h2>{ prod.edges[0].node.name}</h2>
                                    </div>
                                    <h3 className="font-22 color-blue font-bold">${ prod.edges[0].node.price}</h3>
                                    <div className="mb-30">
										<span className="font-medium font-16 color-3b text-left" dangerouslySetInnerHTML={{ __html: prod.edges[0].node.short_description}} />
									</div>
									<ul className="mb-0 pl-0">
                                            <li>
                                                <div className="d-flex align-items-center">
                                                    <h2 className="font-18 font-medium">Quantity :</h2> 
                                                </div>
                                            </li>
                                            <li>
                                                <div className="d-flex title quantity-data align-items-center">
                                                    <Button onClick={this.DecreaseItem}>-</Button>
                                                    <h2 className="mx-3 mb-0 main-h2 font-medium">{ this.state.clicks }</h2> 
                                                    <Button onClick={this.IncrementItem}>+</Button>
                                                </div>
                                            </li>
                                        </ul>


                                   
                                    <Link className=" uppercase btn-sm btn-orange btnpadding" to={"https://staging-ascstaging.kinsta.cloud/cart/?add-to-cart="+id+"&quantity="+this.state.clicks}>BUY Now</Link>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
			<section className="Product-details-Section-3">
                <Container>
                    <div className="Product-details-Section-3-data">
                        
                    <div className="mb-30">
                            <h3 className="font-bold font-20 color-3b mb-2 text-center">PRODUCT DETAILS</h3>
                        </div>
                        <div className="gray-data">

                        <div className="mb-30">
                            <span className="font-medium font-16 color-3b text-left" dangerouslySetInnerHTML={{ __html: prod.edges[0].node.description}} />
                            
                        </div>
                        
                        </div>
                    </div>
                </Container>
            </section>
              <BottomForm/>
              <Footer/>
            </>
          </Layout>
      )
  }
}
export default ProdDetails


ProdDetails.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export const pageQuery = graphql`
  query($id: String!) {
    allWcProducts(filter: {id: { eq: $id }}) {
		edges {
			node {
				id
				description
				short_description
				wordpress_id
				sale_price
				price
				name
				categories {
					name
				}
				images {
				  src
				}
				slug
			}
		}
    }
	
	
  }
  
`

