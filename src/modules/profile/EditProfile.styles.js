import styled from 'styled-components';

const AvatarContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;

  .ant-avatar {
    margin-bottom: 16px;
  }

  .upload-container {
    text-align: center;
  }

  .ant-upload-list-item-info > span {
    text-align: initial;
  }
`;

export default { AvatarContainer };
