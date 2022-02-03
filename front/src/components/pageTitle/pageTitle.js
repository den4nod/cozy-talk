import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

export function PageTitle({ pageTitle }) {
  return (
    <Typography gutterBottom variant='h4' component='div' mt={3} sx={{ textAlign: 'center' }}>
      {pageTitle}
    </Typography>
  )
}

PageTitle.propTypes = {
  pageTitle: PropTypes.string.isRequired
}
