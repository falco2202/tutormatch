import { Helmet } from 'react-helmet'

const CustomHelmet = ({ titleHelmet }) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>
        {titleHelmet ? `TutorMatch | ${titleHelmet}` : 'TutorMatch'}
      </title>
      <meta name="description" content="TutorMatch" />
    </Helmet>
  )
}
export default CustomHelmet
