import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button, Col, Row } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const PostCard = (props) => {
    const { posts } = props;
    const cards = posts.map(post => (
        <Col sm="3" className='post-card'>
            <Card>
                <CardImg src={`${post.img}`} />
                <CardBody>
                    <CardTitle>{post.title}</CardTitle>
                    <CardSubtitle>{post.subtitle}</CardSubtitle>
                    <CardText>{post.description}</CardText>
                    <Button><center>Button</center></Button>
                </CardBody>
            </Card>
        </Col>
    ));
    return (
        <Row>
            {cards}
        </Row>
    );
}

export default PostCard;
