import React, { useState, useEffect } from 'react';
import { Card } from 'antd';

const Details = ({ }) => {
    const item = {
        longLink: "shit",
        shortLink: "sh"
    };

    return (
        <Card title={"Link info"} style={{ width: 300, }}>
            <p>Link {item.longLink}</p>
            <p>Short link {item.shortLink}</p>
            <p>Created by </p>
            <p>Date created</p>
        </Card>
    );
}

export default Details;