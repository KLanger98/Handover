import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Text } from "@mantine/core";
import { TickBox } from "..";
import { IconTrash } from "@tabler/icons-react";
import PropTypes from "prop-types";

const FlagItem = ({ data, type = "task" , item}) => {
  const [mainHover, setMainHover] = useState(false);
  const [trashHover, setTrashHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      onMouseEnter={() => setMainHover(true)}
      onMouseLeave={() => setMainHover(false)}
      className={"activity-item" + (mainHover ? " hover" : "")}
      onClick={() => navigate(`/${type}/${item.id}`)}
    >
      <Grid p={0} offset={0}>
        <Grid.Col span={1} py={2}>
          <TickBox />
        </Grid.Col>

        {/* Item Title */}
        <Grid.Col span={3} p={2}>
          <Text
            size="sm"
            c={
              !mainHover
                ? "var(--mantine-color-blue-9"
                : "var(--mantine-color-brown-6)"
            }
          >
            {data.flagText}
          </Text>
        </Grid.Col>

        {/* User Details (if referral)*/}
        {/* {type == "referrals" && item.assignedUser && ( */}
          <Grid.Col span={2} p={2}>
            <div className="user-details">
              <div className="img-container">
                <img
                  // src={item.assignedUser.profileImg}
                  // alt={item.assignedUser.name}
                />
              </div>
              <Text
                className="user-name"
                size="sm"
                c="var(--mantine-color-blue-9)"
              >
                {/* {item.assignedUser.name} */}
              </Text>
            </div>
          </Grid.Col>
        {/* )} */}

        <Grid.Col span={1} p={2} style={{ display: "flex" }}>
          {
            /* Space Filler */
            !mainHover && <div style={{ height: "25px" }} />
          }
          {mainHover && (
            <IconTrash
              size={17}
              onMouseEnter={() => setTrashHover(true)}
              onMouseLeave={() => setTrashHover(false)}
              color={trashHover ? "red" : "black"}
            />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

FlagItem.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default FlagItem;
