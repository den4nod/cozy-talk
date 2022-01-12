import { useParams } from 'react-router-dom'
import { RouteMatch } from '../../components/pages/routeMatch'
import { NotFound } from '../../components/pages/notFound'

export function PostRouteContainer() {

  const PAGE_TITLES = {
    NUMERIC_ID: 'Post with numeric ID',
    CAPITAL_LETTERS_ID: 'Post with capital letters ID',
    FILENAME_WITH_EXT_ID: 'POST with filename.ext'
  }

  const { id } = useParams()

  const matchNumericString = (input) => {
    const match = input.match(/\d+/)
    return match && match[0] && match[0] === input
  }

  const matchCapitalString = (input) => {
    const match = input.match(/^[A-Z]+$/)
    return match && match[0] && match[0] === input
  }

  const matchFilenameWithExtensionString = (input) => {
    const match = input.match(/^[0-9a-zA-Z]+\.(doc|pdf|jpeg)$/)
    return match && match[0] && match[0] === input
  }

  if (matchNumericString(id)) {
    return <RouteMatch title={PAGE_TITLES.NUMERIC_ID} body={id} />
  }
  if (matchCapitalString(id)) {
    return <RouteMatch title={PAGE_TITLES.CAPITAL_LETTERS_ID} body={id} />
  }
  if (matchFilenameWithExtensionString(id)) {
    return <RouteMatch title={PAGE_TITLES.FILENAME_WITH_EXT_ID} body={id} />
  }
  return <NotFound />
}
