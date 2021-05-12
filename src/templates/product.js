import React, {Component} from 'react';
import Layout from "../components/layout"
import Footer from "../components/common/Footer"
import BottomForm from "../components/common/BottomForm"
import PropTypes from "prop-types"
import { graphql,Link } from "gatsby"
import {Container,Breadcrumb,Row,Col,Card,Image} from 'react-bootstrap'
import { Helmet } from "react-helmet"
class Shop extends Component {
  render() {
      const prod = this.props.data.allWcProducts
	  return (
          <Layout>
            <>
			<Helmet>
				<title>Shop - Australian Sports Camps</title>
			</Helmet>
				<section className="Banner-Section">
						<Container>
							<div className="Banner-Section-data">
								<Breadcrumb>
									<Breadcrumb.Item className="">
										<Link className="nav-link p-0" to="/">Home</Link>
									</Breadcrumb.Item>
									<Breadcrumb.Item active href=""className="">Shop</Breadcrumb.Item>
								</Breadcrumb>
								<h2 className="heading-banner">PRODUCT SHOP</h2>
							</div>
						</Container>
				</section>
				<section className="Shop-section-2">
					<Container>
						<div className="Shop-section-2-data">
							<Row className="main-book-card-row">
								
									
									{prod && prod.edges.map( prop => {
									return (
									<>
									{(prop.node.status != 'draft') ? (
										<Col xl={4} lg={4} md={6} sm={9} xs={12} className="main-book-card">
											<Card className="book-card">
												<Link to={"/product-shop/"+prop.node.slug} className="card-img">
													<Image variant="top" src={prop.node.images[0].src} fluid alt="card"/>
												</Link>
												<Card.Body>
													<Card.Title as="h5">
														{prop.node.name}
													</Card.Title>
													<ul className="pro" >
														<li className="main-price">${prop.node.price}</li>
													</ul>
													<Link className="nav-link uppercase btn-sm btn-orange text-center" to={"/product-shop/"+prop.node.slug}>More info / Buy Now</Link>
												</Card.Body>
											</Card>
										</Col>
									
									) : ("")}
									</>
									
									
									)
									})}
									
								
							</Row>
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

Shop.propTypes = {
  data: PropTypes.object.isRequired,
  edges: PropTypes.array,
}

export default Shop

export const pageQuery = graphql`
	query($skip: Int!, $limit: Int!) {
		allWcProducts(filter: {categories: {elemMatch: {name: {eq: "Shop"}}}},skip: $skip, limit: $limit) {
			edges {
				node {
					id
					wordpress_id
					sale_price
					status
					price
					name
					images {
					  src
					}
					slug
				}
			}
		}
	}`
