export function ErrorDisplay({ errors, touched }) {
  const hasErrors = Object.keys(errors).some(field => errors[field] && touched[field]);

  if (!hasErrors) return null;

  return (
    <ul className="space-y-2">
      {Object.keys(errors).map(field => {
        if (errors[field] && touched[field]) {
          return (
            <li key={field} className="flex items-start text-red-600">
              <span className="mr-2"></span>
              <span>
                <strong>{field}:</strong> {errors[field]}
              </span>
            </li>
          )
        }
        return null
      })}
    </ul>
  );
}