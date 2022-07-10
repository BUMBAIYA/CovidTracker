import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import Box from "@mui/material/Box";

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  )
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

Page.displayName = 'Page';

export default Page;
