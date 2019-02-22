import styled from 'styled-components';
import {
  Flex as BaseFlex,
  Box as BaseBox,
  Heading as BaseHeading,
  Text as BaseText,
  Button as BaseButton,
} from 'rebass';
import {
  height, flexBasis, minHeight, variant,
} from 'styled-system';

// Box.
const Box = styled(BaseBox)`
  ${height}
  ${minHeight}
  ${flexBasis}
`;
// Flex.
const Flex = styled(BaseFlex)`
  ${height}
  ${minHeight}
`;
// Centered.
const Centered = styled(Flex)``;
Centered.defaultProps = {
  ...Flex.defaultProps,
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
};
// Top Right
const TopRight = styled(Box)`
  position: absolute;
  top: 0px;
  right: 0px;
  padding: 20px;
`;
// Heading.
const headingStyle = variant({
  key: 'headings',
});
const Heading = styled(BaseHeading)`
  ${headingStyle}
`;
Heading.defaultProps = {
  ...BaseHeading.defaultProps,
  fontSize: null,
  fontWeight: null,
};
// Text.
const textStyle = variant({
  key: 'texts',
});
const Text = styled(BaseText)`
  ${textStyle}
`;
const Button = styled(BaseButton)`
  cursor: pointer;
`;
export {
  Box, Flex, Centered, TopRight, Heading, Text, Button,
};
