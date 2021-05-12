import React, { Component  } from 'react';
import {  Image,ListGroup } from 'react-bootstrap'
import { Link,StaticQuery, graphql } from 'gatsby'
import icon1 from '../../images/icon1.png'
class CityMenu extends Component {
    
    state = {
        isTop: true,
      };
    
      componentDidMount() {
        document.addEventListener('scroll', () => {
          const isTop = window.scrollY < 200;
          if (isTop !== this.state.isTop) {
              this.setState({ isTop })
          }
        });
      } 
    render() {

        return (
            <>
            
			<StaticQuery
					query={graphql`
						query MyQuery2 {
							wordpressMenusMenusItems(slug: {eq: "gatsby-menu-city"}) {
								id
								items {
									title
									
									
									child_items {
										title
										url
									}
									url
								}
							}
						}
					`}
			render={data => (
				<>
				{
					data &&
					data.wordpressMenusMenusItems &&
					data.wordpressMenusMenusItems.items &&
					data.wordpressMenusMenusItems.items.map(
						(innerprop,i) => {	
							return (
								<>
									<ListGroup.Item as="li">
										<Link to={"/school-holiday-programs/"+innerprop.title.toLowerCase().replace(/\s+/g, '')} className="" dangerouslySetInnerHTML={{ __html: innerprop.title}} className="" />
									</ListGroup.Item>	
								</>
								)}
							)	
								
				}
				</>
			)}
		  />
            </>
        );
    }
}

export default CityMenu;