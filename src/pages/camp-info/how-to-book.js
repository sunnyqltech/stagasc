import React, {Component} from 'react';
import Layout from "../../components/layout"
import {Container,Breadcrumb,Image} from 'react-bootstrap'
import { Link } from 'gatsby'
import addbanner from '../../images/add-banner.png'
import axios from 'axios';
import Footer from "../../components/common/Footer"
import Howtobanner from "../../components/common/Howtobanner"
import BottomForm from "../../components/common/BottomForm"
import { Helmet } from "react-helmet"

class HowToBook extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);
    }
	
	state = {
		PageData: [],
		showInfo: 0,
		title:"",
		description:"",
		keywords:"",
		og_type:"",
		og_title:"",
		og_description:"",
		twitter_card:"",
		twitter_title:"",
		twitter_description:""
	}
	
	componentDidMount() {
		axios({
			url: 'https://shop.australiansportscamps.com.au/graphql',
			method: 'post',
			data: {
				query: `
					query MyQuery {
						page(id: "18", idType: DATABASE_ID) {
							id
							slug
							title
							content
								seo {
					  focuskw
					  metaDesc
					  metaKeywords
					  opengraphAuthor
					  opengraphDescription
					  opengraphModifiedTime
					  opengraphPublishedTime
					  opengraphPublisher
					  opengraphSiteName
					  opengraphTitle
					  opengraphType
					  opengraphUrl
					  readingTime
					  title
					  twitterDescription
					  twitterTitle
					}
						}
					}
				`
			}
		}).then(res => {
			this.setState({PageData: res.data.data.page})
			this.setState({showInfo: 1})
			this.setState({title: res.data.data.page.seo.title})
			this.setState({description: res.data.data.page.seo.metaDesc})
			this.setState({keywords: res.data.data.page.seo.metaKeywords})
			this.setState({og_type: "website"})
			this.setState({og_title: res.data.data.page.seo.opengraphTitle})
			this.setState({og_description: res.data.data.page.seo.opengraphDescription})
			this.setState({twitter_card: "summary_large_image"})
			this.setState({twitter_title: res.data.data.page.seo.twitterTitle})
			this.setState({twitter_description: res.data.data.page.seo.twitterDescription})
		})
	}
  
  
  
  
  
  
	render() {
		return (
			<Layout>
            <>
			<Helmet>
				<title>How To Book - Australian Sports Camps</title>
				<meta name="title" content={this.state.title}></meta>
				<meta name="description" content={this.state.description}></meta>
				<meta name="keywords" content={this.state.keywords}></meta>
				<meta property="og:type" content="website"></meta>
				<meta property="og:title" content={this.state.og_title}></meta>
				<meta property="og:description" content={this.state.og_description}></meta>
				<meta property="twitter:card" content="summary_large_image"></meta>
				<meta property="twitter:title" content={this.state.twitter_title}></meta>
				<meta property="twitter:description" content={this.state.twitter_description}></meta>
			</Helmet>
				<div className="laoder" style={{ display: this.state.showInfo == 0 ? "block" : "none" }} >
					<div id="preloader" aria-busy="true" aria-label="Loading, please wait." role="progressbar">
						<img alt="" className="icon" src="https://shop.australiansportscamps.com.au/demo.svg" />
					</div>
				</div>
				<section className="Banner-Section">
					<Container>
						<div className="Banner-Section-data">
							<Breadcrumb>
								<Breadcrumb.Item className="">
									<Link className="nav-link p-0" to="/">Home</Link>
								</Breadcrumb.Item>
								<Breadcrumb.Item active href=""className="">How to book</Breadcrumb.Item>
							</Breadcrumb>
							<h2 className="heading-banner">How to book</h2>
						</div>
					</Container>
				</section>
				<Howtobanner />
				<section className="How-to-book-Section-1">
					<Container>
						<div className="How-to-book-Section-1-data text-left">
							<div className="mb-30">
								{(this.state.PageData !== "") ? (<div dangerouslySetInnerHTML={{ __html: this.state.PageData.content}} />) : ("")}
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
export default HowToBook
