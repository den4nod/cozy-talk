import { useParams } from 'react-router-dom'
import { RouteMatch } from '../../components/pages/routeMatch'
import { NotFound } from '../../components/pages/notFound'

export function DateRouteContainer() {

  const PAGE_TITLES = {
    DATE_IN_PAST: 'Date in the past'
  }

  const { date } = useParams()

  const matchDateFrom = (input) => {
    const match = input.match(/^\d{4}[\-](0[1-9]|1[0-2])[\-](0[1-9]|[1-2][0-9]|3[0-1])$/)
    return match && match[0] && match[0] === input
  }

  const dateInPast = (date) => {
    return new Date(date).setDate(new Date(date).getDate() + 1) < Date.now()
  }

  if (matchDateFrom(date) && dateInPast(date)) {
    return <RouteMatch title={PAGE_TITLES.DATE_IN_PAST} body={date} />
  }

  return <NotFound />
}
