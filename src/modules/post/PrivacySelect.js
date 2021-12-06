import React from "react";
import get from "lodash/get";
import styled from "styled-components";
import { Menu, Dropdown, Tooltip } from "antd";
import {
  CaretDownOutlined,
  GlobalOutlined,
  LockOutlined,
} from "@ant-design/icons";

const PrivacySelect = ({
  isPublic = "public",
  shorten = false,
  changePrivacyPostHandler,
  isLoading,
  disabled,
}) => {
  const publicOption = (
    <div>
      <GlobalOutlined />
      <OptionValueStyled>Public</OptionValueStyled>
    </div>
  );
  const privateOption = (
    <div>
      <LockOutlined />
      <OptionValueStyled>Only me</OptionValueStyled>
    </div>
  );

  const menu = (
    <Menu onClick={({ key }) => changePrivacyPostHandler(key)}>
      <Menu.Item key="public">{publicOption}</Menu.Item>
      <Menu.Item key="private">{privateOption}</Menu.Item>
    </Menu>
  );

  let status = !shorten && publicOption;

  if (isPublic === "public" && shorten) {
    status = <GlobalOutlined />;
  }

  if (isPublic === "private" && !shorten) {
    status = privateOption;
  }

  if (isPublic === "private" && shorten) {
    status = <LockOutlined />;
  }

  return (
    <>
      {isLoading ? (
        <Tooltip title="Updating" placement="top">
          <PingDotContainer>
            <PingDot />
          </PingDotContainer>
        </Tooltip>
      ) : (
        <Dropdown
          overlay={menu}
          trigger={["click"]}
          placement="bottomLeft"
          disabled={disabled}
        >
          <PrivacySelectContainerStyled $shorten={shorten}>
            <Tooltip
              title={`${isPublic === "public" ? "Public" : "Only me"}`}
              placement="topRight"
            >
              <CurrentStatusStyled>
                {status}
                <DropdownIconStyled />
              </CurrentStatusStyled>
            </Tooltip>
          </PrivacySelectContainerStyled>
        </Dropdown>
      )}
    </>
  );
};

const PrivacySelectContainerStyled = styled.div`
  padding: ${({ theme, $shorten }) => ($shorten ? "6px" : "2px 6px")};
  border: 1px solid
    ${({ theme, $shorten }) =>
      !$shorten ? get(theme, "colors.text") : "transparent"};
  cursor: pointer;

  &:hover {
    border: 1px solid
      ${({ theme, $shorten }) => $shorten && get(theme, "colors.text")};
  }
`;

const CurrentStatusStyled = styled.div`
  display: flex;
  align-items: center;
`;

const OptionValueStyled = styled.span`
  margin-left: 10px;
`;

const DropdownIconStyled = styled(CaretDownOutlined)`
  margin-left: 10px;
`;

const PingDotContainer = styled.div`
  padding: 6px;
`;

const PingDot = styled.div`
  position: relative;
  background: black;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  z-index: 2;

  &:before,
  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: transparent;
    box-sizing: border-box;
    border: black 1px solid;
    z-index: 1;
  }

  &:before {
    animation: smallPulse 2s ease-out infinite;
  }

  &:after {
    animation: largePulse 2s ease-out infinite;
  }

  @keyframes smallPulse {
    from {
      transform: scale(0.75);
      opacity: 1;
    }

    95%,
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  @keyframes largePulse {
    from {
      transform: scale(0.75);
      opacity: 1;
    }

    to {
      transform: scale(3.5);
      opacity: 0;
    }
  }

  // DEMO ONLY
  body {
    background: #000c00;
    height: 100vh;
  }

  .sonar {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%, 0);
  }
`;

export default PrivacySelect;
