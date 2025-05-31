import Guest from "@/Layouts/GuestLayout"
import { Link } from "@inertiajs/react"

export default function ErrorPage({ status, puppy } : {
    status: number,
    puppy: App.Data.PuppyCardData
}) {
  const title = {
    503: '503: Service Unavailable',
    500: '500: Server Error',
    404: '404: Page Not Found',
    403: '403: Forbidden',
  }[status]

  const description = {
    503: 'Sorry, we are doing some maintenance. Please check back soon.',
    500: 'Whoops, something went wrong on our servers.',
    404: 'Sorry, the page you are looking for could not be found.',
    403: 'Sorry, you are forbidden from accessing this page.',
  }[status]

  return (
    <Guest puppy={puppy}>
      <h1>{title}</h1>
      <div>{description}</div>
      <Link aria-label="Go back" href="/">Go back</Link>
    </Guest>
  )
}
