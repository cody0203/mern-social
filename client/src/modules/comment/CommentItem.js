import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { Dropdown, Menu, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { get, includes } from "lodash";
import { Link } from "react-router-dom";
import { EllipsisOutlined, LikeFilled } from "@ant-design/icons";
import CustomAvatar from "../common/components/CustomAvatar";
import moment from "moment";

import CustomDeleteConfirmModal from "../common/components/CustomDeleteConfirmModal";
import CommentField from "./CommentField";

import * as actions from "../../system/store/comment/comment.actions";

const CommentItem = ({
  comment,
  likeCommentHandler,
  showReplyInput,
  isDropdownVisible,
  userId,
  menuClickHandler,
  changeDropdownVisibleHandler,
  isReply,
  currentDropdownId,
}) => {
  const dispatch = useDispatch();
  const inlineCommentFieldRef = useRef({});

  const [isShortComment, setIsShortComment] = useState(true);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditCommentInputVisible, setIsEditCommentInputVisible] = useState(
    false
  );
  const [isInlineCommentFieldFocus, setIsInlineCommentFieldFocus] = useState(
    false
  );
  const [isCancelAnchorHover, setIsCancelAnchorHover] = useState(false);
  const [editingValue, setEditingValue] = useState("");

  const { deleteCommentLoading, deleteReplyLoading } = useSelector((store) =>
    get(store, "commentReducer")
  );

  const posterId = get(comment, "owner._id");
  const id = get(comment, "_id");
  const isFake = get(comment, "isFake");

  const posterName = get(comment, "owner.name");
  const content = get(comment, "content");
  const likes = get(comment, "likes");
  const created = get(comment, "created");
  const totalLike = get(likes, "length");
  const isLiked = includes(likes, userId);

  console.log();
  useEffect(() => {
    setEditingValue(content);
  }, [content]);

  useEffect(() => {
    if (isEditCommentInputVisible) {
      inlineCommentFieldRef.current.focus();
    }
  }, [isEditCommentInputVisible]);

  useEffect(() => {
    if (get(content, "length") > 30) {
      setIsShortComment(false);
    }
  }, [content]);

  const onDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalVisible(false);
  };

  const deleteCommentHandler = () => {
    if (!isReply) {
      dispatch(actions.deleteCommentStart(id));
      return;
    }

    dispatch(actions.deleteReplyStart(id));
  };

  const mouseOverCancelAnchorHandler = () => {
    setIsCancelAnchorHover(true);
  };

  const mouseOutCancelAnchorHandler = () => {
    setIsCancelAnchorHover(false);
  };

  const openEditCommentInput = () => {
    setIsEditCommentInputVisible(true);
  };

  const closeInlineCommentFieldHandler = () => {
    setIsEditCommentInputVisible(false);
    mouseOutCancelAnchorHandler();
  };

  const menu = (
    <Menu onClick={menuClickHandler}>
      <Menu.Item key="0" onClick={openEditCommentInput}>
        <p>Edit</p>
      </Menu.Item>
      <Menu.Item key="1" onClick={onDeleteModal}>
        <p>Delete</p>
      </Menu.Item>
    </Menu>
  );

  const likeContainer = (
    <LikeContainerStyled className={`${!isShortComment && "long-comment"}`}>
      <LikeIconStyled />
      <LikeCounterStyled>{totalLike}</LikeCounterStyled>
    </LikeContainerStyled>
  );

  const inlineCommentFieldFocusHandler = () => {
    setIsInlineCommentFieldFocus(true);
  };

  const inlineCommentFieldBlurHandler = () => {
    if (!isCancelAnchorHover) {
      setIsInlineCommentFieldFocus(false);
    }
  };

  const onChangeInlineCommentFieldHandler = (e) => {
    const value = get(e, "target.value");
    setEditingValue(value);
  };

  const detectKeyDownHandler = (e) => {
    const key = get(e, "key");

    if (key === "Escape") {
      closeInlineCommentFieldHandler();
    }
  };

  const editCommentHandler = () => {
    dispatch(
      actions.editCommentStart({ id, params: { content: editingValue } })
    );
    closeInlineCommentFieldHandler();
  };

  return (
    <CommentStyled $isReply={isReply}>
      <Link to={`/user/profile/${posterId}`}>
        <CustomAvatar
          size={!isReply ? 30 : 25}
          src={`http://localhost:8080/api/user/avatar/${posterId}?${new Date().getTime()}`}
        />
      </Link>
      {!isEditCommentInputVisible && (
        <ContentContainerStyled>
          <div>
            <ContentStyled>
              <Content>
                <PosterNameStyled to={`/user/profile/${posterId}`}>
                  {posterName}
                </PosterNameStyled>{" "}
                {editingValue}
              </Content>{" "}
              {totalLike > 0 && <>{likeContainer}</>}{" "}
              {!isFake && userId === posterId && (
                <Dropdown
                  visible={isDropdownVisible && currentDropdownId === id}
                  overlay={menu}
                  trigger={["click"]}
                  onVisibleChange={changeDropdownVisibleHandler.bind(this, id)}
                >
                  <MoreIconStyled
                    $isVisible={isDropdownVisible}
                    className={`${!isShortComment ? "long-comment" : ""}`}
                  />
                </Dropdown>
              )}
            </ContentStyled>{" "}
            <CommentActionsContainerStyled>
              {!isFake && (
                <>
                  <LikeActionStyled
                    onClick={likeCommentHandler.bind(this, id)}
                    $isLiked={isLiked}
                  >
                    Like
                  </LikeActionStyled>
                  {!isReply && (
                    <>
                      <span> · </span>

                      <CommentActionStyled onClick={showReplyInput}>
                        Reply
                      </CommentActionStyled>
                    </>
                  )}
                  <span> · </span>
                </>
              )}

              <span>{moment(created).fromNow()}</span>
            </CommentActionsContainerStyled>
          </div>{" "}
          {/* {totalLike > 0 && isShortComment && <>{likeContainer}</>} */}
        </ContentContainerStyled>
      )}

      {isEditCommentInputVisible && (
        <div>
          <InlineCommentField
            ref={inlineCommentFieldRef}
            onFocus={inlineCommentFieldFocusHandler}
            onBlur={inlineCommentFieldBlurHandler}
            value={editingValue}
            onChange={onChangeInlineCommentFieldHandler}
            onKeyDown={detectKeyDownHandler}
            onPressEnter={editCommentHandler}
          />
          <CancelHintStyled>
            {isInlineCommentFieldFocus ? (
              <span>
                Press Esc to{" "}
                <CancelTextAnchorStyled
                  onClick={closeInlineCommentFieldHandler}
                  onMouseOver={mouseOverCancelAnchorHandler}
                  onMouseOut={mouseOutCancelAnchorHandler}
                >
                  cancel
                </CancelTextAnchorStyled>
              </span>
            ) : (
              <CancelTextAnchorStyled onClick={closeInlineCommentFieldHandler}>
                Cancel
              </CancelTextAnchorStyled>
            )}
          </CancelHintStyled>
        </div>
      )}

      <CustomDeleteConfirmModal
        visible={isDeleteModalVisible}
        onCancel={closeDeleteModal}
        title="Delete comment"
        desc="Confirm to delete this comment?"
        onOk={deleteCommentHandler}
        loading={!isReply ? deleteCommentLoading : deleteReplyLoading}
      />
    </CommentStyled>
  );
};

const CommentStyled = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 0 36px 16px 16px;

  &:first-child {
    padding-top: ${({ $isReply }) => (!$isReply ? "16px" : 0)};
  }
`;

const CommentActionStyled = styled.span`
  color: ${({ theme }) => get(theme, "colors.primaryDark")};
  cursor: pointer;
`;

const LikeActionStyled = styled(CommentActionStyled)`
  font-weight: ${({ $isLiked }) => ($isLiked ? "800" : "400")};
  color: ${({ $isLiked, theme }) => $isLiked && get(theme, "colors.primary")};
`;

const ContentContainerStyled = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 8px;
`;

const PosterNameStyled = styled(Link)`
  color: ${({ theme }) => get(theme, "colors.primary")};
  font-weight: 500;
`;

const ContentStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const Content = styled.p`
  background-color: ${({ theme }) => get(theme, "colors.background")};
  padding: 6px 12px;
  border-radius: 18px;
`;

const MoreIconStyled = styled(EllipsisOutlined)`
  &.long-comment {
    position: absolute;
    right: -27px;
    top: 50%;
    transform: translateY(-50%);
  }
  display: ${({ $isVisible }) => ($isVisible ? "block" : "none")};
  font-size: 18px;
  cursor: pointer;
  margin-left: 8px;
  ${CommentStyled}:hover & {
    display: block;
  }
`;

const CommentActionsContainerStyled = styled.div`
  margin-left: 12px;
  font-size: 12px;
`;

const LikeContainerStyled = styled.div`
  &.long-comment {
    position: absolute;
    bottom: -16px;
    right: 0px;
  }

  background-color: white;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  margin-left: -5px;
  padding: 2px 1px 2px 2px;
  border-radius: 10px;
  font-size: 12px;
  z-index: 2;
`;

const LikeIconStyled = styled(LikeFilled)`
  background-color: ${({ theme }) => get(theme, "colors.primary")};
  color: white;
  border-radius: 50%;
  padding: 2px;
`;

const LikeCounterStyled = styled.span`
  margin-left: 3px;
`;

const InlineCommentField = styled(Input)`
  margin-left: 8px;
  border-radius: 50px;
`;

const CancelHintStyled = styled.p`
  margin-left: 8px;
  font-size: 11px;
`;

const CancelTextAnchorStyled = styled.span`
  color: ${({ theme }) => get(theme, "colors.primary")};
  cursor: pointer;
  z-index: 10;

  &:hover {
    text-decoration: underline;
  }
`;

export default CommentItem;
