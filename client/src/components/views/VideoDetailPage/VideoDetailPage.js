import React, { useState, useEffect } from "react";
import { Row, Col, List, Avatar } from "antd";
import Axios from "axios";
import SideVideo from "./Sections/SideVideo";
import Subscriber from "./Sections/Subscriber";

function VideoDetailPage(props) {
  const videoId = props.match.params.videoId;
  const variable = { videoId: videoId };

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    Axios.post("/api/video/getVideoDetail", variable).then((response) => {
      if (response.data.success) {
        console.log(response.data);
        setVideoDetail(response.data.VideoDetail);
      } else {
        alert("비디오 정보를 가져오길 실패했습니다.");
      }
    });
  }, []);
  if (VideoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} cs={24}>
          <div style={{ width: "100%", padding: "3rem 4rem" }}>
            {/* <video src={`http://localhost:5888/${VideoDetail.filePath}`} controls /> */}
            <video
              style={{ width: "100%" }}
              src={`http://localhost:5888/${VideoDetail.filePath}`}
              controls
            ></video>
            <List.Item
              actions={[
                <Subscriber
                  userTo={VideoDetail.writer._id}
                  userFrom={localStorage.getItem("userId")}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={VideoDetail.writer.image} />}
                title={VideoDetail.writer.name}
                description={VideoDetail.description}
              />
            </List.Item>
          </div>
        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default VideoDetailPage;
